"use client";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { default as NextImage } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ZodIssue } from "zod";

import api from "@/api";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/actions/projects";
import { ProjectFormSchema } from "@/lib/schema/project.types";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
  projectSlug?: string;
  embedded?: boolean;
  redirectPath?: string;
  title?: string;
}

const ProjectForm = ({
  projectSlug,
  embedded = false,
  redirectPath = "/projects",
  title,
}: ProjectFormProps) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    tags: [] as string[],
    technologies: [] as string[],
    thumbnail: "",
    slug: "",
    link: "",
    created_at: "",
    updated_at: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewHTML, setPreviewHTML] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputClass =
    "w-full rounded-md border border-blog-cyan/40 bg-blog-black px-3 py-2 text-blog-white placeholder:text-blog-fg/40 focus:outline-none focus:ring-1 focus:ring-blog-orange";
  const labelClass = "block text-sm font-medium mb-1 text-blog-fg";
  const errorClass = "text-blog-red text-sm mt-1";

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "w-full",
          height: "auto",
        },
      }),
    ],
    content: "<p></p>",
    onUpdate: ({ editor }) => {
      setPreviewHTML(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const updatePreview = () => setPreviewHTML(editor.getHTML());

    editor.on("update", updatePreview);
    return () => {
      editor.off("update", updatePreview);
    };
  }, [editor]);

  // Load existing project if editing
  useEffect(() => {
    if (!projectSlug) return;

    const loadProject = async () => {
      setIsLoading(true);
      try {
        const project = await getProjectBySlug(projectSlug);
        if (project) {
          setFormData({
            title: project.title || "",
            excerpt: project.excerpt || "",
            tags: project.tags || [],
            technologies: project.technologies || [],
            thumbnail: project.thumbnail || "",
            slug: project.slug || "",
            link: project.link || "",
            created_at: project.created_at?.toString() || "",
            updated_at: project.updated_at?.toString() || "",
            description: project.description || "",
          });
          setSelectedImage(project.thumbnail || null);
          if (editor) {
            editor.commands.setContent(project.description || "<p></p>");
            setPreviewHTML(project.description || "");
          }
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectSlug, editor]);

  const insertImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (typeof base64 === "string") {
        editor?.chain().focus().setImage({ src: base64 }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const description = editor?.getHTML() || "";
    const dataToValidate = {
      ...formData,
      description,
      thumbnail: selectedImage || "",
    };

    const result = ProjectFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue: ZodIssue) => {
        if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const payload = isEditing
        ? { ...result.data, originalSlug: projectSlug }
        : result.data;

      const res = await api[method.toLowerCase() as "post" | "put"](
        "/projects",
        payload,
      );

      if (res.status === 201 || res.status === 200) {
        toast.success(
          isEditing
            ? "Project updated successfully!"
            : "Project created successfully!",
        );
        router.push(redirectPath);
        router.refresh();
      } else {
        toast.error("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("mx-auto max-w-7xl", embedded ? "p-0" : "p-4")}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-blog-cyan">
            {title ?? (isEditing ? "Edit Project" : "Create New Project")}
          </h2>

          <ImageUpload
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <div className="space-y-4 mt-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>

            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea
                name="excerpt"
                placeholder="Brief description"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className={inputClass}
              />
              {errors.excerpt && <p className={errorClass}>{errors.excerpt}</p>}
            </div>

            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                name="slug"
                placeholder="project-slug"
                value={formData.slug}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.slug && <p className={errorClass}>{errors.slug}</p>}
            </div>

            <div>
              <label className={labelClass}>Project Link (Optional)</label>
              <input
                type="text"
                name="link"
                placeholder="https://example.com"
                value={formData.link || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <input
                type="text"
                placeholder="web, frontend, react (comma separated)"
                defaultValue={formData.tags.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
                className={inputClass}
              />
              {errors.tags && <p className={errorClass}>{errors.tags}</p>}
            </div>

            <div>
              <label className={labelClass}>Technologies</label>
              <input
                type="text"
                placeholder="React, TypeScript, Node.js (comma separated)"
                defaultValue={formData.technologies.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
                className={inputClass}
              />
              {errors.technologies && (
                <p className={errorClass}>{errors.technologies}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Description</label>
              {editor && (
                <EditorContent
                  editor={editor}
                  className="min-h-37.5 rounded-md border border-blog-cyan/40 bg-blog-black px-3 py-2 text-blog-white focus-within:ring-1 focus-within:ring-blog-orange"
                />
              )}
              {errors.description && (
                <p className={errorClass}>{errors.description}</p>
              )}
            </div>

            <div>
              <label htmlFor="image-upload" className={labelClass}>
                Insert Image into Description
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) insertImage(file);
                }}
                className={inputClass}
              />
            </div>

            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blog-orange text-blog-bg hover:bg-blog-orange/90"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Create Project"}
            </Button>
          </div>
        </div>
        <div className="order-2 md:order-1">
          <div className="sticky top-4">
            <h2 className="text-lg font-semibold mb-3 text-blog-cyan">
              Live Preview
            </h2>
            <div className="min-h-100 rounded-md border border-blog-black bg-blog-black/60 p-4">
              {selectedImage && (
                <NextImage
                  src={selectedImage}
                  alt="Project thumbnail"
                  width={500}
                  height={300}
                  unoptimized
                  className="w-full h-auto object-cover rounded-lg mb-4"
                />
              )}
              {formData.title && (
                <h3 className="text-xl font-bold mb-2 text-blog-white">
                  {formData.title}
                </h3>
              )}
              {formData.excerpt && (
                <p className="mb-3 text-blog-fg/70 italic">
                  {formData.excerpt}
                </p>
              )}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded bg-blog-selection-bg px-2 py-1 text-xs text-blog-cyan"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded bg-blog-selection-bg px-2 py-1 text-xs text-blog-green"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div
                className="prose prose-invert prose-sm max-w-none text-blog-fg"
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              />
              {formData.link && (
                <div className="mt-4 border-t border-blog-black pt-3">
                  <a
                    href={formData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blog-cyan hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageUpload = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-blog-fg">
        Project Thumbnail
      </label>
      <div
        className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-blog-cyan/40 bg-blog-black transition-colors hover:border-blog-orange"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpdate}
          hidden
        />
        {selectedImage ? (
          <NextImage
            src={selectedImage}
            alt="Thumbnail preview"
            width={128}
            height={128}
            unoptimized
            className="h-full w-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center text-blog-fg/60">
            <div className="text-2xl mb-1">+</div>
            <div className="text-xs">Add Image</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
