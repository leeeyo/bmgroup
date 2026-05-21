import Image from "next/image";
import Link from "next/link";
import { CompaniesCarousel } from "@/components/companies-carousel";
import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteHeader } from "@/components/site-header";
import { bmGroupLogo } from "@/lib/branding";
import { blogArticles, siteUrl } from "@/lib/blog";

const companies = [
  {
    name: "EBM",
    pole: "Construction",
    eyebrow: "Bâtir & rénover",
    line: "Chantiers maîtrisés. Exécution précise. Standards durables.",
    logo: "/logo-ebm.png",
    image: "/hero-bmgroup/cover-bmgroup-ebm.png",
    imageAlt: "EBM — chantier de construction premium signé BM Group",
    keywords: ["Conception", "Réalisation", "Suivi"],
    url: "https://ebm-entreprise.tn",
    domain: "ebm-entreprise.tn",
    ctaLabel: "Découvrir EBM",
  },
  {
    name: "BM Wood",
    pole: "Agencement",
    eyebrow: "Bois & mobilier",
    line: "Pièces sur mesure. Matières nobles. Finitions silencieuses.",
    logo: "/logo-bmwood.png",
    image: "/hero-bmgroup/cover-bmgroup-bmwood.png",
    imageAlt: "BM Wood — agencement bois sur mesure et finitions nobles",
    keywords: ["Sur mesure", "Bois noble", "Finitions"],
    url: "https://bmwood.tn",
    domain: "bmwood.tn",
    ctaLabel: "Découvrir BM Wood",
  },
  {
    name: "IBM",
    pole: "Immobilier",
    eyebrow: "Immobilier & valeur",
    line: "Développement, vente et investissement avec vision patrimoniale.",
    logo: "/logo-ibm.png",
    image: "/hero-bmgroup/cover-bmgroup-ibm.png",
    imageAlt: "IBM — résidence patrimoniale d'exception",
    keywords: ["Développement", "Investissement", "Patrimoine"],
    url: "https://ibm-immobiliere.tn",
    domain: "ibm-immobiliere.tn",
    ctaLabel: "Découvrir IBM",
  },
];

const commitments: [string, string][] = [
  ["Direction intégrée", "Un seul groupe pour coordonner matière, chantier et actif."],
  ["Signature premium", "Une exigence visible dans chaque ligne, choix et finition."],
  ["Valeur long terme", "Des projets pensés pour durer, servir et prendre de la valeur."],
];

// TODO(stats): remplacer par les vrais chiffres dès qu'ils sont validés.
const keyFigures = [
  { value: "3", label: "Pôles intégrés", caption: "Construction · Agencement · Immobilier" },
  { value: "Tunis", label: "Implantation", caption: "Riadh Andalous · Tunisie" },
  { value: "Sur mesure", label: "Approche", caption: "Chaque projet, un cahier dédié" },
  { value: "Premium", label: "Standard", caption: "Une exigence, sans compromis" },
];

const methodSteps = [
  {
    step: "01",
    title: "Cadrage",
    text: "Comprendre l'usage, l'ambition et le budget — avant la première ligne.",
  },
  {
    step: "02",
    title: "Conception",
    text: "Plans, matières, références — chaque détail tranché en amont.",
  },
  {
    step: "03",
    title: "Exécution",
    text: "Chantier piloté, fournisseurs sélectionnés, qualité tenue jour après jour.",
  },
  {
    step: "04",
    title: "Livraison",
    text: "Recette, transmission et suivi long-terme — pour que la valeur s'inscrive.",
  },
];

