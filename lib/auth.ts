import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "bm_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or too short (≥32 chars required). Configure it in .env.local.",
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  email: string;
  iat: number;
  exp: number;
};

// Fixed-length buffer compared against when the email doesn't match the
// configured admin, so request timing doesn't reveal whether the address
// exists.
const ZERO_DIGEST = Buffer.alloc(32);

function sha256(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD missing. Configure them in .env.local.",
    );
  }
  const emailMatches =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  // SHA-256 normalises both sides to a fixed 32-byte buffer so
  // timingSafeEqual is constant-time and won't throw on length mismatches.
  // (SHA-256 here is not a password hash — it just unifies lengths before the
  // constant-time compare. Brute-force resistance lives in AUTH_SECRET and
  // the per-IP rate limiter on /api/admin/login.)
  const submittedDigest = sha256(password);
  const expectedDigest = emailMatches ? sha256(adminPassword) : ZERO_DIGEST;
  const passwordOk = timingSafeEqual(submittedDigest, expectedDigest);
  return emailMatches && passwordOk;
}

export async function createSessionCookie(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function getSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.email !== "string") return null;
    return {
      email: payload.email,
      iat: Number(payload.iat ?? 0),
      exp: Number(payload.exp ?? 0),
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
