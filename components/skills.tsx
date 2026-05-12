"use client";
import {
  SiDocker,
  SiErpnext,
  SiFrappe,
  SiGit,
  SiMongodb,
  SiN8n,
  SiProxmox,
  SiPython,
  SiUbuntu,
  SiWireguard,
} from "@icons-pack/react-simple-icons";
import { IconType } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";

import { BlurFade } from "@/components/ui/blur-fade";
import { GoogleSans } from "@/fonts";
import type { SiteSettings } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  icon: string | IconType;
  color?: string;
}

interface Language {
  name: string;
  percent: number;
}

interface SkillsProps {
  languages: Language[];
  settings: SiteSettings;
}

const toolIcons: Record<string, Tool> = {
  docker: { name: "Docker", icon: SiDocker, color: "#2496ED" },
  erpnext: { name: "ERPNext", icon: SiErpnext, color: "#0089FF" },
  frappe: { name: "Frappe", icon: SiFrappe, color: "#0089FF" },
  git: { name: "Git", icon: SiGit, color: "#F05032" },
  mongodb: { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  n8n: { name: "n8n", icon: SiN8n, color: "#EA4B71" },
  proxmox: { name: "Proxmox", icon: SiProxmox, color: "#E57000" },
  python: { name: "Python", icon: SiPython, color: "#3776AB" },
  ubuntu: { name: "Ubuntu", icon: SiUbuntu, color: "#E95420" },
  wireguard: { name: "Wireguard", icon: SiWireguard, color: "#88171A" },
};

const getTool = (name: string): Tool => {
  const key = name.toLowerCase().replace(/\s+/g, "");
  return toolIcons[key] ?? { name, icon: name.slice(0, 2).toUpperCase() };
};

const renderToolIcon = (tool: Tool) => {
  if (typeof tool.icon === "string") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold text-primary">
        {tool.icon}
      </div>
    );
  }

  return <tool.icon className="w-full h-full" color={tool.color} />;
};

const Skills = ({ languages, settings }: SkillsProps) => {
  const toolsGrid = settings.tools.map(getTool);
  const midpoint = Math.ceil(toolsGrid.length / 2);
  const row1 = toolsGrid.slice(0, midpoint);
  const row2 = toolsGrid.slice(midpoint);

  const displayLanguages = languages ? languages.slice(0, 5) : [];

  return (
    <section
      id="skills"
      className={cn(
        "relative min-h-screen w-full overflow-hidden text-white flex items-center",
        GoogleSans.variable,
      )}
    >
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 60s linear infinite reverse;
          will-change: transform;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 45s linear infinite;
          will-change: transform;
        }
        .marquee-row:hover .animate-marquee-ltr,
        .marquee-row:hover .animate-marquee-rtl {
          animation-play-state: paused !important;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="flex flex-col gap-24">
          <BlurFade delay={0.25} inView>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold  mb-6">
                {settings.skillsTitle}
              </h2>

              <ul className="grid grid-cols-1 w-fit  sm:grid-cols-2 gap-x-24 gap-y-3 text-sm md:text-base text-gray-300">
                {settings.competencies.map((item, idx) => (
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
            <div className="flex flex-col gap-6 w-full max-w-2xl overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
              {/* Row 1: Marquee Left to Right (LTR) */}
              <div className="relative flex overflow-hidden z-20 marquee-row pointer-events-auto">
                <div className="flex w-max items-center animate-marquee-ltr py-2">
                  {[...row1, ...row1].map((tool, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-3 group/item shrink-0 mr-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 duration-500 ease-in-out"
                    >
                      <div className="relative w-8 h-8 md:w-12 md:h-12 transition-transform">
                        {renderToolIcon(tool)}
                      </div>
                      <span className="text-xs text-white/80 font-medium group-hover/item:text-white transition-colors">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Marquee Right to Left (RTL) */}
              <div className="relative flex overflow-hidden z-20 marquee-row pointer-events-auto">
                <div className="flex w-max items-center animate-marquee-rtl py-2">
                  {[...row2, ...row2].map((tool, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-3 group/item shrink-0 mr-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 duration-500 ease-in-out"
                    >
                      <div className="relative w-8 h-8 md:w-12 md:h-12 transition-transform">
                        {renderToolIcon(tool)}
                      </div>
                      <span className="text-xs text-white/80 font-medium group-hover/item:text-white transition-colors">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
