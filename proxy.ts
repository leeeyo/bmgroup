import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "bm_admin_session";

function getSecret(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return typeof payload.email === "string";
  } catch {
    return false;
  }
}

// Origin check for admin API state-changing requests. With SameSite=strict
// cookies this is mostly belt-and-braces, but it protects against any future
// cookie-policy regression.
function isSafeOrigin(request: NextRequest): boolean {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }
  const origin = request.headers.get("origin");
  if (!origin) {
    // Non-browser caller or same-origin fetch without Origin header.
    return true;
  }
  try {
    const originUrl = new URL(origin);
    return originUrl.host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CSRF/origin guard for /api/admin/*.
  if (pathname.startsWith("/api/admin")) {
    if (!isSafeOrigin(request)) {
      return NextResponse.json(
        { ok: false, error: "Origin invalide." },
        { status: 403 },
      );
    }
    return NextResponse.next();
  }

  // Auth gate for /admin/* (except /admin/login itself).
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const ok = await isAuthenticated(token);
    if (!ok) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
