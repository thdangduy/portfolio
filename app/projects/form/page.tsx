import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ProjectForm from "@/components/project/form";
import { auth } from "@/lib/auth";

export default async function ProjectFormPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { slug } = await searchParams;

  return <ProjectForm projectSlug={slug} />;
}
