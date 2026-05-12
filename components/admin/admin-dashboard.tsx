"use client";

import {
  Edit,
  FileText,
  FolderKanban,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ElementType } from "react";
import { useTransition } from "react";
import { toast } from "sonner";

import type { BlogPost, Project } from "@/.generated/client";
import BlogEditor from "@/components/blog/blog-editor";
import ProjectForm from "@/components/project/form";
import SiteSettingsForm from "@/components/site-settings-form";
import { Button } from "@/components/ui/button";
import { JetBrainsMono } from "@/fonts";
import { deleteBlogPost } from "@/lib/actions/blogs";
import { deleteProject } from "@/lib/actions/projects";
import type { SiteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

type AdminTab = "blog" | "projects" | "settings";

interface AdminDashboardProps {
  activeTab: AdminTab;
  posts: BlogPost[];
  projects: Project[];
  selectedPost?: BlogPost | null;
  selectedProjectSlug?: string;
  settings: SiteSettings;
}

const tabs: { id: AdminTab; label: string; icon: ElementType }[] = [
  { id: "blog", label: "Blog", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard({
  activeTab,
  posts,
  projects,
  selectedPost,
  selectedProjectSlug,
  settings,
}: AdminDashboardProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-blog-bg text-blog-fg",
        JetBrainsMono.className,
      )}
    >
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-blog-black bg-blog-bg px-4 py-5 lg:border-b-0 lg:border-r lg:border-blog-black lg:px-5">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Link href="/admin?tab=blog" className="block">
              <p className="text-xs uppercase tracking-[0.25em] text-blog-orange">
                Mini CMS
              </p>
              <h1 className="mt-2 text-2xl font-bold text-blog-white">Admin</h1>
            </Link>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-blog-cyan/40 bg-blog-black text-blog-cyan hover:bg-blog-selection-bg hover:text-blog-white lg:hidden"
            >
              <Link href="/">View Site</Link>
            </Button>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.id}
                  href={`/admin?tab=${tab.id}`}
                  className={cn(
                    "inline-flex h-10 items-center gap-3 rounded-md border px-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-blog-orange bg-blog-selection-bg text-blog-white"
                      : "border-transparent text-blog-fg hover:border-blog-cyan/40 hover:bg-blog-black hover:text-blog-cyan",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 hidden lg:block">
            <Button
              asChild
              variant="outline"
              className="w-full border-blog-cyan/40 bg-blog-black text-blog-cyan hover:bg-blog-selection-bg hover:text-blog-white"
            >
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 md:px-8">
          <header className="mb-8 border-b border-blog-black pb-5">
            <h2 className="text-3xl font-bold text-blog-orange">
              {activeTab === "blog"
                ? "Blog"
                : activeTab === "projects"
                  ? "Projects"
                  : "Settings"}
            </h2>
            <p className="mt-2 text-sm text-blog-fg/70">
              You can edit blog posts, projects, and portfolio settings here.
            </p>
          </header>

          {activeTab === "blog" ? (
            <BlogAdminPanel posts={posts} selectedPost={selectedPost} />
          ) : null}

          {activeTab === "projects" ? (
            <ProjectAdminPanel
              projects={projects}
              selectedProjectSlug={selectedProjectSlug}
            />
          ) : null}

          {activeTab === "settings" ? (
            <SiteSettingsForm
              initialSettings={settings}
              className="max-w-none px-0 py-0"
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}

function BlogAdminPanel({
  posts,
  selectedPost,
}: {
  posts: BlogPost[];
  selectedPost?: BlogPost | null;
}) {
  const isEditing = Boolean(selectedPost);

  return (
    <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blog-white">Blog Posts</h2>
          <Button
            asChild
            size="sm"
            className="bg-blog-orange text-blog-bg hover:bg-blog-orange/90"
          >
            <Link href="/admin?tab=blog&mode=new">
              <Plus className="h-4 w-4" />
              New
            </Link>
          </Button>
        </div>

        <div className="grid gap-3">
          {posts.length ? (
            posts.map((post) => <BlogRow key={post.id} post={post} />)
          ) : (
            <EmptyState text="No blog posts yet." />
          )}
        </div>
      </div>

      <div className="min-w-0 border-t border-blog-black pt-6 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
        <BlogEditor
          key={selectedPost?.slug ?? "new-blog-post"}
          initialPost={selectedPost ?? null}
          embedded
          redirectPath="/admin?tab=blog"
          title={isEditing ? "Edit Blog Post" : "Create Blog Post"}
        />
      </div>
    </section>
  );
}

function BlogRow({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this blog post?")) return;

    startTransition(async () => {
      const result = await deleteBlogPost(post.slug);
      if (result.success) {
        toast.success("Blog post deleted");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete blog post");
      }
    });
  };

  return (
    <article className="rounded-md border border-blog-black bg-blog-black/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-blog-white">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-blog-fg/70">
            {post.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-blog-cyan/80">
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            <span>{post.published ? "Published" : "Draft"}</span>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-blog-cyan hover:bg-blog-selection-bg hover:text-blog-white"
          >
            <Link href={`/admin?tab=blog&slug=${post.slug}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={isPending}
            onClick={handleDelete}
            className="h-8 w-8 text-blog-red hover:bg-blog-red/10 hover:text-blog-red"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProjectAdminPanel({
  projects,
  selectedProjectSlug,
}: {
  projects: Project[];
  selectedProjectSlug?: string;
}) {
  const isEditing = Boolean(selectedProjectSlug);

  return (
    <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blog-white">Projects</h2>
          <Button
            asChild
            size="sm"
            className="bg-blog-orange text-blog-bg hover:bg-blog-orange/90"
          >
            <Link href="/admin?tab=projects&mode=new">
              <Plus className="h-4 w-4" />
              New
            </Link>
          </Button>
        </div>

        <div className="grid gap-3">
          {projects.length ? (
            projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))
          ) : (
            <EmptyState text="No projects yet." />
          )}
        </div>
      </div>

      <div className="min-w-0 border-t border-blog-black pt-6 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
        <ProjectForm
          key={selectedProjectSlug ?? "new-project"}
          projectSlug={selectedProjectSlug}
          embedded
          redirectPath="/admin?tab=projects"
          title={isEditing ? "Edit Project" : "Create Project"}
        />
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Delete this project?")) return;

    startTransition(async () => {
      const result = await deleteProject(project.slug);
      if (result.success) {
        toast.success("Project deleted");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    });
  };

  return (
    <article className="rounded-md border border-blog-black bg-blog-black/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-blog-white">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-blog-fg/70">
            {project.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-blog-cyan/80">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-blog-cyan hover:bg-blog-selection-bg hover:text-blog-white"
          >
            <Link href={`/admin?tab=projects&slug=${project.slug}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={isPending}
            onClick={handleDelete}
            className="h-8 w-8 text-blog-red hover:bg-blog-red/10 hover:text-blog-red"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-blog-cyan/30 p-6 text-sm text-blog-fg/60">
      {text}
    </div>
  );
}
