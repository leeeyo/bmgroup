"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type CarouselCompany = {
  name: string;
  pole: string;
  eyebrow: string;
  line: string;
  image: string;
  imageAlt: string;
  url: string;
  domain: string;
  ctaLabel: string;
};

type Props = {
  companies: CarouselCompany[];
};

export function CompaniesCarousel({ companies }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [companyIndex, setCompanyIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);
  const pauseTimer = useRef<number | null>(null);

  // After a manual interaction, hold auto-advance for a beat so the slide
  // doesn't yank out from under someone reading — critical on touch, where
  // there's no hover to pause it.
  const holdAutoplay = useCallback(() => {
    setIsPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setIsPaused(false), 9000);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setCompanyIndex(
        ((next % companies.length) + companies.length) % companies.length,
      );
      holdAutoplay();
    },
    [companies.length, holdAutoplay],
  );

  const step = useCallback(
    (dir: number) => {
      setCompanyIndex(
        (prev) => (prev + dir + companies.length) % companies.length,
      );
      holdAutoplay();
    },
    [companies.length, holdAutoplay],
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setCompanyIndex((prev) => (prev + 1) % companies.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [isInView, isPaused, prefersReducedMotion, companies.length]);

  useEffect(() => {
    if (!isInView) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCompanyIndex(
          (prev) => (prev - 1 + companies.length) % companies.length,
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCompanyIndex((prev) => (prev + 1) % companies.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isInView, companies.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return;
      step(diff > 0 ? 1 : -1);
    },
    [step],
  );

  return (
    <section
      id="metiers"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Sociétés du groupe BM"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-dvh min-h-[640px] w-full overflow-hidden bg-deep-green text-white"
    >
      {companies.map((company, i) => {
        const isActive = i === companyIndex;
        return (
          <div
            key={company.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} sur ${companies.length} — ${company.name}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <motion.div
              className="absolute inset-0"
              animate={
                prefersReducedMotion
                  ? { scale: 1 }
                  : isActive
                    ? { scale: [1.02, 1.09, 1.02], x: [0, -14, 0] }
                    : { scale: 1.04, x: 0 }
              }
              transition={
                isActive && !prefersReducedMotion
                  ? {
                      duration: 18,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }
                  : { duration: 1.2, ease: "easeOut" }
              }
            >
              <Image
                src={company.image}
                alt={company.imageAlt}
                fill
                quality={90}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-deep-green/85 from-2% via-deep-green/20 via-45% to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-deep-green/40 via-deep-green/5 to-transparent" />

            <div
              className={`absolute inset-x-0 bottom-0 px-4 pb-28 transition-all duration-[1100ms] ease-out sm:px-8 sm:pb-32 lg:px-14 lg:pb-36 ${
                isActive
                  ? "translate-y-0 opacity-100 delay-150"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mx-auto flex w-full max-w-7xl flex-col">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-gold sm:text-xs sm:tracking-[0.48em]">
                  <span className="font-serif text-base font-normal tracking-[0.08em] text-gold/85 sm:text-lg">
                    0{i + 1}
                  </span>
                  <span className="mx-3 text-gold/40">/</span>
                  Pôle {company.pole}
                </p>
                <h2 className="mt-5 font-serif text-[clamp(3.75rem,11vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-white sm:mt-7">
                  {company.name}
                </h2>
                <p className="mt-5 max-w-2xl font-serif text-2xl leading-tight tracking-tight text-white/92 sm:mt-7 sm:text-3xl lg:text-4xl">
                  {company.eyebrow}.
                </p>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">
                  {company.line}
                </p>

                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.ctaLabel} — site externe ${company.domain}`}
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-9 inline-flex w-fit items-center gap-5 sm:mt-12"
                >
                  <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/45 bg-deep-green/35 backdrop-blur transition-all duration-500 group-hover:border-gold group-hover:bg-gold sm:size-[5.25rem]">
                    <span
                      aria-hidden
                      className="font-serif text-2xl text-gold transition-all duration-500 group-hover:translate-x-1 group-hover:text-deep-green sm:text-3xl"
                    >
                      →
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold/90 sm:text-xs sm:tracking-[0.36em]">
                      {company.ctaLabel}
                    </span>
                    <span className="mt-1.5 font-serif text-lg tracking-tight text-white/90 transition group-hover:text-gold sm:text-xl">
                      {company.domain}
                      <span aria-hidden className="ml-1.5 text-gold/70">↗</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 pt-6 sm:px-8 sm:pt-9 lg:px-14 lg:pt-10">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.42em] text-gold sm:text-xs sm:tracking-[0.5em]">
          Nos sociétés
        </p>
        <p className="font-serif text-lg tracking-tight text-white/85 sm:text-xl">
          <span className="text-white">0{companyIndex + 1}</span>
          <span className="mx-1 text-white/30">/</span>
          <span className="text-white/55">0{companies.length}</span>
        </p>
      </div>

      {/* Side arrows are desktop-only — on mobile they collide with the
          headline, and swipe + the dot rail below are the natural controls. */}
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Société précédente"
        className="group absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 sm:left-6 sm:block lg:left-10"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-deep-green/35 backdrop-blur transition duration-300 group-hover:-translate-x-0.5 group-hover:border-gold group-hover:bg-deep-green/55 sm:size-14">
          <span
            aria-hidden
            className="text-xl leading-none text-white/85 transition group-hover:text-gold sm:text-2xl"
          >
            ‹
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Société suivante"
        className="group absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 sm:right-6 sm:block lg:right-10"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-deep-green/35 backdrop-blur transition duration-300 group-hover:translate-x-0.5 group-hover:border-gold group-hover:bg-deep-green/55 sm:size-14">
          <span
            aria-hidden
            className="text-xl leading-none text-white/85 transition group-hover:text-gold sm:text-2xl"
          >
            ›
          </span>
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-5 sm:bottom-10">
        {companies.map((company, i) => (
          <button
            key={company.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Voir ${company.name}`}
            aria-current={i === companyIndex ? "true" : undefined}
            className="group flex min-h-11 flex-col items-center justify-center gap-2 px-2 py-2"
          >
            <span
              className={`block h-px transition-all duration-700 ease-out ${
                i === companyIndex
                  ? "w-14 bg-gold sm:w-20"
                  : "w-7 bg-white/35 group-hover:bg-white/70 sm:w-10"
              }`}
            />
            <span
              className={`text-[0.6rem] font-bold uppercase tracking-[0.28em] transition-colors duration-500 ${
                i === companyIndex
                  ? "text-gold"
                  : "text-white/45 group-hover:text-white/80"
              }`}
            >
              {company.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