const breakerImage = {
  src: "/hero/hero2.png",
  alt: "BM Group — atelier d'agencement et conception",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BM Group",
    url: siteUrl,
    logo: `${siteUrl}/bmgroup.png`,
    description:
      "BM Group réunit EBM, BM Wood et IBM autour de la construction, de l'agencement sur mesure et de l'immobilier.",
    department: companies.map((company) => ({
      "@type": "Organization",
      name: company.name,
      url: company.url,
    })),
    sameAs: [],
  };

  const heroPillars = companies.map((c) => ({ name: c.name, pole: c.pole }));

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <SiteHeader />
      <Hero pillars={heroPillars} />

      {/* TODO(stats): remplacer les libellés ci-dessous par les vrais chiffres dès qu'ils sont fournis. */}
      <section
        id="chiffres"
        aria-label="Chiffres-clés BM Group"
        className="border-y border-foreground/10 bg-stone px-4 py-10 sm:px-8 sm:py-14 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:divide-x lg:divide-foreground/10">
            {keyFigures.map((figure, index) => (
              <Reveal
                key={figure.label}
                delay={index * 80}
                className="flex flex-col gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">
                  {figure.label}
                </p>
                <p className="font-serif text-5xl font-semibold leading-none tracking-[-0.04em] text-deep-green sm:text-6xl">
                  {figure.value}
                </p>
                <p className="text-sm leading-6 text-ink-soft">{figure.caption}</p>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </section>

      <CompaniesCarousel companies={companies} />

      <section
        aria-label="Manifeste BM Group"
        className="relative isolate w-full overflow-hidden"
      >
        <div className="relative aspect-4/3 w-full sm:aspect-16/10 lg:aspect-21/9">
          <Image
            src={breakerImage.src}
            alt={breakerImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-deep-green/55" />
          <div className="absolute inset-0 bg-linear-to-r from-deep-green/85 via-deep-green/50 to-deep-green/15" />
          <Reveal className="absolute inset-0 flex items-center px-4 sm:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-7xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.42em] text-gold">
                BM Group — Manifeste
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:mt-6 sm:text-5xl lg:text-6xl">
                Une seule direction, du chantier à l&apos;agencement.
              </h2>
              <span aria-hidden className="mt-6 block h-px w-24 bg-gold sm:mt-8 sm:w-32" />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="vision"
        className="relative overflow-hidden bg-deep-green px-4 py-12 text-white sm:px-8 sm:py-16 lg:px-14"
      >
        <div className="absolute inset-0 opacity-20 architectural-grid" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="relative flex flex-col">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
              Vision de groupe
            </p>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              Une signature sobre, solide et maîtrisée.
            </h2>
            <figure className="mt-10 border-l border-gold/60 pl-5 sm:mt-12 sm:pl-7">
              <blockquote className="font-serif text-2xl italic leading-tight tracking-tight text-white/85 sm:text-3xl">
                « La signature, c&apos;est la somme des détails que personne ne voit. »
              </blockquote>
              <figcaption className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold/80">
                BM Group — Manifeste
              </figcaption>
            </figure>
            <a
              href="#contact"
              className="mt-10 inline-flex w-fit items-center gap-2 self-start rounded-full border border-gold/50 bg-transparent px-6 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gold transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 sm:mt-12 sm:px-7 sm:text-xs"
            >
              Parlons de votre projet
              <span aria-hidden>→</span>
            </a>
          </Reveal>
          <div className="relative grid gap-4">
            {commitments.map(([title, text], index) => (
              <Reveal
                key={title}
                delay={index * 100}
                className="grid gap-4 border border-white/10 bg-white/5 p-5 backdrop-blur sm:grid-cols-[5rem_1fr] sm:gap-6 sm:p-6"
              >
                <div className="flex flex-col gap-3">
                  <span aria-hidden className="block h-px w-10 bg-gold" />
                  <span className="font-serif text-4xl text-gold">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl tracking-[-0.035em]">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="methode" className="bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-6 border-y border-foreground/10 py-8 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Méthode
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-none tracking-[-0.045em] text-deep-green sm:text-6xl">
                Une exécution qui ne laisse rien au hasard.
              </h2>
            </div>
          </Reveal>

          <ol className="relative mt-10 grid gap-6 sm:mt-14 lg:grid-cols-4 lg:gap-0">
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-[1.55rem] hidden h-px bg-linear-to-r from-transparent via-gold/45 to-transparent lg:block"
            />
            {methodSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.step}
                delay={index * 100}
                className="relative flex gap-4 border-l border-gold/40 pl-5 lg:flex-col lg:border-l-0 lg:pl-0 lg:pr-6 lg:last:pr-0"
              >
                <span
                  aria-hidden
                  className="hidden size-3 shrink-0 rounded-full border-2 border-gold bg-background lg:block"
                />
                <div className="lg:mt-6">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-gold">
                    Étape {step.step}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold tracking-[-0.03em] text-deep-green sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft sm:text-[0.95rem] sm:leading-7">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="blog" className="bg-[#fbfaf6] px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-5 border-y border-foreground/10 py-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Journal
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.045em] text-deep-green sm:text-6xl">
                Des nouvelles qui donnent de la profondeur au groupe.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit rounded-full border border-deep-green/15 bg-white/60 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold"
            >
              Lire le journal
            </Link>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {blogArticles.map((article, index) => (
              <Reveal
                as="article"
                key={article.slug}
                delay={index * 100}
                className="group flex flex-col overflow-hidden rounded-sm border border-foreground/10 bg-white shadow-[0_14px_44px_rgba(22,23,18,0.06)] transition hover:border-gold/35 hover:shadow-[0_22px_60px_rgba(22,23,18,0.09)]"
              >
                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-stone">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-foreground/10 px-5 py-5 text-deep-green sm:px-6 sm:py-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-deep-green/15 bg-deep-green/4 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-deep-green/80">
                      {article.category}
                    </span>
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
                      {article.readingTime}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold">
                      {article.eyebrow}
                    </p>
                    <h3
                      className={`mt-3 font-serif font-semibold leading-[1.05] tracking-[-0.04em] text-deep-green ${
                        index === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <p className="mt-4 max-w-lg flex-1 text-sm leading-relaxed text-ink-soft">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="mt-6 inline-flex text-xs font-bold uppercase tracking-[0.22em] text-gold transition group-hover:translate-x-1"
                    >
                      Lire l&apos;article
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex justify-end sm:mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-gold transition hover:translate-x-1"
            >
              Lire tout le journal
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="px-4 pb-4 pt-6 sm:px-8 sm:pt-10 lg:px-14">
        <div className="mx-auto max-w-7xl overflow-hidden bg-[#0f100c] text-white shadow-[0_40px_120px_rgba(8,9,6,0.35)]">
          <div className="grid gap-12 p-6 sm:p-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:p-16">
            <Reveal className="flex flex-col gap-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Contact
              </p>
              <h2 className="max-w-xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Un projet exigeant mérite une direction claire.
              </h2>
              <p className="max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                Particuliers, professionnels et investisseurs : échangeons sur la
                prochaine adresse à créer, rénover ou valoriser.{" "}
                <span className="text-white/90">Réponse sous 48 h.</span>
              </p>

              <dl className="mt-6 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold/80">
                    Email
                  </dt>
                  <dd className="mt-2 font-serif text-xl tracking-tight sm:text-2xl">
                    <a
                      href="mailto:contact@bmgroup.tn"
                      className="border-b border-transparent transition hover:border-gold"
                    >
                      contact@bmgroup.tn
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold/80">
                    Téléphone
                  </dt>
                  <dd className="mt-2 font-serif text-xl tracking-tight text-white/90 sm:text-2xl">
                    <a
                      href="tel:+21622181181"
                      className="border-b border-transparent transition hover:border-gold"
                    >
                      +216 22 181 181
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold/80">
                    Adresse
                  </dt>
                  <dd className="mt-2 font-serif text-xl tracking-tight text-white/90 sm:text-2xl">
                    Riadh Andalous, Tunis
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>

          <div
            aria-hidden
            className="h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
          />

          <footer className="flex flex-col gap-8 px-6 py-8 sm:px-12 sm:py-10 lg:px-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <Image
                src={bmGroupLogo.src}
                alt={bmGroupLogo.alt}
                width={bmGroupLogo.width}
                height={bmGroupLogo.height}
                className="h-12 w-auto max-w-[180px] object-contain object-left opacity-90 brightness-0 invert sm:h-14"
                sizes="180px"
              />
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                EBM · BM Wood · IBM
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 BM Group. Tous droits réservés.</p>
              <div className="flex gap-6">
                <Link href="/mentions-legales" className="transition hover:text-gold">
                  Mentions légales
                </Link>
                <Link href="/confidentialite" className="transition hover:text-gold">
                  Confidentialité
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
