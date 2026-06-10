import type { ApplicationFormData } from "@/types";

/*
 * Google Apps Script CORS note:
 *
 * Apps Script web apps do not handle CORS preflight (OPTIONS) requests.
 * To avoid the preflight, the Content-Type must NOT be "application/json"
 * or any "non-simple" header value. We use "text/plain" and the GAS
 * endpoint parses the raw POST body as JSON.
 *
 * Required GAS endpoint code:
 *
 *   function doPost(e) {
 *     const data = JSON.parse(e.postData.contents);
 *     // data has: name, email, linkedin, fullTime, team, startup, _gotcha
 *     // ... write to sheet ...
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.TEXT);
 *   }
 *
 *   function doGet() {
 *     return HtmlService.createHtmlOutput("<h1>OK</h1>");
 *   }
 *
 * Deploy as: Anyone (with "Allow anonymous access" or equivalent).
 * The endpoint URL looks like:
 *   https://script.google.com/macros/s/{SCRIPT_ID}/exec
 */

export interface SubmitResult {
  success: boolean;
  error?: string;
}

const PAYLOAD_SIZE_LIMIT = 50_000; // 50 KB
const REQUEST_TIMEOUT = 15_000; // 15 seconds
const COOLDOWN_MS = 3_000; // 3 seconds between submissions

let lastSubmitTime = 0;

function sanitize(value: string): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").trim();
}

function validatePayload(data: ApplicationFormData): string | null {
  if (!data.name || !sanitize(data.name)) return "Name is required.";
  if (sanitize(data.name).length > 100)
    return "Name must be under 100 characters.";

  if (!data.email || !sanitize(data.email))
    return "Email is required.";

  const email = sanitize(data.email);
  if (email.length > 254) return "Email must be under 254 characters.";
  // RFC 5322 simplified pattern
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address.";

  if (!data.description || !sanitize(data.description))
    return "Startup description is required.";

  if (sanitize(data.description).length > 2000)
    return "Description must be under 2000 characters.";

  return null;
}

export async function submitApplication(
  data: ApplicationFormData
): Promise<SubmitResult> {
  // --- Cooldown check ---
  const now = Date.now();
  if (now - lastSubmitTime < COOLDOWN_MS && lastSubmitTime > 0) {
    return {
      success: false,
      error: "Please wait a few seconds before submitting again.",
    };
  }

  // --- Validate ---
  const validationError = validatePayload(data);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return {
      success: false,
      error: "Submission endpoint not configured. Please contact the site owner.",
    };
  }

  // --- Sanitize & map to GAS payload ---
  const payload = {
    name: sanitize(data.name),
    email: sanitize(data.email),
    linkedin: sanitize(data.linkedin),
    fullTime: sanitize(data.fullTime),
    team: sanitize(data.coFounder),
    startup: sanitize(data.description),
    _gotcha: now,
  };

  const body = JSON.stringify(payload);

  if (body.length > PAYLOAD_SIZE_LIMIT) {
    return {
      success: false,
      error: "Submission is too large. Please reduce the input length.",
    };
  }

  // --- Mark last submit time BEFORE the async call ---
  lastSubmitTime = now;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      // text/plain avoids CORS preflight (GAS cannot handle OPTIONS)
      headers: { "Content-Type": "text/plain" },
      body,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      return { success: true };
    }

    const text = await response.text().catch(() => "");
    if (text.includes("success") || text.includes("Success")) {
      return { success: true };
    }

    return {
      success: false,
      error:
        "The server was unable to process your submission. Please try again or email us directly.",
    };
  } catch (err) {
    clearTimeout(timeout);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        success: false,
        error: "Request timed out. Please check your connection and try again.",
      };
    }

    return {
      success: false,
      error:
        "Network error. Please check your connection and try again.",
    };
  }
}
