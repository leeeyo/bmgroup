import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bmGroupLogo } from "@/lib/branding";
import { blogArticles, getArticleBySlug, siteUrl } from "@/lib/blog";

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable | BM Group",
    };
  }

  const url = `${siteUrl}/blog/${article.slug}`;

  return {
    title: `${article.title} | BM Group`,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: "BM Group",
      locale: "fr_FR",
      type: "article",
      publishedTime: article.publishedAt,
      images: [
        {
          url: `${siteUrl}${article.image}`,
          alt: article.imageAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: `${siteUrl}${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "BM Group",
    },
    publisher: {
      "@type": "Organization",
      name: "BM Group",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo-bmwood.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${article.slug}`,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="px-4 py-4 sm:px-8 lg:px-14">
        <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-foreground/10 pb-4 sm:pb-6">
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
            href="/blog"
            className="rounded-full border border-deep-green/20 bg-white/55 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-deep-green shadow-sm backdrop-blur transition hover:border-deep-green hover:bg-deep-green hover:text-white sm:px-5 sm:text-xs"
          >
            Journal
          </Link>
        </header>
      </div>

      <article>
        <section className="px-4 py-8 sm:px-8 sm:py-12 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.34em] text-gold sm:text-xs sm:tracking-[0.42em]">
                {article.eyebrow}
              </p>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-deep-green sm:text-7xl">
                {article.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-ink-soft">
                <span>{article.category}</span>
                <span className="text-gold">/</span>
                <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                <span className="text-gold">/</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft lg:ml-auto">
              {article.excerpt}
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-8 lg:px-14">
          <div className="relative mx-auto min-h-112 max-w-7xl overflow-hidden bg-deep-green shadow-[0_34px_90px_rgba(16,37,31,0.2)]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#08110d]/40 to-transparent" />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 sm:py-14 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.35fr_0.65fr]">
            <aside className="border-t border-gold/60 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink-soft">
                BM Wood · BM Entreprise · IBM
              </p>
            </aside>
            <div className="space-y-7 font-serif text-3xl leading-[1.15] tracking-[-0.03em] text-deep-green sm:text-4xl">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
