export type EnquiryValues = {
  name: string;
  email: string;
  phone: string;
  type: "" | "general" | "admissions" | "visit";
  ageRange: string;
  message: string;
};

export const emptyEnquiry: EnquiryValues = { name: "", email: "", phone: "", type: "", ageRange: "", message: "" };

export function validateEnquiry(v: EnquiryValues): Partial<Record<keyof EnquiryValues, string>> {
  const e: Partial<Record<keyof EnquiryValues, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!v.type) e.type = "Please choose an enquiry type.";
  if (!v.message.trim()) e.message = "Please add a short message.";
  return e;
}

/**
 * DEMO ONLY — simulates submission locally. Nothing is sent or stored.
 * Replace with a POST to a server endpoint that validates, rate-limits and
 * sends both emails via Resend (key kept server-side).
 */
export async function submitEnquiryDemo(_v: EnquiryValues): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 1100));
  return { ok: true };
}
