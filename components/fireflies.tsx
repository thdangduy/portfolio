"use client";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { useNowPlaying } from "@/components/now-playing";

/**
 * CONFIGURATIONS
 */
const FIREFLY_CONFIG = {
  TOTAL_FIREFLIES: 28,
  SPECIAL_FIREFLIES_START_INDEX: 20,
  BASE_SCALE_MIN: 0.5,
  BASE_SCALE_MAX: 1.2,
  SPECIAL_SCALE_MULTIPLIER: 1.15,
  WARM_COLOR_PROBABILITY: 0.45,
  NORMAL_DURATION_MIN: 15,
  NORMAL_DURATION_MAX: 40,
  WIND_PROBABILITY: 0.5,
  WIND_STRENGTH_MAX: 0.03,
  WIND_MULTIPLIER: 30,
  SCATTER_PROBABILITY: 0.33,
  SCATTER_BLUR_MIN: 0.5,
  SCATTER_BLUR_MAX: 1.4,
};

const GENRE_CONFIG = {
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
};

const MUSIC_COLORS = [
  { bg: "rgba(34,197,94,0.9)", glow: "rgba(34,197,94,0.8)" }, // Low - Green
  { bg: "rgba(255,255,255,0.95)", glow: "rgba(255,255,255,0.8)" }, // Mid - White
  { bg: "rgba(245,158,11,0.9)", glow: "rgba(245,158,11,0.8)" }, // High - Orange
  { bg: "rgba(59,130,246,0.9)", glow: "rgba(59,130,246,0.8)" }, // Blue - Treble
];

interface Firefly {
  id: number;
  initialX: number;
  initialY: number;
  delay: number;
  duration: number;
  blinkDuration: number;
  scale: number;
  glow: number;
  naturalColor: "warm" | "cool";
  freqRole: number;
  scatterBlur: number;
  windFactor: number;
  isWindImmune: boolean;
  pathX: number[];
  pathY: number[];
  opacityArr: number[];
}

/**
 * HELPER: Initialize fireflies outside the component to satisfy Purity rules
 */
const generateInitialFireflies = (): Firefly[] => {
  return Array.from({ length: FIREFLY_CONFIG.TOTAL_FIREFLIES }, (_, i) => {
    const isSpecial = i >= FIREFLY_CONFIG.SPECIAL_FIREFLIES_START_INDEX;
    const baseScale =
      FIREFLY_CONFIG.BASE_SCALE_MIN +
      Math.random() *
        (FIREFLY_CONFIG.BASE_SCALE_MAX - FIREFLY_CONFIG.BASE_SCALE_MIN);
    const hasScatter = Math.random() < FIREFLY_CONFIG.SCATTER_PROBABILITY;

    return {
      id: i,
      initialX: Math.random() * 1920,
      initialY: Math.random() * 600 + 420,
      delay: Math.random() * 20,
      duration: isSpecial ? 25 + Math.random() * 30 : 15 + Math.random() * 25,
      blinkDuration: isSpecial ? 3 + Math.random() * 3 : 2 + Math.random() * 4,
      scale: isSpecial
        ? baseScale * FIREFLY_CONFIG.SPECIAL_SCALE_MULTIPLIER
        : baseScale,
      glow: 8 + Math.random() * 10,
      naturalColor:
        Math.random() < FIREFLY_CONFIG.WARM_COLOR_PROBABILITY ? "warm" : "cool",
      freqRole: i % 4,
      scatterBlur: hasScatter
        ? FIREFLY_CONFIG.SCATTER_BLUR_MIN +
          Math.random() *
            (FIREFLY_CONFIG.SCATTER_BLUR_MAX - FIREFLY_CONFIG.SCATTER_BLUR_MIN)
        : 0,
      windFactor: 0.5 + Math.random() * 1.5,
      isWindImmune: isSpecial,
      pathX: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
      pathY: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
      opacityArr: isSpecial ? [0, 0.8, 0.7, 0.95, 0] : [0, 0.75, 0.4, 0.85, 0],
    };
  });
};

