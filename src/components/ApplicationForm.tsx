"use client";

import { useState, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { submitApplication } from "@/lib/form-submit";
import type { ApplicationFormData, FormErrors, SubmitStatus } from "@/types";

export default function ApplicationForm() {
  const headRef = useReveal<HTMLDivElement>();
  const subRef = useReveal<HTMLParagraphElement>();
  const docRef = useReveal<HTMLDivElement>();

  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    linkedin: "",
    fullTime: "",
    coFounder: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const desc = formData.description.trim();
    if (!name) {
      errs.name = "Name is required";
    } else if (name.length > 100) {
      errs.name = "Name must be under 100 characters";
    }
    if (!email) {
      errs.email = "Email is required";
    } else if (email.length > 254) {
      errs.email = "Email must be under 254 characters";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email";
    }
    if (!desc) {
      errs.description = "Startup description is required";
    } else if (desc.length > 2000) {
      errs.description = "Description must be under 2000 characters";
    }
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypotRef.current?.value) return;
    if (submittingRef.current) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    const result = await submitApplication(formData);

    submittingRef.current = false;

    if (result.success) {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        linkedin: "",
        fullTime: "",
        coFounder: "",
        description: "",
      });
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="apply" id="apply">
        <div className="wrap">
          <div className="apply-head">
            <h2>Apply for one of <em>five seats.</em></h2>
          </div>
          <p className="apply-sub">Two minutes. We review every application and select five founders this quarter. Tell us what you&apos;re building.</p>
          <div className="appdoc sent">
            <div className="success">
              <div className="seal"><span>RECEIVED</span></div>
              <h3>You&apos;re in the pile.</h3>
              <p>Thanks for applying. We review every application and reach out to the founders we want to back. Keep an eye on your inbox.</p>
              <a href="https://cal.com/swatantra-whatbytes" target="_blank" rel="noopener" className="book">Want to jump the queue? Book a call →</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="apply" id="apply">
      <div className="wrap">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="apply-head rv"
        >
          <h2>Apply for one of <em>five seats.</em></h2>
        </div>
        <p
          ref={subRef as React.RefObject<HTMLParagraphElement>}
          className="apply-sub rv"
        >
          Two minutes. We review every application and select five founders this quarter. Tell us what you&apos;re building.
        </p>
        <div
          ref={docRef as React.RefObject<HTMLDivElement>}
          className="appdoc rv"
        >
          <div className="form-body">
            <div className="doc-head">
              <div>
                <div className="dt">Cohort Application</div>
                <div className="ds">WhatBytes Venture Studio</div>
              </div>
              <div className="ref">REF #WB-VS<br />5 seats · this quarter</div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <input
                ref={honeypotRef}
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="honey"
              />

              <div className="frow">
                <div className="field">
                  <label>Your name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Founder"
                  />
                  {errors.name && (
                    <p style={{ color: "var(--color-accent)", fontSize: 12, marginTop: 4, fontFamily: "var(--font-mono)" }}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label>Email <span className="req">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@startup.com"
                  />
                  {errors.email && (
                    <p style={{ color: "var(--color-accent)", fontSize: 12, marginTop: 4, fontFamily: "var(--font-mono)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <label>LinkedIn / Twitter</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="frow">
                <div className="field">
                  <label>Are you full-time on this?</label>
                  <select
                    name="fullTime"
                    value={formData.fullTime}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select…</option>
                    <option>Yes, full-time</option>
                    <option>Will be within 30 days</option>
                    <option>No, not yet</option>
                  </select>
                </div>
                <div className="field">
                  <label>Is there a co-founder or team?</label>
                  <select
                    name="coFounder"
                    value={formData.coFounder}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select…</option>
                    <option>Yes, I have a co-founder / team</option>
                    <option>No, I&apos;m solo</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>What are you building? <span className="req">*</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="One sentence on the product and the problem it solves."
                  rows={3}
                />
                {errors.description && (
                  <p style={{ color: "var(--color-accent)", fontSize: 12, marginTop: 4, fontFamily: "var(--font-mono)" }}>
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="submit-row">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-submit"
                >
                  {status === "submitting" ? "Sending…" : "Submit application"}
                  <span className="ar">↗</span>
                </button>
                <span className="fine">We review every one · 5 selected this quarter</span>
              </div>

              {status === "error" && (
                <p style={{ color: "var(--color-accent)", fontSize: 13, marginTop: 16, fontFamily: "var(--font-mono)" }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <div className="alt">Prefer to talk first? <a href="https://cal.com/swatantra-whatbytes" target="_blank" rel="noopener">Book a 15-minute call →</a></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
