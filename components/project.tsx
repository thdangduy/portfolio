import { JetBrains_Light } from "@/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { WebDevProcess } from "@/components/dev-process";

interface ProjectStep {
  title: string;
  description: string;
}
interface ProjectProps {
  project: {
    name: string;
    header: string;
    src: string;
    quote: string;
    description: string;
    steps: ProjectStep[];
    btnDiv: JSX.Element;
  };
}

export const Project = ({ project }: ProjectProps) => {
  return (
    <div className="w-full pt-16">
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 px-5">
        <div className="flex flex-col gap-5 px-4">
          <h1 className="text-5xl font-semibold">{project.header}</h1>
          {project.btnDiv}
          <p
            className={cn(
              "text-muted-foreground font-medium leading-tight text-sm [word-spacing:-.2rem] ",
              JetBrains_Light.className
            )}
          >
            {project.quote}
          </p>
          <Link
            href={project.src}
            className="p-4 bg-red-700 w-fit px-10 rounded-md font-semibold text-xl"
          >
            View Live
          </Link>
        </div>
        <div>
          <iframe
            src="https://www.youtube.com/embed/tLcu_yDhP_E?si=ajWjmUpMztNkG5A6"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="shadow-[0_0_30px_1px_rgba(255,255,255,0.01)] w-full h-52 md:h-80"
          ></iframe>
        </div>
      </div>
      <div className="my-10 md:px-5 flex w-full items-center h-screen justify-center sticky top-0">
        <h1 className="md:text-9xl text-4xl [word-spacing:-.2rem] font-bold text-center">
          What is <span className="colorAnimation">{project.name}</span>?
        </h1>
      </div>
      <div className="bg-white sticky top-0 text-black w-screen items-center flex justify-center backdrop-blur-0 h-screen ">
        <p className="py-4 md:w-5/6 backdrop-blur-lg text-center px-3">
          {project.description}
        </p>
      </div>
      <div className="bg-black md:px-5 flex w-full items-center h-screen justify-center sticky top-0">
        <h1 className="md:text-9xl text-5xl [word-spacing:-.2rem] text-center font-bold">
          How I <span className="colorAnimation">Built</span> It?
        </h1>
      </div>
      <WebDevProcess steps={project.steps} />
    </div>
  );
};
