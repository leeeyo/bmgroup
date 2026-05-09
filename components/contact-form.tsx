"use client";

import { useState } from "react";

type FieldErrors = Partial<Record<
  "name" | "email" | "phone" | "company" | "subject" | "message",
  string[]
>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [honey, setHoney] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof typeof initialFields>(key: K, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...fields, company_url: honey }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        if (data?.issues && typeof data.issues === "object") {
          setErrors(data.issues as FieldErrors);
        }
        setServerError(
          (data && typeof data.error === "string" && data.error) ||
            "L'envoi a échoué. Réessayez ou écrivez-nous directement.",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      setFields(initialFields);
      setHoney("");
    } catch {
      setStatus("error");
      setServerError(
        "Réseau indisponible. Réessayez dans un instant ou écrivez-nous par email.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-sm border border-gold/40 bg-gold/10 p-6 text-white">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold">
          Message reçu
        </p>
        <p className="font-serif text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">
          Merci. Nous revenons vers vous sous 48 h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex w-fit items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold transition hover:translate-x-1"
        >
          Envoyer un autre message
          <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-sm border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      noValidate
    >
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold">
        Formulaire de contact
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Nom complet"
          required
          value={fields.name}
          onChange={(value) => update("name", value)}
          errors={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={fields.email}
          onChange={(value) => update("email", value)}
          errors={errors.email}
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Téléphone"
          type="tel"
          value={fields.phone}
          onChange={(value) => update("phone", value)}
          errors={errors.phone}
          autoComplete="tel"
          placeholder="+216 ..."
        />
        <Field
          id="company"
          label="Société"
          value={fields.company}
          onChange={(value) => update("company", value)}
          errors={errors.company}
          autoComplete="organization"
        />
      </div>

      <Field
        id="subject"
        label="Sujet"
        value={fields.subject}
        onChange={(value) => update("subject", value)}
        errors={errors.subject}
        placeholder="Construction, agencement, immobilier…"
      />

      <Field
        id="message"
        label="Votre projet"
        required
        value={fields.message}
        onChange={(value) => update("message", value)}
        errors={errors.message}
        textarea
        placeholder="Décrivez en quelques lignes : usage, surface, échéance souhaitée."
      />

      {/* Honeypot — caché aux humains, rempli par les bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Site web (laisser vide)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(event) => setHoney(event.target.value)}
          />
        </label>
      </div>

      {serverError ? (
        <p
          role="alert"
          className="rounded-sm border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
          Réponse sous 48 h ouvrées.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#161712] transition hover:-translate-y-0.5 hover:bg-[#d3b16f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-7 sm:text-sm"
        >
          {submitting ? "Envoi…" : "Envoyer la demande"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: keyof typeof initialFields;
  label: string;
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  required?: boolean;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  errors,
  required,
  type = "text",
  textarea,
  autoComplete,
  placeholder,
}: FieldProps) {
  const hasError = (errors?.length ?? 0) > 0;
  const baseClassName = `w-full rounded-sm border bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 outline-none transition focus:border-gold ${
    hasError ? "border-red-400/60" : "border-white/15"
  }`;
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-white/65">
        {label}
        {required ? <span className="ml-1 text-gold">*</span> : null}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          rows={5}
          className={`${baseClassName} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={baseClassName}
        />
      )}
      {hasError ? (
        <p className="text-xs text-red-300">{errors![0]}</p>
      ) : null}
    </label>
  );
}
