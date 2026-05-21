import Image from "next/image";
import Link from "next/link";
import { bmGroupLogo } from "@/lib/branding";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-background px-4 text-foreground sm:px-8 lg:px-14">
      <header className="flex items-center justify-between border-b border-foreground/10 py-4 sm:py-6">
        <Link
          href="/"
          className="group relative block shrink-0"
          aria-label="Retour accueil BM Group"
        >
          <Image
            src={bmGroupLogo.src}
            alt={bmGroupLogo.alt}
            width={bmGroupLogo.width}
            height={bmGroupLogo.height}
            className="h-10 w-auto object-contain opacity-95 transition-opacity group-hover:opacity-100 sm:h-11"
            priority
            sizes="(max-width: 768px) 140px, 160px"
          />
        </Link>
        <Link
          href="/"
          className="rounded-full border border-deep-green/20 bg-white/55 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur transition hover:border-deep-green hover:bg-deep-green hover:text-white sm:px-5 sm:text-xs"
        >
          Accueil
        </Link>
      </header>

      <section className="flex flex-1 flex-col items-start justify-center py-20 sm:py-32">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
          Erreur 404
        </p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-deep-green sm:text-7xl">
          Cette page n&apos;existe pas — ou plus.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
          Le lien suivi est peut-être obsolète. Revenez à l&apos;accueil pour
          retrouver nos pôles, ou consultez le journal pour nos dernières
          actualités.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-deep-green px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_24px_60px_rgba(16,37,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#18392f] sm:px-7 sm:text-sm"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/45 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-green backdrop-blur transition hover:-translate-y-0.5 hover:border-gold sm:px-7 sm:text-sm"
          >
            Lire le journal
          </Link>
        </div>
      </section>
    </main>
  );
}
