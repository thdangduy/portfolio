import { headers } from "next/headers";
import Link from "next/link";

import { Project } from "@/.generated/client";
import { ProjectAdminControls } from "@/components/project/admin-controls";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import ProjectSmallCard from "./project-small-card";
import { BlurFade } from "./ui/blur-fade";

const ProjectsIntro = async () => {
  let projects: Project[] = [];
  let session = null;

  try {
    const headersList = await headers();
    session = await auth.api.getSession({
      headers: headersList,
    });
    projects = await prisma.project.findMany();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  if (projects.length === 0) return "lol";

  return (
    <div id="projects" className="max-w-6xl mb-20 py-24  relative">
      <div className="absolute left-0 top-0 bottom-0 flex items-center">
        <div className="relative h-full w-px">
          <div className="absolute inset-0 w-px bg-linear-to-b from-transparent via-primary/60 to-transparent" />
          <div className="absolute inset-0 w-2 -translate-x-0.5 bg-linear-to-b from-transparent via-primary/20 to-transparent blur-sm" />
        </div>
      </div>

      <div className="w-full flex items-start justify-start mb-16 pl-8 relative">
        <div className="absolute left-0 top-3 md:top-5 -translate-x-1">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/30 animate-ping" />
        </div>
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-6xl font-bold flex items-start justify-start flex-wrap gap-3">
              <span className="text-primary">Selected</span>
              <span className="text-white">Works</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mt-2">
              A collection of projects I&apos;ve built and designed
            </p>
          </div>
        </BlurFade>
      </div>

      <div className="flex flex-col gap-20 pl-8">
        {projects?.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <Link
              href={`/project/${project.slug}`}
              key={index}
              className="block group relative"
            >
              <BlurFade delay={0.25 + index * 0.1} inView>
                <div className="relative">
                  <div className="absolute -left-8 top-8 -translate-x-2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 transition-transform duration-300 z-10" />
                    <div className="absolute w-6 h-6 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
                  </div>

                  <div
                    className={`
										grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 
										p-6 md:p-8 rounded-2xl 
										bg-linear-to-br from-muted/5 via-muted/10 to-transparent
										border border-white/5
										group-hover:border-primary/30 
										group-hover:shadow-2xl group-hover:shadow-primary/10
										transition-all duration-500
										backdrop-blur-sm
									`}
                  >
                    <div
                      className={`
											lg:col-span-3 
											${isEven ? "lg:order-1" : "lg:order-2"}
										`}
                    >
                      <ProjectSmallCard
                        img_url={project.thumbnail}
                        title={project.title}
                        excerpt={project.excerpt}
                      />
                    </div>

                    <div
                      className={`
											lg:col-span-2 
											flex flex-col justify-center gap-4
											${isEven ? "lg:order-2" : "lg:order-1"}
										`}
                    >
                      <div className="text-6xl font-bold text-primary/10 leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300 flex justify-between items-start">
                        <span>{project.title}</span>
                        {session && (
                          <ProjectAdminControls slug={project.slug} />
                        )}
                      </h3>

                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>

                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground px-3 py-1">
                              +{project.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-2 group-hover:gap-4 transition-all duration-300">
                        <span>View Project</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsIntro;
