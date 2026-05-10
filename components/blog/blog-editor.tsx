"use client";

import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { markdown, markdownKeymap } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { BlogPost } from "@/.generated/client";
import { BlogPreview } from "@/components/blog/blog-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JetBrainsMono } from "@/fonts";
import { cn, slugify } from "@/lib/utils";

interface BlogEditorProps {
  initialPost?: BlogPost | null;
}

export default function BlogEditor({ initialPost }: BlogEditorProps) {
  const router = useRouter();
  const draftStorageKey = `blog-editor-draft:${initialPost?.slug ?? "new"}`;
  const [title, setTitle] = useState(initialPost?.title || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [authorName, setAuthorName] = useState(
    initialPost?.authorName || "Thái Duy",
  );
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [isSaving, setIsSaving] = useState(false);
  const hasLoadedDraft = useRef(false);
  const draftSaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleSave = async (publish: boolean) => {
    if (!title || !excerpt || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);

    try {
      const finalSlug = slug || slugify(title);
      const method = initialPost ? "PUT" : "POST";

      const response = await fetch("/api/blog", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          slug: finalSlug,
          author: { name: authorName },
          coverImage: coverImage || undefined,
          published: publish,
          originalSlug: initialPost?.slug,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save blog post");
      }

      toast.success(publish ? "Blog post published!" : "Draft saved!");
      localStorage.removeItem(draftStorageKey);

      router.push("/blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save blog post",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Custom markdown completions
  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setCoverImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const markdownCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/^\w*/); // Simple match, can be improved
    if (!context.explicit && (!word || word.from === word.to)) return null;

    return {
      from: context.pos,
      options: [
        { label: "# ", type: "keyword", info: "Heading 1", detail: "H1" },
        { label: "## ", type: "keyword", info: "Heading 2", detail: "H2" },
        { label: "### ", type: "keyword", info: "Heading 3", detail: "H3" },
        {
          label: "**bold**",
          type: "keyword",
          info: "Bold Text",
          detail: "Bold",
        },
        {
          label: "*italic*",
          type: "keyword",
          info: "Italic Text",
          detail: "Italic",
        },
        { label: "[link](url)", type: "keyword", info: "Link", detail: "Link" },
        {
          label: "![alt](url)",
          type: "keyword",
          info: "Image",
          detail: "Image",
        },
        { label: "> ", type: "keyword", info: "Blockquote", detail: "Quote" },
        {
          label: "```\ncode\n```",
          type: "keyword",
          info: "Code Block",
          detail: "Code",
        },
        { label: "- ", type: "keyword", info: "Bullet List", detail: "List" },
        { label: "1. ", type: "keyword", info: "Ordered List", detail: "List" },
        {
          label: "---",
          type: "keyword",
          info: "Horizontal Rule",
          detail: "HR",
        },
        {
          label: "| Col | Col |\n| --- | --- |\n| Val | Val |",
          type: "keyword",
          info: "Table",
          detail: "Table",
        },
      ],
    };
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftStorageKey);
    hasLoadedDraft.current = true;

    if (!savedDraft) return;

    try {
      const draft = JSON.parse(savedDraft) as {
        title?: string;
        excerpt?: string;
        content?: string;
        authorName?: string;
        coverImage?: string;
        slug?: string;
      };

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(draft.title ?? initialPost?.title ?? "");
      setExcerpt(draft.excerpt ?? initialPost?.excerpt ?? "");
      setContent(draft.content ?? initialPost?.content ?? "");
      setAuthorName(draft.authorName ?? initialPost?.authorName ?? "Thái Duy");
      setCoverImage(draft.coverImage ?? initialPost?.coverImage ?? "");
      setSlug(draft.slug ?? initialPost?.slug ?? "");
    } catch (error) {
      console.error("Failed to restore blog draft:", error);
      localStorage.removeItem(draftStorageKey);
    }
  }, [draftStorageKey, initialPost]);

  useEffect(() => {
    if (!hasLoadedDraft.current) return;

    if (draftSaveTimeout.current) {
      clearTimeout(draftSaveTimeout.current);
    }

    draftSaveTimeout.current = setTimeout(() => {
      localStorage.setItem(
        draftStorageKey,
        JSON.stringify({
          title,
          excerpt,
          content,
          authorName,
          coverImage,
          slug,
        }),
      );
    }, 500);

    return () => {
      if (draftSaveTimeout.current) {
        clearTimeout(draftSaveTimeout.current);
      }
    };
  }, [authorName, content, coverImage, draftStorageKey, excerpt, title, slug]);

  useEffect(() => {
    if (previewContainerRef.current) {
      const container = previewContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        150;

      if (isNearBottom) {
        const timeoutId = setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 10);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [content]);

  return (
    <div
      className={cn("min-h-screen p-8 text-blog-fg", JetBrainsMono.className)}
    >
      <div className="max-w-450 mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blog-orange mb-2">
            Blog Editor
          </h1>
          <p className="text-blog-fg opacity-80">
            Write your blog post with live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-blog-bg border border-blog-inactive-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blog-orange mb-6">
                Post Details
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-blog-fg">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="mt-2 bg-blog-black border-blog-cyan text-blog-fg"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-blog-fg">
                    Excerpt *
                  </Label>
                  <Input
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short description of the post"
                    className="mt-2 bg-blog-black border-blog-cyan text-blog-fg"
                  />
                </div>

                <div>
                  <Label htmlFor="author" className="text-blog-fg">
                    Author Name
                  </Label>
                  <Input
                    id="author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author name"
                    className="mt-2 bg-blog-black border-blog-cyan text-blog-fg"
                  />
                </div>

                <div>
                  <Label htmlFor="coverImage" className="text-blog-fg">
                    Cover Image URL (optional)
                  </Label>
                  <Input
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="mt-2 bg-blog-black border-blog-cyan text-blog-fg"
                  />
                </div>

                <div>
                  <Label htmlFor="coverImageFile" className="text-blog-fg">
                    Upload Cover Image (optional)
                  </Label>
                  <input
                    id="coverImageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="mt-2 w-full text-sm text-blog-fg file:mr-4 file:rounded-full file:border-0 file:bg-blog-orange file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blog-black"
                  />
                </div>

                {coverImage ? (
                  <div className="mt-3">
                    <p className="text-sm text-blog-fg opacity-80 mb-2">
                      Cover image preview:
                    </p>
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full rounded-md border border-blog-inactive-border"
                    />
                  </div>
                ) : null}

                <div>
                  <Label htmlFor="slug" className="text-blog-fg">
                    Slug (optional)
                  </Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="custom-slug"
                    className="mt-2 bg-blog-black border-blog-cyan text-blog-fg"
                  />
                  {!slug && title && (
                    <p className="text-blog-fg opacity-50 text-xs mt-1">
                      Generated:{" "}
                      <span className="font-mono">{slugify(title)}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blog-bg border border-blog-inactive-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blog-orange mb-4">
                Content *
              </h2>
              <p className="text-sm text-blog-fg opacity-70 mb-4">
                Write your content in Markdown format (Ctrl+Space for
                suggestions)
              </p>
              <div className="h-150 overflow-hidden rounded-md border border-blog-cyan bg-blog-black">
                <CodeMirror
                  value={content}
                  height="600px"
                  theme={oneDark}
                  extensions={[
                    markdown(),
                    keymap.of(markdownKeymap),
                    autocompletion({ override: [markdownCompletions] }),
                    EditorView.lineWrapping,
                  ]}
                  onChange={(value) => setContent(value)}
                  className="text-base"
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightSpecialChars: true,
                    history: true,
                    foldGutter: true,
                    drawSelection: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    syntaxHighlighting: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    rectangularSelection: true,
                    crosshairCursor: true,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                    closeBracketsKeymap: true,
                    defaultKeymap: true,
                    searchKeymap: true,
                    historyKeymap: true,
                    foldKeymap: true,
                    completionKeymap: true,
                    lintKeymap: true,
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                variant="outline"
                className="flex-1 border-blog-cyan text-blog-fg hover:bg-blog-cyan hover:text-blog-bg"
              >
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="flex-1 bg-blog-orange text-blog-bg hover:bg-blog-orange/90"
              >
                {isSaving ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <div
              ref={previewContainerRef}
              className="bg-blog-bg border border-blog-inactive-border rounded-lg p-6 h-full overflow-y-auto scroll-smooth"
            >
              <h2 className="text-2xl font-bold text-blog-orange mb-6">
                Live Preview
              </h2>

              {title && (
                <>
                  <h1 className="text-blog-white text-4xl font-bold mb-4">
                    {title}
                  </h1>
                  <div className="text-blog-black mb-8 font-mono">
                    {new Date().toLocaleDateString()}
                  </div>
                </>
              )}

              {content ? (
                <>
                  <BlogPreview content={content} />
                  <div className="h-32" />
                </>
              ) : (
                <p className="text-blog-fg opacity-50 italic">
                  Start writing to see the preview...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
