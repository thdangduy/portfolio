"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react"; // Keep useMemo for genreConfig

import { useNowPlaying } from "@/components/now-playing";

export const WaveformLine = () => {
  const { data, genre } = useNowPlaying();
  const [isHovered, setIsHovered] = useState(false);
  const [time, setTime] = useState(0);

  const genreConfig = useMemo(
    () => ({
      rock: { freq: 8.5, amp: 1.5, speed: 0.015 },
      pop: { freq: 5.0, amp: 1.1, speed: 0.009 },
      ballad: { freq: 1.8, amp: 0.5, speed: 0.004 },
      classic: { freq: 3.2, amp: 0.7, speed: 0.005 },
      instrumental: { freq: 4.0, amp: 0.8, speed: 0.006 },
      orchestra: { freq: 6.0, amp: 1.3, speed: 0.008 },
      jazz: { freq: 4.5, amp: 1.0, speed: 0.008 },
      blues: { freq: 3.5, amp: 0.9, speed: 0.005 },
      bossa: { freq: 2.8, amp: 0.7, speed: 0.006 },
      lofi: { freq: 1.2, amp: 0.4, speed: 0.002 },
      bolero: { freq: 2.2, amp: 0.6, speed: 0.004 },
      default: { freq: 3.5, amp: 1.2, speed: 0.005 },
    }),
    [],
  );

  useEffect(() => {
    if (!data?.isPlaying) {
      return;
    }

    let frameId: number;
    const animate = (t: number) => {
      setTime(t);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [data?.isPlaying]);

  const generatePath = (
    phaseOffset: number,
    freqMult: number,
    ampMult: number,
  ) => {
    const width = 120;
    const height = 24;
    if (!data?.isPlaying) return `M 0 ${height / 2} L ${width} ${height / 2}`;

    const { freq, amp, speed } = genreConfig[genre as keyof typeof genreConfig];
    const points = 60;
    const baseAmplitude = 6;
    let p = `M 0 ${height / 2}`;

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const envelope = Math.sin((i / points) * Math.PI);
      const y =
        height / 2 +
        Math.sin(
          (i / points) * Math.PI * freq * freqMult + time * speed + phaseOffset,
        ) *
          baseAmplitude *
          amp *
          ampMult *
          envelope;
      p += ` L ${x} ${y}`;
    }
    return p;
  };

  const handleClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo(document.body.scrollHeight);
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-4">
      <motion.div
        layoutId="waveform"
        className="cursor-pointer flex items-center justify-center h-8"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          className="overflow-visible"
        >
          <defs>
            <linearGradient
              id="midGrad"
              x1="0"
              y1="0"
              x2="120"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient
              id="lowGrad"
              x1="0"
              y1="0"
              x2="120"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(34,197,94,0)" />
              <stop offset="30%" stopColor="rgba(34,197,94,0.9)" />
              <stop offset="70%" stopColor="rgba(34,197,94,0.9)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0)" />
            </linearGradient>
            <linearGradient
              id="highGrad"
              x1="0"
              y1="0"
              x2="120"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(245,158,11,0)" />
              <stop offset="30%" stopColor="rgba(245,158,11,0.9)" />
              <stop offset="70%" stopColor="rgba(245,158,11,0.9)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0)" />
            </linearGradient>
            <linearGradient
              id="blueGrad"
              x1="0"
              y1="0"
              x2="120"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(59,130,246,0)" />
              <stop offset="30%" stopColor="rgba(59,130,246,0.9)" />
              <stop offset="70%" stopColor="rgba(59,130,246,0.9)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </linearGradient>
          </defs>

          <motion.path
            d={generatePath(Math.PI * 0.8, 0.5, 1.3)}
            stroke="url(#lowGrad)"
            strokeWidth="2.2"
            fill="none"
            animate={
              data?.isPlaying
                ? {
                    opacity: [0.5, 1, 0.5],
                    filter: ["blur(1.5px)", "blur(4px)", "blur(1.5px)"],
                  }
                : {}
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d={generatePath(Math.PI * 0.5, 1.8, 0.7)}
            stroke="url(#blueGrad)"
            strokeWidth="1.8"
            fill="none"
            animate={
              data?.isPlaying
                ? {
                    opacity: [0.4, 0.9, 0.4],
                    filter: ["blur(1px)", "blur(2.5px)", "blur(1px)"],
                  }
                : {}
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d={generatePath(Math.PI * 1.5, 2.2, 1.0)}
            stroke="url(#highGrad)"
            strokeWidth="1.4"
            fill="none"
            animate={
              data?.isPlaying
                ? {
                    opacity: [0.5, 1, 0.5],
                    filter: ["blur(1px)", "blur(3.5px)", "blur(1px)"],
                  }
                : {}
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d={generatePath(0, 1, 0.4)}
            stroke="url(#midGrad)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            animate={
              data?.isPlaying
                ? {
                    filter: [
                      "drop-shadow(0 0 1px white)",
                      "drop-shadow(0 0 4px white)",
                      "drop-shadow(0 0 1px white)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-8 right-0 whitespace-nowrap bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/10 backdrop-blur-sm"
          >
            {data?.isPlaying
              ? `Listening: ${data.name} (${genre})`
              : "Not listening"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
