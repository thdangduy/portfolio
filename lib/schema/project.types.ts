import { z } from "zod";

export interface ProjectInterface {
	_id?: string
	title: string;
	excerpt: string;
	description: string;
	tags: string[];
	technologies: string[];
	thumbnail: string;
	slug: string;
	link: string | null
	created_at: Date | string
	updated_at: Date | string;
}

export const ProjectFormSchema = z.object({
	title: z.string(),
	excerpt: z.string(),
	description: z.string(),
	tags: z.array(z.string()),
	technologies: z.array(z.string()),
	thumbnail: z.string(),
	slug: z.string(),
	link: z.string().optional(),
})
