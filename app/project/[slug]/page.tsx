import NotFound from '@/components/not-found';
import ProjectShow from '@/components/project-show';
import { TextLoader } from '@/components/text-loader';
import { ProjectInterface } from '@/lib/schema/project.schema';
import { cache, Suspense } from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export const revalidate = 600;

const getProject = cache(
	async (slug: string): Promise<ProjectInterface | null> => {
		try {
			return prisma.project.findFirst({ where: { slug } })
		} catch (err) {
			console.log('Error fetching project:', err);
			return null;
		}
	},
);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project)
		return {
			title: 'Project Not Found | Avisek Ray (biisal)',
			description: 'The project you are looking for was not found.',
		};
	return {
		title: project.title,
		description: project.excerpt,
	};
}

export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = await getProject(slug);
	if (!project || !project.title) return <NotFound text="Project Not Found" />;
	return (
		<Suspense fallback={<TextLoader />}>
			{' '}
			<ProjectShow project={project} />{' '}
		</Suspense>
	);
}
