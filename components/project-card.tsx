"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: {
    src: string;
    label: string;
    description: string;
    route: string;
  };
}

export function ProjectCard({
  project: { src, label, description, route },
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen p-4 flex flex-col md:flex-row items-center justify-center gap-8">
      <motion.div
        className="w-full md:w-1/2 lg:w-1/3 h-64 rounded-xl overflow-hidden relative shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={src}
          alt="Project Preview"
          fill
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          className="transition-transform object-cover object-left duration-300 hover:scale-105"
        />
      </motion.div>
      <motion.div
        className={`w-full md:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-xl overflow-hidden relative ${
          isHovered
            ? "bg-gradient-to-br from-red-700/90 to-red-600/90"
            : "bg-white/5"
        } transition-colors duration-500 ease-in-out backdrop-blur-sm`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-600/0"
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(to bottom right, rgba(185,28,28,0), rgba(220,38,38,0))",
                  "linear-gradient(to bottom right, rgba(185,28,28,0.9), rgba(220,38,38,0.9))",
                ]
              : [
                  "linear-gradient(to bottom right, rgba(185,28,28,0.9), rgba(220,38,38,0.9))",
                  "linear-gradient(to bottom right, rgba(185,28,28,0), rgba(220,38,38,0))",
                ],
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="relative z-10">
          <motion.h1
            className="text-2xl font-bold mb-3 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {label}
          </motion.h1>
          <motion.p
            className={`text-sm mb-4 line-clamp-6 ${
              isHovered ? "text-red-100" : "text-gray-300"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {description}
          </motion.p>
          <motion.button
            className="px-3 py-1.5 bg-gradient-to-r from-red-700 to-red-600 text-white text-sm rounded-full flex items-center gap-1.5 hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              router.push(route);
            }}
          >
            Learn More <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
