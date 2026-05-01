"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { AlbertSans } from "@/fonts";
import { cn } from "@/lib/utils";

interface Language {
  name: string;
  percent: number;
}

interface SkillsProps {
  languages: Language[];
}

const Skills = ({ languages }: SkillsProps) => {
  const competencies = [
    "Backend Development",
    "Frontend Development",
    "Database Architecture",
    "API Design",
    "System Optimization",
    "Cloud Infrastructure",
  ];

  const toolsGrid = [
    { name: "Python", icon: "/icons/Python-Dark.svg" },
    { name: "TypeScript", icon: "/icons/TypeScript.svg" },
    { name: "Go", icon: "/icons/Go.svg" },

    { name: "Next.js", icon: "/icons/NextJS-Dark.svg" },
    { name: "React", icon: "/icons/React-Dark.svg" },
    { name: "FastAPI", icon: "/icons/FastAPI.svg" },

    { name: "PostgreSQL", icon: "/icons/PostgreSQL-Dark.svg" },
    { name: "MongoDB", icon: "/icons/MongoDB.svg" },
    { name: "Redis", icon: "/icons/Redis-Dark.svg" },

    { name: "Docker", icon: "/icons/Docker.svg" },
    { name: "Git", icon: "/icons/Git.svg" },
    { name: "Linux", icon: "/icons/Linux-Dark.svg" },
    { name: "AWS", icon: "/icons/AWS-Dark.svg" },
    { name: "Nginx", icon: "/icons/Nginx.svg" },
  ];

  const displayLanguages = languages ? languages.slice(0, 5) : [];

  return (
    <section
      id="skills"
      className={cn(
        "relative min-h-screen w-full overflow-hidden text-white flex items-center",
        AlbertSans.className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-24">
          <BlurFade delay={0.25} inView>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold  mb-6">
                Skills & Tools
              </h2>

              <ul className="grid grid-cols-1 w-fit  sm:grid-cols-2 gap-x-24 gap-y-3 text-sm md:text-base text-gray-300">
                {competencies.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex text-sm font-bold items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <div className="flex flex-wrap gap-8 items-center justify-start">
              {toolsGrid.map((tool, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="relative w-8 h-8 md:w-12 md:h-12 transition-transform">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs text-white/80 font-medium group-hover:text-white transition-colors">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.45} inView>
            <div className="w-full max-w-md mt-4">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-bold text-primary uppercase tracking-wider">
                  Languages
                </h3>
                <span className="text-xs text-gray-500">(Last 7 Days)</span>
              </div>
              <div className="flex flex-col gap-6">
                {displayLanguages.map((lang, idx) => (
                  <div key={idx} className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">
                        {lang.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {lang.percent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2 + idx * 0.1,
                        }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Skills;
