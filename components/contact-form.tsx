"use client";

import { ChevronDown } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { type ContactFields, type FieldErrors, inquiryTypes, limits, validateContact } from "@/lib/contact";

type Result = { status: "sending" | "accepted" | "error"; message: string };

export function ContactForm({ initialType, available }: { initialType: string; available: boolean }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<Result>();
  const inFlight = useRef(false);

  function showErrors(form: HTMLFormElement, nextErrors: FieldErrors) {
    setErrors(nextErrors);
    const firstField = Object.keys(nextErrors)[0];
    if (firstField) requestAnimationFrame(() => {
      const field = form.elements.namedItem(firstField);
      if (field instanceof HTMLElement) field.focus();
    });
  }

  function clearError(key: keyof ContactFields) {
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    if (result?.status !== "sending") setResult(undefined);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || inFlight.current) return;

    const form = event.currentTarget;
    const submitted = Object.fromEntries(new FormData(form));
    const { fields, errors: validationErrors } = validateContact(submitted);
    if (Object.keys(validationErrors).length) {
      setResult(undefined);
      showErrors(form, validationErrors);
      return;
    }

    setErrors({});
    inFlight.current = true;
    setResult({ status: "sending", message: "Sending your inquiry…" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: submitted.website }),
      });
      const payload = await response.json();
      if (response.ok && payload.status === "accepted") {
        form.reset();
        setResult({ status: "accepted", message: "Your inquiry was accepted for delivery." });
      } else {
        setResult({ status: "error", message: payload.message ?? "We couldn’t send your inquiry. Please try again." });
        if (payload.errors) showErrors(form, payload.errors);
      }
    } catch {
      setResult({ status: "error", message: "We couldn’t reach the contact service. Please try again." });
    } finally {
      inFlight.current = false;
    }
  }

  function fieldState(key: keyof ContactFields, hint?: string) {
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": [hint, errors[key] ? `${key}-error` : undefined].filter(Boolean).join(" ") || undefined,
      onChange: () => clearError(key),
    };
  }

  const error = (key: keyof ContactFields) => errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>;
  const sending = result?.status === "sending";

  return (
    <form className="contact-form" action="/contact" method="post" noValidate onSubmit={submit} aria-label="Contact the Foundation">
      <fieldset disabled={!available || sending}>
        <legend className="sr-only">Inquiry details</legend>
        <div className="form-pair">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" maxLength={limits.name} required {...fieldState("name")} />
            {error("name")}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={limits.email} required {...fieldState("email")} />
            {error("email")}
          </div>
        </div>
        <div className="field">
          <label htmlFor="type">Inquiry type</label>
          <div className="select-wrap">
            <select id="type" name="type" defaultValue={initialType} required {...fieldState("type")}>
              <option value="" disabled>Select an inquiry type</option>
              {inquiryTypes.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}
            </select>
            <ChevronDown size={19} aria-hidden="true" />
          </div>
          {error("type")}
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={6} maxLength={limits.message} required {...fieldState("message", "message-hint")} />
          <p className="field-hint" id="message-hint">Please leave out medical records and other sensitive information.</p>
          {error("message")}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" className="button button-primary">{sending ? "Sending…" : "Send inquiry"}</button>
      </fieldset>
      <div className={`form-result ${result?.status ?? ""}`} role="status" aria-atomic="true">{result?.message}</div>
      <noscript><p>JavaScript is required to send an inquiry through this form.</p></noscript>
    </form>
  );
}
