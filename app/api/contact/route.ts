import { NextResponse } from "next/server";
import { contactSettings } from "@/lib/config";
import { inquiryLabel, validateContact } from "@/lib/contact";

const maxBytes = 24_000;

function failure(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RangeError("Body too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return failure("Please submit your inquiry from the Foundation website.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return failure("Please use the contact form to submit your inquiry.", 415);
  }
  if (Number(request.headers.get("content-length")) > maxBytes) {
    return failure("Your submission is too large.", 413);
  }

  let input: unknown;
  try {
    input = await readBody(request);
  } catch (error) {
    return error instanceof RangeError ? failure("Your submission is too large.", 413) : failure("The inquiry could not be read.", 400);
  }

  const { fields, errors } = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Please review the highlighted fields.", errors }, { status: 422 });
  }
  if (input && typeof input === "object" && "website" in input && input.website !== "") {
    return failure("The inquiry could not be submitted. Please try again.", 400);
  }

  const settings = contactSettings();
  if (!settings) return failure("Online inquiries are awaiting setup.", 503);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${settings.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: settings.from,
        to: [settings.to],
        reply_to: fields.email,
        subject: `Foundation website inquiry: ${inquiryLabel(fields.type)}`,
        text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (response.ok) {
      const receipt = await response.json();
      if (typeof receipt?.id === "string" && receipt.id) return NextResponse.json({ status: "accepted" });
    }
  } catch {
    // Retain the visitor's draft in the browser so they can retry.
  }
  return failure("We couldn’t submit your inquiry. Please try again.", 502);
}
