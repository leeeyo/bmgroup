import { NextResponse } from "next/server";
import { createSessionCookie, verifyCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function configurationHint(error: unknown): string | null {
  if (!(error instanceof Error)) return null;
  const msg = error.message;
  if (msg.includes("AUTH_SECRET")) {
    return "AUTH_SECRET est absent ou trop court (minimum 32 caractères). Définissez-le dans .env.local puis redémarrez le serveur.";
  }
  if (msg.includes("ADMIN_EMAIL") || msg.includes("ADMIN_PASSWORD_HASH")) {
    return "ADMIN_EMAIL ou ADMIN_PASSWORD_HASH est absent dans .env.local. Redémarrez le serveur après modification.";
  }
  return null;
}

export async function POST(request: Request) {
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
      console.log(
        "[/api/admin/login] mismatch — adminEmail=",
        process.env.ADMIN_EMAIL,
        "hashLen=",
        process.env.ADMIN_PASSWORD_HASH?.length,
      );
      return NextResponse.json(
        { ok: false, error: "Email ou mot de passe incorrect." },
        { status: 401 },
      );
    }
    await createSessionCookie(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/admin/login] failed", error);
    const hint =
      configurationHint(error) ??
      "Configuration admin manquante côté serveur. Vérifiez la console serveur.";
    return NextResponse.json({ ok: false, error: hint }, { status: 500 });
  }
}
