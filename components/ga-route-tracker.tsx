"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function GaRouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipFirstNavigation = useRef(true);

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaId) return;

    const qs = searchParams?.toString();
    const pagePath = `${pathname}${qs ? `?${qs}` : ""}`;

    if (skipFirstNavigation.current) {
      skipFirstNavigation.current = false;
      return;
    }

    sendGAEvent("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/** Sends GA4 `page_view` on App Router navigations after the initial load. */
export function GaRouteTracker() {
  return (
    <Suspense fallback={null}>
      <GaRouteTrackerInner />
    </Suspense>
  );
}
