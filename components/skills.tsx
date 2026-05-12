"use client";
import {
  SiAffine,
  SiCaddy,
  SiCloudflare,
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
import Marquee from "@/components/ui/marquee";
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
  cloudflare: { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  caddy: { name: "Caddy", icon: SiCaddy, color: "#1F88C0" },
  affine: { name: "Affine", icon: SiAffine, color: "#1E96EB" },
};

const marqueeTools = Object.values(toolIcons);

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
  const midpoint = Math.ceil(marqueeTools.length / 2);
  const row1 = marqueeTools.slice(0, midpoint || marqueeTools.length);
  const row2 = marqueeTools.slice(midpoint);
  const marqueeRows = [row1, row2.length ? row2 : row1].filter(
    (row) => row.length > 0,
  );

  const displayLanguages = languages ? languages.slice(0, 5) : [];

  return (
    <section
      id="skills"
      className={cn(
        "relative min-h-screen w-full overflow-hidden text-white flex items-center",
        GoogleSans.variable,
      )}
    >
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
              {marqueeRows.map((row, rowIndex) => (
                <Marquee
                  key={rowIndex}
                  pauseOnHover
                  reverse={rowIndex === 0}
                  repeat={4}
                  className={cn(
                    "relative z-20 py-2 [--gap:2.5rem]",
                    rowIndex === 0 ? "[--duration:60s]" : "[--duration:45s]",
                  )}
                >
                  {row.map((tool) => (
                    <div
                      key={tool.name}
                      className="group/item flex w-16 shrink-0 flex-col items-center gap-3 grayscale opacity-60 duration-500 ease-in-out hover:grayscale-0 hover:opacity-100 md:w-20"
                    >
                      <div className="relative h-8 w-8 md:h-12 md:w-12">
                        {renderToolIcon(tool)}
                      </div>
                      <span className="max-w-full truncate text-xs font-medium text-white/80 transition-colors group-hover/item:text-white">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </Marquee>
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
