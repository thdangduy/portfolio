import mongoose from "mongoose";

import { ProjectInterface } from "./project.types";

export * from "./project.types";

const ProjectSchema = new mongoose.Schema<ProjectInterface>({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  technologies: { type: [String], required: true },
  thumbnail: { type: String, required: true },
  slug: { type: String, required: true },
  link: { type: String, required: false },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export const Project =
  mongoose.models.Project ||
  mongoose.model<ProjectInterface>("Project", ProjectSchema);
