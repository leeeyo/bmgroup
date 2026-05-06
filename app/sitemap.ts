import type { MetadataRoute } from "next";
import { blogArticles, siteUrl } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-05-05");

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogArticles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
