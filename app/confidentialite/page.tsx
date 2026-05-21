import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bmGroupLogo } from "@/lib/branding";
import { siteUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Politique de confidentialité | BM Group",
  description:
    "Politique de confidentialité du site BM Group — données collectées, finalités, durée de conservation et droits.",
  alternates: {
    canonical: `${siteUrl}/confidentialite`,
  },
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
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
            Données personnelles
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-deep-green sm:text-6xl">
            Politique de confidentialité.
          </h1>

          <div className="mt-10 space-y-10 text-base leading-7 text-ink-soft">
            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Responsable de traitement
              </h2>
              <p className="mt-4">
                Le responsable du traitement des données collectées sur ce site
                est <strong>BM Group</strong>, dont les coordonnées figurent
                dans les{" "}
                <Link
                  href="/mentions-legales"
                  className="text-deep-green underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                >
                  mentions légales
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Données collectées
              </h2>
              <p className="mt-4">
                Le formulaire de contact collecte les informations suivantes,
                nécessaires au traitement de votre demande : nom, adresse email,
                numéro de téléphone (optionnel), société (optionnel), sujet et
                message.
              </p>
              <p className="mt-3">
                Aucune donnée sensible n&apos;est demandée. Le site n&apos;utilise
                pas de cookies de profilage publicitaire.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Finalités
              </h2>
              <p className="mt-4">
                Les données collectées sont utilisées exclusivement pour
                répondre à votre demande, organiser un rendez-vous ou vous
                transmettre une proposition. Elles ne sont jamais cédées à des
                tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Durée de conservation
              </h2>
              <p className="mt-4">
                Les demandes reçues via le formulaire sont conservées pour la
                durée nécessaire à leur traitement, augmentée d&apos;une période
                d&apos;archivage de trois ans à des fins de suivi commercial,
                puis supprimées.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Mesures techniques
              </h2>
              <p className="mt-4">
                Les données sont hébergées sur un serveur sécurisé exploité par
                BM Group, accessibles uniquement aux personnes habilitées. Les
                échanges entre votre navigateur et le site sont chiffrés (TLS).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Mesure d&apos;audience
              </h2>
              <p className="mt-4">
                Le site peut utiliser Google Analytics 4 dans une configuration
                respectueuse de la vie privée (anonymisation IP). Aucune donnée
                permettant de vous identifier directement n&apos;est partagée
                avec ce service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-deep-green sm:text-3xl">
                Vos droits
              </h2>
              <p className="mt-4">
                Conformément à la législation applicable, vous disposez
                d&apos;un droit d&apos;accès, de rectification, d&apos;effacement
                et d&apos;opposition au traitement de vos données. Pour exercer
                ces droits, écrivez à{" "}
                <a
                  href="mailto:contact@bmgroup.tn"
                  className="text-deep-green underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                >
                  contact@bmgroup.tn
                </a>{" "}
                en précisant votre demande.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
