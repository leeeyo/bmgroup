// In-memory fixed-window rate limiter. Single-process, single-VPS only.
// If we ever scale horizontally, swap for Redis/Upstash.

type Bucket = { count: number; resetAt: number };

declare global {
  var __bmRateLimitBuckets: Map<string, Bucket> | undefined;
}

const buckets: Map<string, Bucket> =
  globalThis.__bmRateLimitBuckets ?? new Map();
globalThis.__bmRateLimitBuckets = buckets;

// Periodic cleanup to keep the map bounded.
declare global {
  var __bmRateLimitSweeper: NodeJS.Timeout | undefined;
}
if (!globalThis.__bmRateLimitSweeper) {
  globalThis.__bmRateLimitSweeper = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, 60_000);
  // Don't keep the event loop alive just for the sweeper.
  globalThis.__bmRateLimitSweeper.unref?.();
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  bucket.count++;
  return { ok: true, remaining: limit - bucket.count };
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
