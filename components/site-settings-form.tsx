"use client";

import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

interface SiteSettingsFormProps {
  initialSettings: SiteSettings;
  className?: string;
}

type EditableSettings = Omit<SiteSettings, "id">;

const toLines = (value: string[]) => value.join("\n");

const fromLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function SiteSettingsForm({
  initialSettings,
  className,
}: SiteSettingsFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<EditableSettings>({
    aboutTitle: initialSettings.aboutTitle,
    aboutParagraphs: initialSettings.aboutParagraphs,
    aboutQuote: initialSettings.aboutQuote,
    aboutPrinciples: initialSettings.aboutPrinciples,
    aboutSubquote: initialSettings.aboutSubquote,
    aboutFootnote: initialSettings.aboutFootnote,
    skillsTitle: initialSettings.skillsTitle,
    competencies: initialSettings.competencies,
    tools: initialSettings.tools,
    faviconUrl: initialSettings.faviconUrl,
    metaTitle: initialSettings.metaTitle,
    metaDescription: initialSettings.metaDescription,
    metaKeywords: initialSettings.metaKeywords,
    authorName: initialSettings.authorName,
    siteUrl: initialSettings.siteUrl,
    ogTitle: initialSettings.ogTitle,
    ogDescription: initialSettings.ogDescription,
    ogImage: initialSettings.ogImage,
    twitterTitle: initialSettings.twitterTitle,
    twitterDescription: initialSettings.twitterDescription,
  });

  const updateField = (field: keyof EditableSettings, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateList = (field: keyof EditableSettings, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: fromLines(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await api.put("/settings", formData);
      toast.success("Site settings saved");
      router.refresh();
    } catch (error) {
      console.error("Failed to save site settings:", error);
      toast.error("Failed to save site settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("mx-auto max-w-5xl px-6 py-28", className)}
    >
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-blog-orange">Site Settings</h1>
        <p className="max-w-2xl text-sm text-blog-fg/70">
          Update homepage copy, skills, favicon, metadata, and social SEO
          without touching source code.
        </p>
      </div>

      <div className="grid gap-10">
        <Section title="About">
          <TextField
            label="Title"
            value={formData.aboutTitle}
            onChange={(value) => updateField("aboutTitle", value)}
          />
          <ListField
            label="Paragraphs"
            rows={6}
            value={formData.aboutParagraphs}
            onChange={(value) => updateList("aboutParagraphs", value)}
          />
          <TextField
            label="Quote"
            value={formData.aboutQuote}
            onChange={(value) => updateField("aboutQuote", value)}
          />
          <TextField
            label="Highlighted Principles"
            value={formData.aboutPrinciples}
            onChange={(value) => updateField("aboutPrinciples", value)}
          />
          <TextField
            label="Subquote"
            value={formData.aboutSubquote}
            onChange={(value) => updateField("aboutSubquote", value)}
          />
          <TextField
            label="Footnote"
            value={formData.aboutFootnote}
            onChange={(value) => updateField("aboutFootnote", value)}
          />
        </Section>

        <Section title="Skills & Tools">
          <TextField
            label="Title"
            value={formData.skillsTitle}
            onChange={(value) => updateField("skillsTitle", value)}
          />
          <ListField
            label="Competencies"
            value={formData.competencies}
            onChange={(value) => updateList("competencies", value)}
          />
          <ListField
            label="Tools"
            value={formData.tools}
            onChange={(value) => updateList("tools", value)}
          />
        </Section>

        <Section title="Favicon & SEO">
          <TextField
            label="Favicon URL"
            value={formData.faviconUrl}
            onChange={(value) => updateField("faviconUrl", value)}
          />
          <TextField
            label="Author Name"
            value={formData.authorName}
            onChange={(value) => updateField("authorName", value)}
          />
          <TextField
            label="Site URL"
            value={formData.siteUrl}
            onChange={(value) => updateField("siteUrl", value)}
          />
          <TextField
            label="Meta Title"
            value={formData.metaTitle}
            onChange={(value) => updateField("metaTitle", value)}
          />
          <LongTextField
            label="Meta Description"
            value={formData.metaDescription}
            onChange={(value) => updateField("metaDescription", value)}
          />
          <ListField
            label="Meta Keywords"
            rows={5}
            value={formData.metaKeywords}
            onChange={(value) => updateList("metaKeywords", value)}
          />
        </Section>

        <Section title="Social Preview">
          <TextField
            label="Open Graph Title"
            value={formData.ogTitle}
            onChange={(value) => updateField("ogTitle", value)}
          />
          <LongTextField
            label="Open Graph Description"
            value={formData.ogDescription}
            onChange={(value) => updateField("ogDescription", value)}
          />
          <TextField
            label="Open Graph Image"
            value={formData.ogImage}
            onChange={(value) => updateField("ogImage", value)}
          />
          <TextField
            label="Twitter Title"
            value={formData.twitterTitle}
            onChange={(value) => updateField("twitterTitle", value)}
          />
          <LongTextField
            label="Twitter Description"
            value={formData.twitterDescription}
            onChange={(value) => updateField("twitterDescription", value)}
          />
        </Section>
      </div>

      <div className="sticky bottom-6 mt-10 flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-blog-orange text-blog-bg hover:bg-blog-orange/90"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-blog-black pt-8">
      <h2 className="text-xl font-semibold text-blog-cyan">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-blog-fg">{label}</Label>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-blog-cyan/40 bg-blog-black text-blog-white placeholder:text-blog-fg/40 focus-visible:ring-blog-orange"
      />
    </div>
  );
}

function LongTextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 md:col-span-2">
      <Label className="text-blog-fg">{label}</Label>
      <Textarea
        rows={3}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-blog-cyan/40 bg-blog-black text-blog-white placeholder:text-blog-fg/40 focus-visible:ring-blog-orange"
      />
    </div>
  );
}

function ListField({
  label,
  value,
  rows = 4,
  onChange,
}: {
  label: string;
  value: string[];
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2 md:col-span-2">
      <Label className="text-blog-fg">{label}</Label>
      <Textarea
        rows={rows}
        value={toLines(value)}
        onChange={(event) => onChange(event.target.value)}
        className="border-blog-cyan/40 bg-blog-black text-blog-white placeholder:text-blog-fg/40 focus-visible:ring-blog-orange"
      />
    </div>
  );
}
