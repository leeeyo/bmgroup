"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(
          (data && typeof data.error === "string" && data.error) ||
            "Connexion impossible.",
        );
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ink-soft">
          Email
        </span>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-sm border border-foreground/15 bg-white px-4 py-3 text-base text-deep-green outline-none transition focus:border-gold"
          placeholder="admin@bmgroup.tn"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-ink-soft">
          Mot de passe
        </span>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-sm border border-foreground/15 bg-white px-4 py-3 text-base text-deep-green outline-none transition focus:border-gold"
          placeholder="••••••••"
        />
      </label>
      {error ? (
        <p
          role="alert"
          className="rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-deep-green px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-[#18392f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
