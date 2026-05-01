import mongoose from "mongoose";

export interface BlogPostInterface {
  title: string;
  excerpt: string;
  content: string; // Markdown content
  slug: string;
  author: {
    name: string;
  };
  coverImage?: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

const blogPostchema = new mongoose.Schema<BlogPostInterface>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: {
    name: { type: String, required: true },
  },
  coverImage: { type: String, required: false },
  published: { type: Boolean, required: true, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

// Add index for faster queries
blogPostchema.index({ slug: 1 });
blogPostchema.index({ published: 1, created_at: -1 });

export const BlogPost =
  mongoose.models.BlogPost ||
  mongoose.model<BlogPostInterface>("BlogPost", blogPostchema);
