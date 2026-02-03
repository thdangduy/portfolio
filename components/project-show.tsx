'use client';
import { Button } from '@/components/ui/button';
import { ProjectInterface } from '@/lib/schema/project.schema';
import Link from 'next/link';
import {
	ArrowLeft,
	ExternalLink,
	Globe,
	ArrowRight,
	Calendar,
} from 'lucide-react';
import { useEffect } from 'react';
import { BlurFade } from './ui/blur-fade';
import ProjectSmallCard from './project-small-card';

const ProjectShow = ({ project }: { project: ProjectInterface }) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	const formattedDate = project.created_at
		? new Date(project.created_at).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})
		: '';

	return (
		<div className="min-h-screen px-4 container mx-auto relative">
			<div className="absolute left-4 top-0 bottom-0 flex items-center">
				<div className="relative h-full w-px">
					<div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
					<div className="absolute inset-0 w-2 -translate-x-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-sm" />
				</div>
			</div>

			<div className="max-w-6xl py-24 pl-8">
				<div className="w-full flex flex-col items-start justify-start mb-12 relative">
					<div className="absolute left-0 top-4 -translate-x-[2.27rem]">
						<div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
						<div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/30 animate-ping" />
					</div>
					<BlurFade delay={0.1} inView>
						<h2 className="text-3xl md:text-4xl  lg:text-5xl font-bold text-white">
							{project.title}
						</h2>
					</BlurFade>

					<div className="flex flex-col gap-4 mb-8">
						{formattedDate && (
							<div className="inline-flex items-center mt-4 gap-2 text-sm text-muted-foreground/80 font-medium">
								<Calendar className="w-4 h-4" />
								{formattedDate}
							</div>
						)}

						<p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
							{project.excerpt}
						</p>
					</div>

					<div className="flex flex-col gap-4 ">
						<div className="flex flex-wrap items-center gap-4 mt-2">
							{project.tags && project.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, tagIndex) => (
										<span
											key={tagIndex}
											className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium"
										>
											{tag}
										</span>
									))}
								</div>
							)}

							{project.link && (
								<Button
									size="lg"
									className="px-6 py-6 text-base font-semibold bg-primary hover:bg-primary/90 text-black rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
									asChild
								>
									<Link
										href={project.link}
										target="_blank"
										className="flex items-center gap-2"
									>
										<Globe className="w-5 h-5" />
										View Live
										<ArrowRight className="w-4 h-4 -rotate-45" />
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-20">
					<div className="block group relative">
						<BlurFade delay={0.25} inView>
							<div className="relative">
								<div className="absolute -left-8 top-2 -translate-x-2 flex items-center justify-center">
									<div className="w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />
									<div className="absolute w-6 h-6 rounded-full bg-primary/20" />
								</div>


								<div
									className="
									p-4 md:p-6 rounded-2xl 
									bg-gradient-to-br from-muted/5 via-muted/10 to-transparent
									border border-white/5
									hover:border-primary/30 
									hover:shadow-2xl hover:shadow-primary/10
									transition-all duration-500
									backdrop-blur-sm
								"
								>
									<ProjectSmallCard
										img_url={project.thumbnail}
										title={project.title}
										excerpt={project.excerpt}
									/>
								</div>
							</div>
						</BlurFade>
					</div>

					{project.technologies && project.technologies.length > 0 && (
						<div className="relative">
							<div className="absolute -left-8 top-2 -translate-x-2 flex items-center justify-center">
								<div className="w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />
								<div className="absolute w-6 h-6 rounded-full bg-primary/20" />
							</div>

							<BlurFade delay={0.4} inView>
								<div
									className="
									p-6 md:p-8 rounded-2xl 
									bg-gradient-to-br from-muted/5 via-muted/10 to-transparent
									border border-white/5
									backdrop-blur-sm
								"
								>
									<h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
										Tech Stack
									</h2>

									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
										{project.technologies.map((tech, index) => (
											<div
												key={index}
												className="text-sm bg-secondary/30 hover:bg-secondary/50 text-secondary-foreground border border-white/5 rounded-xl px-4 py-3 font-medium text-center transition-all duration-300 hover:scale-105 hover:border-primary/20"
											>
												{tech}
											</div>
										))}
									</div>
								</div>
							</BlurFade>
						</div>
					)}

					{project.description && (
						<div className="relative">
							<div className="absolute -left-8 top-2 -translate-x-2 flex items-center justify-center">
								<div className="w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />
								<div className="absolute w-6 h-6 rounded-full bg-primary/20" />
							</div>

							<BlurFade delay={0.5} inView>
								<div
									className="
									 md:px-8 rounded-2xl 
									backdrop-blur-sm
								"
								>
									<h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
										Project Overview
									</h2>

									<div
										className="prose prose-lg prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:text-white prose-a:text-primary prose-a:underline prose-a:decoration-primary/30 hover:prose-a:decoration-primary prose-strong:text-white prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-4xl"
										dangerouslySetInnerHTML={{ __html: project.description }}
									/>
								</div>
							</BlurFade>
						</div>
					)}

					<BlurFade delay={0.6} inView>
						<div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
						<div className="relative pt-12">
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
								<Link
									href="/projects"
									className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
								>
									<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
									Back to all projects
								</Link>

								{project.link && (
									<Button
										size="lg"
										variant="outline"
										className="border-primary/30 hover:bg-primary/10 hover:border-primary text-primary rounded-full"
										asChild
									>
										<Link
											href={project.link}
											target="_blank"
											className="flex items-center gap-2"
										>
											<ExternalLink className="w-4 h-4" />
											Visit Website
										</Link>
									</Button>
								)}
							</div>
						</div>
					</BlurFade>
				</div>
			</div>
		</div>
	);
};

export default ProjectShow;
