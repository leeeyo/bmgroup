import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/db";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête JSON invalide." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation échouée.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  // Honeypot — silently accept and discard.
  if (data.company_url && data.company_url.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const id = await insertLead({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      subject: data.subject || null,
      message: data.message,
      source: "website",
    });
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("[/api/contact] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessayez ou écrivez-nous par email." },
      { status: 500 },
    );
  }
}
