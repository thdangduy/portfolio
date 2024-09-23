"use client";

import { JetBrains_Bold } from "@/fonts";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

interface StickyImgProps {
  picturesPath: string[] & { length: 1 | 2 | 3 | 4 | 5 };
  showText?: boolean;
}

export const StickyImg = ({
  picturesPath,
  showText = false,
}: StickyImgProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 7]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
  ];

  const imageConfigurations = [
    "w-[300px] h-[45vh]",
    `w-1/3 h-1/3 md:w-1/4  md:h-1/4 top-${
      showText ? 2 : 1
    }/4 left-1/4 md:top-0 md:left-1/12`,
    "w-1/3 h-1/3 md:w-1/6 md:h-1/3 top-1/3 right-1/4 md:top-1/12 md:right-1/4",
    "w-1/3 h-1/3 md:w-1/4 md:h-1/4 bottom-1/4 left-1/4 md:bottom-1/12 md:left-1/3",
    // "w-1/3 h-1/3 md:w-1/4 md:h-1/4 bottom-1/4 left-1/4 md:bottom-1/12 md:left-1/3",
    "w-1/3 h-1/3 md:w-1/6 md:h-1/3 bottom-1/4 right-1/4 md:bottom-1/6 md:right-1/12",
  ];

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Array to track used configurations
  const usedConfigurations: Set<number> = new Set();

  const pictures = picturesPath.map((src, index) => {
    const isFirstImage = index === 0;
    let configIndex = isFirstImage
      ? 0
      : Math.floor(Math.random() * (imageConfigurations.length - 1)) + 1;

    // Ensure unique configuration for each image
    if (!isFirstImage) {
      while (usedConfigurations.has(configIndex)) {
        configIndex =
          Math.floor(Math.random() * (imageConfigurations.length - 1)) + 1;
      }
    }

    // Add the configIndex to the used configurations
    usedConfigurations.add(configIndex);

    return {
      src,
      scale: isFirstImage ? scales[0] : scales[configIndex],
      className: imageConfigurations[configIndex],
    };
  });

  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale, className }, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ scale, opacity: i === 0 ? opacity : undefined }}
          >
            <div className={`relative ${className}`}>
              {i === 0 ? (
                <Image
                  src={src}
                  alt={`Image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: i === 0 ? "cover" : "contain" }}
                />
              ) : showText ? (
                <h1
                  // rotate slightly with random values
                  style={{ rotate: `${Math.random() * 20 - 10}deg` }}
                  className={cn(
                    "text-lg w-full [word-spacing:-.5rem] whitespace-nowrap text-center md:text-2xl drop-shadow-[0_0_10px_rgb(255,0,0)] text-red-700",
                    JetBrains_Bold.className
                  )}
                >
                  {src}
                </h1>
              ) : (
                <Image
                  src={src}
                  alt={`Image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: i === 0 ? "cover" : "contain" }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
