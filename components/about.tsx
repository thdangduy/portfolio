"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { JetBrains_Light } from "@/fonts";
import { Typing } from "./typing-an";
import { curry } from "lodash";

const aboutMe = [
  {
    src: "/brief-bio.png",
    label: ["Who Am I?", "Who Am I Becoming?"],
    description: `I am Avisek Ray from West Bengal - India, 21+ years old Male Human. I've been programming for approximately 1.5 years, starting with C language as my foundation. Over time, I have explored various programming languages and technologies, continuously improving my skills.`,
  },
  {
    src: "/expertise.png",
    label: ["What Do I Do?", "What Do I Specialize In?"],
    description: `I aspire to be a Full Stack Developer.  

On the frontend, I work with React, Next.js, and GSAP for animations.  
For the backend, I use Django, FastAPI, and Flask.  
I code in Python, JavaScript, and TypeScript.  
When it comes to databases, I'm familiar with PostgreSQL, MongoDB, and MySQL.  
I also use Django's built-in ORM and Prisma for data management.`,
  },
  {
    src: "/education.png",
    label: ["What Have I Studied?", "What Have I Learned?"],
    description: `I passed my 10th grade with 72.71% and my Higher Secondary with 70.4%. Currently, I'm pursuing BCA with a specialization in Software Engineering, and I'm expected to graduate in 2027.`,
  },
];

export const About = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  const cursorSize = isHovering ? 90 : 0;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOption = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOption),
    y: useSpring(mouse.y, smoothOption),
  };

  const mouseMove = (e: MouseEvent) => {
    setIsHovering(true);
    mouse.x.set(e.clientX - cursorSize / 2);
    mouse.y.set(e.clientY - cursorSize / 2);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovering(true);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setIsHovering(false);
  };

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    target.addEventListener("mousemove", mouseMove);
    target.addEventListener("mouseenter", handleMouseEnter);
    target.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      target.removeEventListener("mousemove", mouseMove);
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorSize]);

  return (
    <div ref={targetRef} className="text-3xl h-[500vh] w-screen relative">
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-start">
        <motion.div
          ref={cursorRef}
          className="absolute rounded-full shadow-[0_0_10px_rgb(255,0,0)] bg-red-700 top-0 mix-blend-difference z-20"
          style={{
            height: cursorSize,
            width: cursorSize,
            left: smoothMouse.x,
            top: smoothMouse.y,
            transition: "opacity 0.3s ease",
          }}
          animate={{ width: cursorSize, height: cursorSize }}
        />
        <motion.div className="flex w-[300vw]" style={{ x }}>
          {aboutMe.map(({ src, label, description }, index) => (
            <div
              key={index}
              className={`about-container flex ${
                index % 2 == 0 ? "flex-col" : "flex-col-reverse"
              } md:flex-row flex-shrink-0 items-center justify-center w-screen h-screen`}
            >
              <div className="relative w-72 h-72 mix-blend-difference">
                <Image
                  src={src}
                  alt={label[0]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="image object-contain"
                />
              </div>
              <div
                className={`about-text z-30 w-[80vw] md:w-[40vw] flex flex-col ${
                  index == 2 && "items-end"
                }`}
              >
                <Typing labels={label} />
                <p
                  className={cn(
                    `text-xs whitespace-pre-wrap ${index == 2 && "text-end"}`,
                    JetBrains_Light.className
                  )}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
