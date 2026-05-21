"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { bmGroupLogo } from "@/lib/branding";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 24);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 1, 0.21, 1] }}
      className={`sticky top-0 z-40 border-b transition-all duration-300 ease-out ${
        isScrolled
          ? "border-foreground/10 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-14">
        <a href="#" className="group relative block shrink-0" aria-label="Accueil BM Group">
          <Image
            src={bmGroupLogo.src}
            alt={bmGroupLogo.alt}
            width={bmGroupLogo.width}
            height={bmGroupLogo.height}
            className="h-10 w-auto object-contain opacity-95 transition-opacity group-hover:opacity-100 sm:h-11"
            priority
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 140px, 160px"
          />
        </a>
        <nav className="hidden items-center gap-10 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-foreground/60 md:flex">
          <a className="transition hover:text-deep-green" href="#metiers">
            Métiers
          </a>
          <a className="transition hover:text-deep-green" href="#methode">
            Méthode
          </a>
          <a className="transition hover:text-deep-green" href="#vision">
            Vision
          </a>
          <a className="transition hover:text-deep-green" href="#blog">
            Journal
          </a>
          <a className="transition hover:text-deep-green" href="#contact">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-deep-green/20 bg-white/55 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur transition hover:border-deep-green hover:bg-deep-green hover:text-white sm:px-5 sm:text-xs"
        >
          Discuter
        </a>
      </div>
    </motion.header>
  );
}
