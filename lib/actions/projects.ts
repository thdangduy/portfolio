"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import { prisma } from "../prisma";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function deleteProject(slug: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    await prisma.project.delete({
      where: { slug },
    });

    revalidatePath("/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
