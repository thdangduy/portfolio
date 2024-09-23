"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard } from "./project-card";

const projects = [
  {
    src: "/project-planner-ai.jpg",
    label: "Project Planner AI",
    description: `After learning a new tech stack, I often find myself searching for project ideas to practice with. That's when I thought, why not create an AI that generates project ideas for me? And that's how **Project Planner AI** came to life!

Built with Next.js, Tailwind CSS, MongoDB, and Next Auth, this tool is designed to suggest project ideas tailored to the user's interests and skill level. It uses AI to craft personalized projects, so you can spend more time building and less time searching for what to build. Simple, intuitive, and creative—Project Planner AI helps bring your next coding challenge to life!`,
  },
  {
    src: "/dtimes.jpg",
    label: "DTimes.",
    description: `Dtimes is a news website I created using Django and PostgreSQL. It features a modern, clean design powered by Tailwind CSS, allowing users to browse news easily. The site lets you search for news by categories and provides a seamless experience with a relational database that connects news articles to their authors. Simple, efficient, and packed with useful features, Dtimes offers an organized and user-friendly way to stay updated with the latest news.`,
  },
];

export const Projects = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={targetRef} className="text-3xl h-[300vh] w-screen relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-start">
        <motion.div
          className="flex w-[200vw]"
          style={{ x, height: "-webkit-fill-available" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
