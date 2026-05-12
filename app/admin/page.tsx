import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AdminDashboard from "@/components/admin/admin-dashboard";
import { getblogPost } from "@/lib/actions/blogs";
import { getProjects } from "@/lib/actions/projects";
import { auth } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-settings";

const adminTabs = ["blog", "projects", "settings"] as const;
type AdminTab = (typeof adminTabs)[number];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; slug?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { tab, slug } = await searchParams;
  const activeTab = adminTabs.includes(tab as AdminTab)
    ? (tab as AdminTab)
    : "blog";

  const [posts, projects, settings] = await Promise.all([
    getblogPost(),
    getProjects(),
    getSiteSettings(),
  ]);

  const selectedPost =
    activeTab === "blog" && slug
      ? (posts.find((post) => post.slug === slug) ?? null)
      : null;

  return (
    <AdminDashboard
      activeTab={activeTab}
      posts={posts}
      projects={projects ?? []}
      selectedPost={selectedPost}
      selectedProjectSlug={activeTab === "projects" ? slug : undefined}
      settings={settings}
    />
  );
}
