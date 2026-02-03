import ProjectsIntro from "@/components/projects-intro";
export const revalidate = 600

export default async function ProjectsPage() {
	return (
		<div className="container mx-auto px-6 lg:px-20">
			<ProjectsIntro />
		</div>
	);
}