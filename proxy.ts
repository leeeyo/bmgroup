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
//
// IMPORTANT: behind a reverse proxy the app listens on 127.0.0.1:3001, so
// `request.nextUrl.host` does NOT equal the public host — comparing against it
// would 403 every legitimate same-origin request. Compare the browser's Origin
// against the host the client actually addressed, which nginx forwards via the
// Host header (`proxy_set_header Host $host`) / X-Forwarded-Host.
function isSafeOrigin(request: NextRequest): boolean {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }
  const origin = request.headers.get("origin");
  if (!origin) {
    // Non-browser caller or same-origin fetch without an Origin header.
    return true;
  }
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  // If no host header is present we can't compare; the SameSite=strict cookie
  // is the backstop, so don't hard-block.
  if (!host) return true;
  return originHost === host;
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
