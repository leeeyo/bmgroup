import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bmGroupLogo } from "@/lib/branding";
import { blogArticles, siteUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal | BM Group",
  description:
    "Actualités BM Group: construction, rénovation, immobilier, agencement haut de gamme et vie du groupe.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Journal | BM Group",
    description:
      "Découvrez les actualités et coulisses de EBM, BM Wood et IBM.",
    url: `${siteUrl}/blog`,
    siteName: "BM Group",
    locale: "fr_FR",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-4 sm:pb-6">
          <Link href="/" className="group relative block shrink-0" aria-label="Retour accueil">
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

        <section className="py-10 sm:py-14">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
            Journal BM Group
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-deep-green sm:text-7xl">
            Actualités, projets et culture du détail.
          </h1>
        </section>

        <section className="mx-auto grid max-w-5xl gap-5 pb-12 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm border border-foreground/10 bg-background shadow-[0_12px_40px_rgba(22,23,18,0.06)] transition hover:border-deep-green/20 hover:shadow-[0_22px_56px_rgba(22,23,18,0.1)]"
            >
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-stone">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-4 border-t border-foreground/10 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex items-center gap-2">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-deep-green/50">
                    {article.category}
                  </span>
                  <span className="text-deep-green/30" aria-hidden>
                    ·
                  </span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
                    {article.readingTime}
                  </span>
                </div>
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl font-semibold leading-[1.06] tracking-[-0.035em] text-deep-green sm:text-[1.65rem]">
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
                </div>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold transition group-hover:translate-x-1">
                  Lire l&apos;article
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
