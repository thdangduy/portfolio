import { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

/**
 * Sitemap helps search engines like Google and Bing understand your website structure.
 * Next.js automatically generates the /sitemap.xml route from this file.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.thaiduy.digital";
  const now = new Date();

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // 2. Dynamic Project Routes from MongoDB
    const projects = await prisma.project.findMany({
      select: { slug: true, updated_at: true },
    });

    const projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/project/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    // 3. Dynamic Blog Routes (Published posts only)
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updated_at: true },
    });

    const blogRoutes = blogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: b.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to load dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
