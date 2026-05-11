import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://portfolio.thaiduy.digital";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/blog/editor", "/projects/form", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
