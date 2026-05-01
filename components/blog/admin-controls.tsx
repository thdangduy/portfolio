"use client";

import { deleteBlogPost } from "@/lib/actions/blogs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";

interface AdminControlsProps {
  slug: string;
}

export function AdminControls({ slug }: AdminControlsProps) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if inside a Link
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this post?")) {
      const result = await deleteBlogPost(slug);
      if (result.success) {
        toast.success("Post deleted successfully");
        // If on the list page, router.refresh might be needed, or let revalidatePath handle it.
        // If on the detail page, maybe redirect?
        // The current component is used on the list page mostly.
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete post");
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
        asChild
        className="h-8 w-8 text-blog-cyan hover:text-blog-cyan hover:bg-blog-cyan/10"
      >
        <Link href={`/blog/editor?slug=${slug}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 text-blog-red hover:text-blog-red hover:bg-blog-red/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
