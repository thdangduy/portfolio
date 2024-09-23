"use client";
import { JetBrains_Bold } from "@/fonts";
import { cn } from "@/lib/utils";
import { TypeAnimation } from "react-type-animation";

export const Typing = ({
  labels,
  className,
  delay,
}: {
  labels: string[];
  className?: string;
  delay?: number;
}) => {
  return (
    <TypeAnimation
      sequence={[labels[0], delay || 3000, labels[1], delay || 3000]}
      speed={50}
      style={{}}
      repeat={Infinity}
      className={
        className
          ? className
          : cn(
              "text-xl md:text-3xl md:[word-spacing:-.8rem] -tracking-tight text-red-700 drop-shadow-[0_0_10px_rgb(255,0,0)] whitespace-nowrap",
              JetBrains_Bold.className
            )
      }
    />
  );
};
