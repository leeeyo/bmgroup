import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { GaRouteTracker } from "@/components/ga-route-tracker";
import { siteUrl } from "@/lib/blog";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  title: "BM Group | Bois, construction et immobilier d'exception",
  description:
    "BM Group réunit BM Wood, BM Entreprise et IBM autour d'une même exigence: concevoir, bâtir et valoriser des projets durables au Maroc.",
  applicationName: "BM Group",
  keywords: [
    "BM Group",
    "BM Wood",
    "BM Entreprise",
    "IBM immobilier",
    "mobilier haut de gamme",
    "construction",
    "rénovation",
    "promotion immobilière",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "BM Group | Bois, construction et immobilier d'exception",
    description:
      "Bois haut de gamme, construction, rénovation et développement immobilier réunis dans un groupe premium.",
    url: siteUrl,
    siteName: "BM Group",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/blog/blog-3.png",
        alt: "BM Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BM Group | Bois, construction et immobilier d'exception",
    description:
      "BM Group réunit BM Wood, BM Entreprise et IBM autour d'une même exigence premium.",
    images: ["/blog/blog-3.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {gaMeasurementId ? (
          <>
            <GoogleAnalytics gaId={gaMeasurementId} />
            <GaRouteTracker />
          </>
        ) : null}
      </body>
    </html>
  );
}
