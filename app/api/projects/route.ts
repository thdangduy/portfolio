import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  replaceBase64ImagesInHtml,
  uploadBase64ImageToR2,
} from "@/lib/cloudflare-r2";
import { prisma } from "@/lib/prisma";
import { ProjectInterface } from "@/lib/schema/project.schema";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

function slugify(str: string) {
  str = str.trim();
  str = str.toLowerCase();
  str = str.replace(/[àáäâãåā]/g, "a");
  str = str.replace(/[èéëêēėę]/g, "e");
  str = str.replace(/[ìíïîīį]/g, "i");
  str = str.replace(/[òóöôõøō]/g, "o");
  str = str.replace(/[ùúüûūų]/g, "u");
  str = str.replace(/ç/g, "c");
  str = str.replace(/ñ/g, "n");
  str = str.replace(/[^a-z0-9 -]/g, "");
  str = str.replace(/\s+/g, "-");
  str = str.replace(/-+/g, "-");

  return str;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: ProjectInterface = await request.json();

    body.description = await replaceBase64ImagesInHtml(body.description);
    body.thumbnail = await uploadBase64ImageToR2(body.thumbnail);
    body.slug = slugify(body.title);

    const now = new Date();
    body.updated_at = now;
    body.created_at = now;

    const project = await prisma.project.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        description: body.description,
        tags: body.tags,
        technologies: body.technologies,
        thumbnail: body.thumbnail,
        slug: body.slug,
        link: body.link || "",
        created_at: body.created_at,
        updated_at: body.updated_at,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
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

    const body: ProjectInterface & { originalSlug?: string } =
      await request.json();

    if (!body.originalSlug && !body.slug) {
      return NextResponse.json(
        { error: "Slug or originalSlug is required" },
        { status: 400 },
      );
    }

    const originalSlug = body.originalSlug || body.slug;

    // Check if slug is being changed and if new slug already exists
    if (body.slug !== originalSlug) {
      const existing = await prisma.project.findUnique({
        where: { slug: body.slug },
      });
      if (existing) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 },
        );
      }
    }

    body.description = await replaceBase64ImagesInHtml(body.description);
    body.thumbnail = await uploadBase64ImageToR2(body.thumbnail);
    body.updated_at = new Date();

    const project = await prisma.project.update({
      where: { slug: originalSlug },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        description: body.description,
        tags: body.tags,
        technologies: body.technologies,
        thumbnail: body.thumbnail,
        slug: body.slug,
        link: body.link || "",
        updated_at: body.updated_at,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 },
      );
    }

    await prisma.project.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
