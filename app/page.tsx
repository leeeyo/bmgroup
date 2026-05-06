"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { bmGroupLogo } from "@/lib/branding";
import { blogArticles, siteUrl } from "@/lib/blog";

const companies = [
  {
    name: "BM Wood",
    eyebrow: "Bois & mobilier",
    line: "Pièces sur mesure. Matières nobles. Finitions silencieuses.",
    logo: "/logo-bmwood.png",
  },
  {
    name: "BM Entreprise",
    eyebrow: "Bâtir & rénover",
    line: "Chantiers maîtrisés. Exécution précise. Standards durables.",
    logo: "/logo-ebm.png",
  },
  {
    name: "IBM",
    eyebrow: "Immobilier & valeur",
    line: "Développement, vente et investissement avec vision patrimoniale.",
    logo: "/logo-ibm.png",
  },
];

const commitments = [
  ["Direction intégrée", "Un seul groupe pour coordonner matière, chantier et actif."],
  ["Signature premium", "Une exigence visible dans chaque ligne, choix et finition."],
  ["Valeur long terme", "Des projets pensés pour durer, servir et prendre de la valeur."],
];

const heroImages = [
  {
    src: "/hero/hero1.png",
    alt: "BM Group — visuel hero principal",
  },
  {
    src: "/hero/hero2.png",
    alt: "BM Group — visuel hero gauche bas",
  },
  {
    src: "/hero/hero3.png",
    alt: "BM Group — visuel hero droite bas",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -90]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BM Group",
    url: siteUrl,
    logo: `${siteUrl}/bmgroup.png`,
    description:
      "BM Group réunit BM Wood, BM Entreprise et IBM autour du bois haut de gamme, de la construction et de l'immobilier.",
    department: companies.map((company) => ({
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
    })),
    sameAs: [],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gold"
        style={{ scaleX: progressScale }}
      />

      <section className="fine-noise architectural-grid relative isolate px-4 pb-3 pt-1 sm:px-8 sm:pt-2 lg:px-14">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
          <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 1, 0.21, 1] }}
            className="flex items-center justify-between border-b border-foreground/10 pb-4 sm:pb-6"
          >
            <a href="#" className="group relative block shrink-0" aria-label="Accueil BM Group">
              <Image
                src={bmGroupLogo.src}
                alt={bmGroupLogo.alt}
                width={bmGroupLogo.width}
                height={bmGroupLogo.height}
                className="h-10 w-auto object-contain opacity-95 transition-opacity group-hover:opacity-100 sm:h-11"
                priority
                sizes="(max-width: 768px) 140px, 160px"
              />
            </a>
            <nav className="hidden items-center gap-10 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-foreground/60 md:flex">
              <a className="transition hover:text-deep-green" href="#metiers">
                Métiers
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
              Contact
            </a>
          </motion.header>

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
                BM Group unit le bois haut de gamme, la construction et l&apos;immobilier dans
                une même culture de précision.
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.78, delay: 0.38, ease: [0.21, 1, 0.21, 1] }}
                className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
              >
                <a
                  href="#metiers"
                  className="inline-flex items-center justify-center rounded-full bg-deep-green px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_24px_60px_rgba(16,37,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#18392f] sm:px-7 sm:text-sm"
                >
                  Explorer
                </a>
                <a
                  href="#vision"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-white/45 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-green backdrop-blur transition hover:-translate-y-0.5 hover:border-gold sm:px-7 sm:text-sm"
                >
                  Vision
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="mt-8 grid grid-cols-3 gap-3 border-y border-foreground/10 py-4 sm:max-w-lg"
              >
                {["BM Wood", "BM Entreprise", "IBM"].map((item) => (
                  <p
                    key={item}
                    className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground/55 sm:text-xs"
                  >
                    {item}
                  </p>
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
              <div className="absolute left-1/2 top-8 h-[78%] w-[72%] -translate-x-1/2 rounded-t-full border border-deep-green/15 bg-white/45 shadow-[0_40px_100px_rgba(22,23,18,0.12)] backdrop-blur" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-8 h-[58%] w-[72%] overflow-hidden rounded-t-[12rem] rounded-br-[3rem] shadow-[0_34px_80px_rgba(16,37,31,0.24)] sm:left-4 sm:w-[64%]"
              >
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 72vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-deep-green/20 mix-blend-multiply" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 right-0 h-[46%] w-[57%] overflow-hidden border-10 border-background bg-stone shadow-[0_30px_80px_rgba(22,23,18,0.18)] sm:right-4 sm:w-[50%]"
              >
                <Image
                  src={heroImages[2].src}
                  alt={heroImages[2].alt}
                  fill
                  sizes="(max-width: 1024px) 58vw, 28vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 1.4, 0], y: [0, -6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-3 left-7 h-40 w-36 overflow-hidden border-8 border-background shadow-2xl sm:h-52 sm:w-44"
              >
                <Image
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute right-3 top-3 grid size-28 place-items-center rounded-full border border-white/70 bg-background/85 text-center shadow-xl backdrop-blur sm:size-36">
                <div>
                  <span className="font-serif text-4xl leading-none text-deep-green sm:text-5xl">
                    3
                  </span>
                  <span className="mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.22em] text-ink-soft sm:text-[0.63rem]">
                    pôles
                  </span>
                </div>
              </div>
              <div className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 border border-gold/50 bg-deep-green px-5 py-4 text-white shadow-2xl sm:block">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.34em] text-gold">
                  Matière · Structure · Adresse
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="metiers" className="bg-[#fbfaf6] px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.21, 1, 0.21, 1] }}
            className="grid gap-6 border-y border-foreground/10 py-8 sm:py-10 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Nos sociétés
              </p>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-none tracking-[-0.045em] text-deep-green sm:text-6xl">
                Un triptyque puissant.
              </h2>
            </div>
          </motion.div>

          <div className="mt-6 grid auto-rows-fr gap-4 sm:mt-8 lg:grid-cols-3">
            {companies.map((company, index) => (
              <motion.article
                key={company.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.75, delay: index * 0.12, ease: [0.21, 1, 0.21, 1] }}
                className="group flex h-full min-h-0 flex-col overflow-hidden border border-foreground/10 bg-deep-green shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
              >
                <div className="flex h-36 w-full shrink-0 items-center justify-center bg-stone px-5 sm:h-40">
                  <Image
                    src={company.logo}
                    alt={`Logo ${company.name}`}
                    width={360}
                    height={180}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="max-h-16 w-auto max-w-[min(100%,11rem)] object-contain sm:max-h-21"
                    priority={index === 0}
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col border-t border-white/10 px-5 py-5 text-white sm:px-6 sm:py-6">
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-gold/90">
                    {company.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                    {company.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-white/72">{company.line}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vision"
        className="relative overflow-hidden bg-deep-green px-4 py-12 text-white sm:px-8 sm:py-16 lg:px-14"
      >
        <div className="absolute inset-0 opacity-20 architectural-grid" />
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.21, 1, 0.21, 1] }}
            className="relative"
          >
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
              Vision de groupe
            </p>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              Une signature sobre, solide et maîtrisée.
            </h2>
          </motion.div>
          <div className="relative grid gap-4">
            {commitments.map(([title, text], index) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 1, 0.21, 1] }}
                className="grid gap-4 border border-white/10 bg-white/5 p-5 backdrop-blur sm:grid-cols-[5rem_1fr] sm:gap-6 sm:p-6"
              >
                <span className="font-serif text-4xl text-gold">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl tracking-[-0.035em]">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-8 sm:py-14 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Sur mesure", "Solutions calibrées."],
            ["Exécution", "Délais, budget, qualité."],
            ["Valeur", "Élégance et usage."],
            ["Confiance", "Un interlocuteur clair."],
          ].map(([title, text]) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              className="border-l border-gold/60 bg-white/35 p-6 pl-6 shadow-sm backdrop-blur"
            >
              <h3 className="font-serif text-3xl font-semibold tracking-[-0.035em] text-deep-green">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-[#fbfaf6] px-4 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.21, 1, 0.21, 1] }}
            className="flex flex-col gap-5 border-y border-foreground/10 py-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Journal
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.045em] text-deep-green sm:text-6xl">
                Des nouvelles qui donnent de la profondeur au groupe.
              </h2>
            </div>
            <Link
              href="/blog/rendez-vous-bm-group"
              className="inline-flex w-fit rounded-full border border-deep-green/15 bg-white/60 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-gold"
            >
              Lire le journal
            </Link>
          </motion.div>

          <div className="mx-auto mt-8 grid max-w-6xl gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {blogArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.72, delay: index * 0.1, ease: [0.21, 1, 0.21, 1] }}
                className="group flex flex-col overflow-hidden rounded-sm border border-foreground/10 bg-white shadow-[0_14px_44px_rgba(22,23,18,0.06)] transition hover:border-gold/35 hover:shadow-[0_22px_60px_rgba(22,23,18,0.09)]"
              >
                <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden bg-stone">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-4 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl overflow-hidden bg-[#161712] text-white">
          <div className="grid gap-10 p-6 sm:p-12 lg:grid-cols-[1fr_0.7fr] lg:p-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.21, 1, 0.21, 1] }}
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                Contact
              </p>
              <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                Un projet exigeant mérite une direction claire.
              </h2>
            </motion.div>
            <div className="flex flex-col justify-between gap-10 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-base leading-8 text-white/70">
                Particuliers, professionnels et investisseurs: échangeons sur la prochaine
                adresse à créer, rénover ou valoriser.
              </p>
              <a
                href="mailto:contact@bmgroup.tn"
                className="inline-flex w-fit rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#161712] transition hover:-translate-y-0.5 hover:bg-[#d3b16f] sm:px-7 sm:text-sm"
              >
                contact@bmgroup.tn
              </a>
            </div>
          </div>
          <footer className="flex flex-col gap-6 border-t border-white/10 px-8 py-8 text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-7 lg:px-16">
            <Image
              src={bmGroupLogo.src}
              alt={bmGroupLogo.alt}
              width={bmGroupLogo.width}
              height={bmGroupLogo.height}
              className="h-14 w-auto max-w-[200px] object-contain object-left opacity-90 sm:h-16"
              sizes="200px"
            />
            <p className="text-xs uppercase tracking-[0.28em]">BM Wood · BM Entreprise · IBM</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
