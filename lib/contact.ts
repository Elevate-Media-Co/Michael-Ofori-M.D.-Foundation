import { simpleEmail } from "./site";

export const inquiryTypes = [
  { value: "general", label: "General inquiry" },
  { value: "giving", label: "Giving and donation inquiries" },
  { value: "partnership", label: "Organizational partnership" },
  { value: "volunteer", label: "Volunteering or collaboration" },
  { value: "education", label: "Medical and dental education" },
  { value: "resources", label: "Equipment or medical supplies" },
] as const;

export const limits = { name: 100, email: 254, message: 3000 };

export function inquiryLabel(value: string) {
  return inquiryTypes.find((item) => item.value === value)?.label;
}

export type ContactFields = { name: string; email: string; type: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(input: unknown): { fields: ContactFields; errors: FieldErrors } {
  const source = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const read = (key: keyof ContactFields) => typeof source[key] === "string" ? source[key].trim() : "";
  const fields = { name: read("name"), email: read("email"), type: read("type"), message: read("message") };
  const errors: FieldErrors = {};
  if (fields.name.length < 2 || fields.name.length > limits.name) errors.name = "Enter your name (2–100 characters).";
  if (fields.email.length > limits.email || !simpleEmail.test(fields.email)) errors.email = "Enter a valid email address.";
  if (!inquiryLabel(fields.type)) errors.type = "Choose an inquiry type.";
  if (fields.message.length < 10 || fields.message.length > limits.message) errors.message = "Enter a message (10–3,000 characters).";
  return { fields, errors };
}
