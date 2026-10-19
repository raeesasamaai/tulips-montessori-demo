import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { emptyEnquiry, submitEnquiryDemo, validateEnquiry, type EnquiryValues } from "@/lib/enquiry";

type Errors = Partial<Record<keyof EnquiryValues, string>>;

export function EnquiryForm() {
  const [v, setV] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof EnquiryValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) { requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    setState("sending");
    try { await submitEnquiryDemo(v); setState("done"); setV(emptyEnquiry); }
    catch { setState("error"); }
  }

  if (state === "done") {
    return (
      <div data-reveal role="status" className="mx-auto w-full max-w-lg self-start rounded-2xl border border-border bg-card p-8 shadow-soft">
        <CheckCircle2 className="text-success" size={32} aria-hidden />
        <p className="mt-4 text-lg">Demo submission complete. No enquiry has been sent. On the live website, the school would receive your message and you would receive an acknowledgement email.</p>
        <button type="button" className="btn-secondary mt-6" onClick={() => setState("idle")}>Send another</button>
      </div>
    );
  }

  const errList = Object.entries(errors).filter(([, m]) => m);
  const Field = ({ id, label, req, children }: { id: keyof EnquiryValues; label: string; req?: boolean; children: React.ReactNode }) => (
    <div data-reveal>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label} {req ? <span aria-hidden className="text-destructive">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}</label>
      {children}
      {errors[id] && <p id={`${id}-err`} className="mt-1 text-sm text-destructive">{errors[id]}</p>}
    </div>
  );
  const a = (id: keyof EnquiryValues) => ({ id, name: id, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined, className: "field" });

  return (
    <form id="enquire" noValidate onSubmit={onSubmit} className="mx-auto w-full max-w-lg self-start space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8" aria-labelledby="form-h">
      <h3 data-reveal id="form-h" className="text-3xl">Send an enquiry</h3>
      <p data-reveal className="text-sm text-muted-foreground">Demo form — nothing you enter is sent or stored.</p>
      <div ref={summaryRef} tabIndex={-1} role="alert" hidden={errList.length === 0 && state !== "error"} className="outline-none">
        {errList.length > 0 && <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">Please correct {errList.length} {errList.length === 1 ? "field" : "fields"} below.</p>}
        {state === "error" && <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">Something went wrong. Your details are still here — please try again.</p>}
      </div>
      {Field({ id: "name", label: "Parent/guardian name", req: true, children: <input {...a("name")} autoComplete="name" value={v.name} onChange={set("name")} /> })}
      <div className="grid gap-4 sm:grid-cols-2">
        {Field({ id: "email", label: "Email address", req: true, children: <input {...a("email")} type="email" autoComplete="email" value={v.email} onChange={set("email")} /> })}
        {Field({ id: "phone", label: "Phone number", children: <input {...a("phone")} type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} /> })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Field({ id: "type", label: "Enquiry type", req: true, children: (
          <select {...a("type")} value={v.type} onChange={set("type")}>
            <option value="">Please choose…</option><option value="general">General enquiry</option><option value="admissions">Admissions</option><option value="visit">School visit</option>
          </select>) })}
        {Field({ id: "ageRange", label: "Child's age range", children: (
          <select {...a("ageRange")} value={v.ageRange} onChange={set("ageRange")}>
            <option value="">Select…</option><option>Under 3</option><option>3–4 years</option><option>4–5 years</option><option>5–6 years</option>
          </select>) })}
      </div>
      {v.type === "visit" && <p className="rounded-lg bg-beige px-4 py-3 text-sm">This is a visit <strong>request</strong>. The school will contact you to suggest a time — it isn't a confirmed booking.</p>}
      {Field({ id: "message", label: "Message", req: true, children: <textarea {...a("message")} rows={4} value={v.message} onChange={set("message")} /> })}
      <button data-reveal type="submit" className="btn-primary w-full" disabled={state === "sending"} aria-busy={state === "sending"}>
        {state === "sending" ? "Sending…" : v.type === "visit" ? "Request a visit" : "Send enquiry"}
      </button>
    </form>
  );
}
