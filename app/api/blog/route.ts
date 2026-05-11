import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  replaceBase64ImagesInMarkdown,
  uploadBase64ImageToR2,
} from "@/lib/cloudflare-r2";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, content, slug, author, coverImage, published } =
      body;

    if (!title || !excerpt || !content || !slug || !author?.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }

    const uploadedCoverImage = coverImage
      ? await uploadBase64ImageToR2(coverImage)
      : undefined;
    const uploadedContent = await replaceBase64ImagesInMarkdown(content);

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content: uploadedContent,
        slug,
        authorName: author.name,
        coverImage: uploadedCoverImage,
        published: published || false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      slug,
      author,
      coverImage,
      published,
      originalSlug,
    } = body;

    if (originalSlug && slug !== originalSlug) {
      const existing = await prisma.blogPost.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 },
        );
      }
    }

    const uploadedCoverImage = coverImage
      ? await uploadBase64ImageToR2(coverImage)
      : undefined;
    const uploadedContent = await replaceBase64ImagesInMarkdown(content);

    const post = await prisma.blogPost.update({
      where: { slug: originalSlug || slug },
      data: {
        title,
        excerpt,
        content: uploadedContent,
        slug,
        authorName: author.name,
        coverImage: uploadedCoverImage,
        published: published,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}
