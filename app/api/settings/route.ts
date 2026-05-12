import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeSiteSettings, SITE_SETTINGS_ID } from "@/lib/site-settings";

const stringFields = [
  "aboutTitle",
  "aboutQuote",
  "aboutPrinciples",
  "aboutSubquote",
  "aboutFootnote",
  "skillsTitle",
  "faviconUrl",
  "metaTitle",
  "metaDescription",
  "authorName",
  "siteUrl",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "twitterTitle",
  "twitterDescription",
] as const;

const listFields = [
  "aboutParagraphs",
  "competencies",
  "tools",
  "metaKeywords",
] as const;

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: SITE_SETTINGS_ID },
  });

  return NextResponse.json(normalizeSiteSettings(settings));
}

export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const data: Record<string, string | string[]> = {};

  for (const field of stringFields) {
    data[field] = String(body[field] ?? "").trim();
  }

  for (const field of listFields) {
    const value = body[field];
    data[field] = Array.isArray(value)
      ? value.map((item) => String(item).trim()).filter(Boolean)
      : [];
  }

  const normalized = normalizeSiteSettings(data);

  const settings = await prisma.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    create: normalized,
    update: {
      aboutTitle: normalized.aboutTitle,
      aboutParagraphs: normalized.aboutParagraphs,
      aboutQuote: normalized.aboutQuote,
      aboutPrinciples: normalized.aboutPrinciples,
      aboutSubquote: normalized.aboutSubquote,
      aboutFootnote: normalized.aboutFootnote,
      skillsTitle: normalized.skillsTitle,
      competencies: normalized.competencies,
      tools: normalized.tools,
      faviconUrl: normalized.faviconUrl,
      metaTitle: normalized.metaTitle,
      metaDescription: normalized.metaDescription,
      metaKeywords: normalized.metaKeywords,
      authorName: normalized.authorName,
      siteUrl: normalized.siteUrl,
      ogTitle: normalized.ogTitle,
      ogDescription: normalized.ogDescription,
      ogImage: normalized.ogImage,
      twitterTitle: normalized.twitterTitle,
      twitterDescription: normalized.twitterDescription,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/admin/settings", "page");

  return NextResponse.json(normalizeSiteSettings(settings));
}
