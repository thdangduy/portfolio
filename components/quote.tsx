"use client";
import { useGSAP } from "@gsap/react";
import { MagicCard } from "./magicui/magic-card";
import { Typing } from "./typing-an";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export function Quote() {
  const magicCardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline();
  useGSAP(() => {
    tl.set(magicCardRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      y: 200,
      opacity: 0,
    });
    tl.from(lineRef.current, {
      width: 0,
      opacity: 0,
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top bottom",
        end: "bottom 75%",
        scrub: 1,
      },
    });
    tl.to(magicCardRef.current, {
      y: 0,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top bottom",
        end: "bottom 75%",
        scrub: 1,
      },
    });
  });
  return (
    <div className="w-96 flex flex-col items-center relative">
      <div ref={magicCardRef} className="w-full">
        <MagicCard
          gradientColor="#ffb3be1f"
          className="w-full h-fit bg-primary p-4 items-start z-10"
        >
          <Typing
            delay={5000}
            className="text-lg w-full text-start"
            labels={[
              "स्वे स्वे कर्मण्यभिरत: संसिद्धिं लभते नर: ",
              "By fulfilling their duties,Born of their innate qualities, Human being can attain perfection.",
            ]}
          />
          <p className="text-sm w-full text-end text-gray-600">
            - Srimad Bhagavad Gita (18.45)
          </p>
        </MagicCard>
      </div>
      <div
        ref={lineRef}
        className="mt-6 w-full h-1 z-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
      />
    </div>
  );
}
