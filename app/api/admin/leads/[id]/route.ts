import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateLeadStatus } from "@/lib/db";
import { updateStatusSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const parsed = updateStatusSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Statut invalide." },
      { status: 400 },
    );
  }

  const ok = await updateLeadStatus(numericId, parsed.data.status);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Lead introuvable" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
