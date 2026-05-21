import type { MetadataRoute } from "next";
import { blogArticles, siteUrl } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestArticleDate = blogArticles
    .map((article) => new Date(article.publishedAt).getTime())
    .reduce((max, current) => Math.max(max, current), 0);
  const blogIndexLastMod = latestArticleDate
    ? new Date(latestArticleDate)
    : new Date();
  const homeLastMod = new Date();

  return [
    {
      url: siteUrl,
      lastModified: homeLastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: blogIndexLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogArticles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/mentions-legales`,
      lastModified: homeLastMod,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/confidentialite`,
      lastModified: homeLastMod,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