const Fireflies = () => {
  const { data: musicData, genre } = useNowPlaying();
  const [wind, setWind] = useState(0);
  const [windAffectedIds, setWindAffectedIds] = useState<Set<number>>(
    new Set(),
  );

  // Use the helper function to initialize data once
  const fireflies = useMemo(() => generateInitialFireflies(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !musicData?.isPlaying &&
        Math.random() < FIREFLY_CONFIG.WIND_PROBABILITY
      ) {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const strength =
          Math.random() * FIREFLY_CONFIG.WIND_STRENGTH_MAX * direction;

        const affected = new Set<number>();
        const nonImmune = fireflies
          .filter((f) => !f.isWindImmune)
          .map((f) => f.id);
        if (nonImmune.length > 0) {
          for (let i = 0; i < 3; i++) {
            affected.add(
              nonImmune[Math.floor(Math.random() * nonImmune.length)],
            );
          }
        }

        setWindAffectedIds(affected);
        setWind(strength * FIREFLY_CONFIG.WIND_MULTIPLIER);

        setTimeout(() => {
          setWind(0);
          setWindAffectedIds(new Set());
        }, 1200);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [musicData?.isPlaying, fireflies]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {fireflies.map((fly) => {
        const isPlaying = musicData?.isPlaying;
        const currentConfig =
          GENRE_CONFIG[genre as keyof typeof GENRE_CONFIG] ||
          GENRE_CONFIG.default;

        // Optimized scale and glow math
        const calibratedAmpScale = 0.7 + currentConfig.amp * 0.6;
        const activeScale = isPlaying
          ? fly.scale * calibratedAmpScale
          : fly.scale;

        const musicColor = MUSIC_COLORS[fly.freqRole];
        const bg = isPlaying
          ? `radial-gradient(circle, ${musicColor.bg} 0%, rgba(0,0,0,0) 100%)`
          : fly.naturalColor === "warm"
            ? `radial-gradient(circle, rgba(255,245,140,0.95) 0%, rgba(255,160,0,0.25) 100%)`
            : `radial-gradient(circle, rgba(180,255,170,0.9) 0%, rgba(80,255,120,0.25) 100%)`;

        const activeGlow = isPlaying
          ? fly.glow * (0.8 + currentConfig.amp * 0.5)
          : fly.glow;

        const shadow = isPlaying
          ? `0 0 ${activeGlow}px ${musicColor.glow}`
          : `0 0 ${fly.glow}px ${fly.naturalColor === "warm" ? "rgba(255,200,80,0.8)" : "rgba(150,255,130,0.65)"}`;

        const activeBlinkDuration = isPlaying
          ? 10 / (currentConfig.freq + 1.5)
          : fly.blinkDuration;
        const moveDuration = isPlaying
          ? fly.duration / (1 + currentConfig.speed * 12)
          : fly.duration;

        return (
          <motion.div
            key={fly.id}
            className="absolute rounded-full"
            style={{
              width: `${4 * activeScale}px`,
              height: `${4 * activeScale}px`,
              background: bg,
              boxShadow: shadow,
              filter: fly.scatterBlur
                ? `blur(${fly.scatterBlur}px)`
                : undefined,
            }}
            initial={{ x: fly.initialX, y: fly.initialY, opacity: 0 }}
            animate={{
              x: fly.pathX.map(
                (dx) =>
                  fly.initialX +
                  dx +
                  (windAffectedIds.has(fly.id) ? wind * fly.windFactor : 0),
              ),
              y: fly.pathY.map((dy) => fly.initialY + dy),
              opacity: isPlaying ? [0, 1, 0.4, 1, 0] : fly.opacityArr,
              scale: [0, activeScale, activeScale * 0.8, activeScale, 0],
            }}
            transition={{
              x: {
                duration: isPlaying ? moveDuration : fly.duration / 4,
                repeat: Infinity,
                ease: isPlaying ? "linear" : "easeOut",
              },
              y: {
                duration: moveDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: activeBlinkDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: isPlaying ? (fly.id % 6) * 0.15 : fly.delay,
              },
              scale: {
                duration: activeBlinkDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default Fireflies;
