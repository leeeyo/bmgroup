import { NextResponse } from "next/server";
import { createSessionCookie, verifyCredentials } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 8 attempts / 10 min / IP. Tight enough to throttle brute force, loose
// enough for honest mistypes.
const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

const isProd = process.env.NODE_ENV === "production";

function devHint(error: unknown): string | null {
  if (isProd || !(error instanceof Error)) return null;
  const msg = error.message;
  if (msg.includes("AUTH_SECRET")) {
    return "AUTH_SECRET est absent ou trop court (minimum 32 caractères). Définissez-le dans .env.local puis redémarrez le serveur.";
  }
  if (msg.includes("ADMIN_EMAIL") || msg.includes("ADMIN_PASSWORD")) {
    return "ADMIN_EMAIL ou ADMIN_PASSWORD est absent dans .env.local. Redémarrez le serveur après modification.";
  }
  return null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Trop de tentatives. Réessayez dans quelques minutes.",
      },
      {
        status: 429,
        headers: { "retry-after": String(limit.retryAfter) },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Identifiants invalides." },
      { status: 400 },
    );
  }

  try {
    const ok = await verifyCredentials(parsed.data.email, parsed.data.password);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Email ou mot de passe incorrect." },
        { status: 401 },
      );
    }
    await createSessionCookie(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/admin/login] failed", error);
    const message =
      devHint(error) ??
      "Connexion impossible. Réessayez dans un instant.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
