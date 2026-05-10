"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/**
 * FIREFLY CONFIGURATION
 */
const FIREFLY_CONFIG = {
  TOTAL_FIREFLIES: 28,
  SPECIAL_FIREFLIES_START_INDEX: 20,
  BASE_SCALE_MIN: 0.5,
  BASE_SCALE_MAX: 1.2,
  SPECIAL_SCALE_MULTIPLIER: 1.15,
  BASE_GLOW_MIN: 5,
  BASE_GLOW_MAX: 12,
  SPECIAL_GLOW_MULTIPLIER: 1.3,
  WARM_GLOW_MULTIPLIER: 1.6,
  SMALL_FIREFLY_GLOW_MULTIPLIER: 1.5,
  WARM_COLOR_PROBABILITY: 0.45,
  NORMAL_DELAY_MIN: 0,
  NORMAL_DELAY_MAX: 10,
  SPECIAL_DELAY_MIN: 5,
  SPECIAL_DELAY_MAX: 23,
  NORMAL_DURATION_MIN: 15,
  NORMAL_DURATION_MAX: 40,
  SPECIAL_DURATION_MIN: 25,
  SPECIAL_DURATION_MAX: 55,
  NORMAL_BLINK_MIN: 2,
  NORMAL_BLINK_MAX: 6,
  SPECIAL_BLINK_MIN: 3,
  SPECIAL_BLINK_MAX: 6,
  WIND_PROBABILITY: 0.5,
  WIND_STRENGTH_MAX: 0.03,
  WIND_MULTIPLIER: 30,
  SCATTER_PROBABILITY: 0.33,
  SCATTER_BLUR_MIN: 0.5,
  SCATTER_BLUR_MAX: 1.4,
};

const Fireflies = () => {
  const [wind, setWind] = useState(0);
  const [windAffectedIds, setWindAffectedIds] = useState<Set<number>>(new Set());

  const generateFireflies = () =>
    Array.from({ length: FIREFLY_CONFIG.TOTAL_FIREFLIES }, (_, i) => {
      const isSpecial = i >= FIREFLY_CONFIG.SPECIAL_FIREFLIES_START_INDEX;
      const inScreenX = Math.random() * 1920;
      const inScreenY = Math.random() * 600 + 420;
      const baseScale = FIREFLY_CONFIG.BASE_SCALE_MIN + Math.random() * (FIREFLY_CONFIG.BASE_SCALE_MAX - FIREFLY_CONFIG.BASE_SCALE_MIN);
      const scale = isSpecial ? baseScale * FIREFLY_CONFIG.SPECIAL_SCALE_MULTIPLIER : baseScale;
      const color: "warm" | "cool" = Math.random() < FIREFLY_CONFIG.WARM_COLOR_PROBABILITY ? "warm" : "cool";
      const baseGlow = FIREFLY_CONFIG.BASE_GLOW_MIN + Math.random() * (FIREFLY_CONFIG.BASE_GLOW_MAX - FIREFLY_CONFIG.BASE_GLOW_MIN);
      const glow = baseGlow * (isSpecial ? FIREFLY_CONFIG.SPECIAL_GLOW_MULTIPLIER : 1) * (color === "warm" ? FIREFLY_CONFIG.WARM_GLOW_MULTIPLIER : 1);
      const hasScatter = Math.random() < FIREFLY_CONFIG.SCATTER_PROBABILITY;
      const scatterBlur = hasScatter ? FIREFLY_CONFIG.SCATTER_BLUR_MIN + Math.random() * (FIREFLY_CONFIG.SCATTER_BLUR_MAX - FIREFLY_CONFIG.SCATTER_BLUR_MIN) : 0;

      return {
        id: i,
        initialX: inScreenX,
        initialY: inScreenY,
        delay: isSpecial ? FIREFLY_CONFIG.SPECIAL_DELAY_MIN + Math.random() * 18 : Math.random() * 10,
        duration: isSpecial ? FIREFLY_CONFIG.SPECIAL_DURATION_MIN + Math.random() * 30 : 15 + Math.random() * 25,
        blinkDuration: isSpecial ? 3 + Math.random() * 3 : 2 + Math.random() * 4,
        scale,
        glow,
        color,
        scatterBlur,
        windFactor: 0.2 + Math.random() * 1.2,
        isWindImmune: isSpecial,
        pathX: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
        pathY: [0, Math.random() * 200 - 100, Math.random() * 300 - 150, 0],
        opacity: isSpecial ? [0, 0.8, 0.7, 0.95, 0] : [0, 0.75, 0.4, 0.85, 0],
      };
    });

  const [fireflies] = useState(generateFireflies);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < FIREFLY_CONFIG.WIND_PROBABILITY) {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const strength = Math.random() * FIREFLY_CONFIG.WIND_STRENGTH_MAX * direction;
        const duration = 1200;
        const affected = new Set<number>();
        const nonImmune = fireflies.filter(f => !f.isWindImmune).map(f => f.id);
        for(let i=0; i<3; i++) affected.add(nonImmune[Math.floor(Math.random() * nonImmune.length)]);
        setWindAffectedIds(affected);
        setWind(strength * FIREFLY_CONFIG.WIND_MULTIPLIER);
        setTimeout(() => { setWind(0); setWindAffectedIds(new Set()); }, duration);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [fireflies]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full"
          style={{
            width: `${4 * fly.scale}px`,
            height: `${4 * fly.scale}px`,
            background: fly.color === "warm" 
              ? `radial-gradient(circle, rgba(255,245,140,0.95) 0%, rgba(255,160,0,0.25) 100%)`
              : `radial-gradient(circle, rgba(180,255,170,0.9) 0%, rgba(80,255,120,0.25) 100%)`,
            filter: fly.scatterBlur ? `blur(${fly.scatterBlur}px)` : undefined,
            boxShadow: `0 0 ${fly.glow}px ${fly.color === "warm" ? "rgba(255,200,80,0.8)" : "rgba(150,255,130,0.65)"}`,
          }}
          initial={{ x: fly.initialX, y: fly.initialY, opacity: 0 }}
          animate={{
            x: windAffectedIds.has(fly.id) ? fly.pathX.map(dx => fly.initialX + dx + wind) : fly.pathX.map(dx => fly.initialX + dx),
            y: fly.pathY.map(dy => fly.initialY + dy),
            opacity: fly.opacity,
            scale: [0, fly.scale, fly.scale * 0.8, fly.scale, 0],
          }}
          transition={{
            x: { duration: fly.duration / 4, repeat: Infinity, ease: "easeOut" },
            y: { duration: fly.duration, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: fly.blinkDuration, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: fly.duration / 2, repeat: Infinity, ease: "easeInOut" },
            delay: fly.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;