import type { ApplicationFormData } from "@/types";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitApplication(
  data: ApplicationFormData
): Promise<SubmitResult> {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return {
      success: false,
      error: "Submission endpoint not configured.",
    };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 0 || response.ok) {
      return { success: true };
    }

    const text = await response.text().catch(() => "");
    if (text.includes("success") || text.includes("Success")) {
      return { success: true };
    }

    return { success: false, error: `Server responded with status ${response.status}` };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error. Please try again.",
    };
  }
}
