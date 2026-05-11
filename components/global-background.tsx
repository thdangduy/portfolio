"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { BlurFade } from "./ui/blur-fade";

// Dynamically import client-only components to prevent hydration errors
const DynamicFireflies = dynamic(() => import("./fireflies"), { ssr: false });

const GlobalBackground = () => {
  const { scrollY } = useScroll();
  const path = usePathname();

  const blurValue = useTransform(scrollY, [0, 500], ["0px", "40px"]);
  const darker = useTransform(scrollY, [0, 500], ["0%", "30%"]);
  const blurFilter = useTransform(blurValue, (v) => `blur(${v})`);
  const darkerOpacity = useTransform(darker, (v) => v);

  if (path.startsWith("/project") || path.startsWith("/blog")) {
    return (
      <div className="fixed inset-0 z-[-1] w-full h-full bg-blog-bg overflow-hidden" />
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-[#0a0a0a] overflow-hidden pointer-events-none">
      <motion.div
        style={{ filter: blurFilter }}
        className="absolute inset-0 w-full h-full z-1"
      >
        <BlurFade className="w-full h-full" inView>
          <div className="h-full w-full relative">
            <Image
              fill
              src="/izzac-s1-jsSbkXIs8RM-unsplash.jpg"
              alt="Background"
              className="object-cover"
              priority
            />
          </div>
        </BlurFade>
      </motion.div>
      <motion.div
        style={{ opacity: darkerOpacity }}
        className="absolute inset-0 w-full h-full bg-black z-2"
      />
      <DynamicFireflies />
    </div>
  );
};

export default GlobalBackground;
