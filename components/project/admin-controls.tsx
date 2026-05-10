"use client";

import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteProject } from "@/lib/actions/projects";

interface ProjectAdminControlsProps {
  slug: string;
}

export function ProjectAdminControls({ slug }: ProjectAdminControlsProps) {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/projects/form?slug=${slug}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this project?")) {
      const result = await deleteProject(slug);
      if (result.success) {
        toast.success("Project deleted successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    }
  };

  return (
    <div
      className="flex items-center gap-2 ml-auto z-20 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEdit}
        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
