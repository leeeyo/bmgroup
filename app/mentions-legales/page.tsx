import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bmGroupLogo } from "@/lib/branding";
import { siteUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Mentions légales | BM Group",
  description:
    "Mentions légales du site BM Group — éditeur, hébergement, propriété intellectuelle et contact.",
  alternates: {
    canonical: `${siteUrl}/mentions-legales`,
  },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground sm:px-8 lg:px-14">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-4 sm:pb-6">
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

        <article className="py-10 sm:py-14">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
            Informations légales
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-deep-green sm:text-6xl">
            Mentions légales.
          </h1>

          <div className="mt-10 space-y-10 text-base leading-7 text-ink-soft">
            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Éditeur du site
              </h2>
              <p className="mt-4">
                Le présent site est édité par <strong>BM Group</strong>, holding
                réunissant EBM, BM Wood et IBM.
              </p>
              <ul className="mt-4 space-y-1">
                <li>Adresse : Riadh Andalous, Tunis, Tunisie.</li>
                <li>Téléphone : +216 22 181 181.</li>
                <li>
                  Email :{" "}
                  <a
                    href="mailto:contact@bmgroup.tn"
                    className="text-deep-green underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                  >
                    contact@bmgroup.tn
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Directeur de la publication
              </h2>
              <p className="mt-4">
                Le directeur de la publication est le représentant légal de BM
                Group.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Hébergement
              </h2>
              <p className="mt-4">
                Le site est hébergé sur un serveur dédié exploité par BM Group.
                Les coordonnées complètes de l&apos;hébergeur peuvent être
                obtenues sur demande à l&apos;adresse{" "}
                <a
                  href="mailto:contact@bmgroup.tn"
                  className="text-deep-green underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                >
                  contact@bmgroup.tn
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Propriété intellectuelle
              </h2>
              <p className="mt-4">
                L&apos;ensemble des contenus présents sur ce site (textes,
                images, illustrations, logos, marques) est protégé par la
                législation en vigueur en matière de propriété intellectuelle.
                Toute reproduction, représentation, diffusion ou exploitation,
                totale ou partielle, sans autorisation préalable et écrite de BM
                Group est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Responsabilité
              </h2>
              <p className="mt-4">
                BM Group s&apos;efforce de maintenir le site à jour et exact.
                Toutefois, des erreurs ou omissions peuvent survenir.
                L&apos;utilisateur est invité à signaler toute information
                inexacte à l&apos;adresse contact@bmgroup.tn. BM Group ne saurait
                être tenu responsable des dommages, directs ou indirects, liés à
                l&apos;utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Données personnelles
              </h2>
              <p className="mt-4">
                Le traitement des données personnelles collectées via le
                formulaire de contact est détaillé dans notre{" "}
                <Link
                  href="/confidentialite"
                  className="text-deep-green underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
