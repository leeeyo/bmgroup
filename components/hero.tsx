"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

type HeroProps = {
  pillars: { name: string; pole: string }[];
};

const heroImage = {
  src: "/hero/hero.png",
  alt: "BM Group — réalisation signature",
};

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export function Hero({ pillars }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [0, 0] : [0, -90],
  );

  return (
    <section className="fine-noise editorial-mesh relative isolate px-4 pb-3 pt-2 sm:px-8 sm:pt-4 lg:px-14">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        <div className="grid items-center gap-8 pb-7 pt-4 sm:pb-10 sm:pt-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pb-10 lg:pt-5">
          <div className="relative z-10 order-2 lg:order-1">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.72, delay: 0.08, ease: [0.21, 1, 0.21, 1] }}
              className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.45em]"
            >
              Groupe premium multi-métiers
            </motion.p>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.18, ease: [0.21, 1, 0.21, 1] }}
              className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.88] tracking-[-0.06em] text-deep-green sm:mt-7 sm:text-7xl lg:text-8xl"
            >
              Concevoir. Bâtir. Valoriser.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.78, delay: 0.28, ease: [0.21, 1, 0.21, 1] }}
              className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8"
            >
              Expert de l&apos;immobilier et de la construction, BM Group unit la puissance
              du bâtiment à la finesse de l&apos;agencement sur mesure pour des réalisations
              d&apos;exception.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.78, delay: 0.38, ease: [0.21, 1, 0.21, 1] }}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-deep-green px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_24px_60px_rgba(16,37,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#18392f] sm:px-7 sm:text-sm"
              >
                Discuter d&apos;un projet
              </a>
              <a
                href="#metiers"
                className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/45 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-green backdrop-blur transition hover:-translate-y-0.5 hover:border-gold sm:px-7 sm:text-sm"
              >
                Découvrir nos métiers
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-8 grid grid-cols-3 gap-3 border-y border-foreground/10 py-5 sm:max-w-xl sm:gap-5"
            >
              {pillars.map((pillar) => (
                <div key={pillar.name} className="flex flex-col gap-1">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-deep-green sm:text-xs">
                    {pillar.name}
                  </p>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.22em] text-ink-soft/80 sm:text-[0.62rem]">
                    {pillar.pole}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.24, ease: [0.21, 1, 0.21, 1] }}
            className="relative order-1 min-h-104 sm:min-h-132 lg:order-2 lg:min-h-144"
          >
            <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-px w-20 bg-gold sm:w-28" />
            <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-20 w-px bg-gold sm:h-28" />
            <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-px w-20 bg-gold sm:w-28" />
            <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-20 w-px bg-gold sm:h-28" />

            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-5 overflow-hidden border border-deep-green/10 shadow-[0_50px_120px_rgba(16,37,31,0.22)] sm:inset-7"
            >
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-deep-green/70 via-deep-green/10 to-deep-green/15" />

              <div className="absolute inset-x-5 bottom-5 border-t border-gold/60 pt-3 sm:inset-x-7 sm:bottom-7 sm:pt-4">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-gold sm:text-[0.65rem] sm:tracking-[0.36em]">
                  Construction · Agencement · Immobilier
                </p>
                <p className="mt-2 max-w-sm font-serif text-xl leading-tight tracking-tight text-white sm:text-2xl">
                  Trois pôles, une seule direction.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
