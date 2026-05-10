"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

/**
 * GROOT PARTICLES CONFIGURATION
 */
const GROOT_CONFIG = {
  TOTAL_PARTICLES: 15,
  CENTER_X: "48%",
  CENTER_Y: "58%",
  SPREAD_RADIUS: 450,
  
  COLORS: [
    { bg: "#4ade80", glow: "rgba(74, 222, 128, 0.8)" }, // Green
    { bg: "#fde68a", glow: "rgba(253, 230, 138, 0.9)" }, // Yellow
    { bg: "#93c5fd", glow: "rgba(147, 197, 253, 0.8)" }, // Blue
    { bg: "#ffffff", glow: "rgba(255, 255, 255, 0.9)" }, // White
  ],

  DURATION_MIN: 10,
  DURATION_MAX: 18,
};

const GrootParticles = () => {
  const generateGrootParticles = () =>
    Array.from({ length: GROOT_CONFIG.TOTAL_PARTICLES }, (_, i) => {
      const color = GROOT_CONFIG.COLORS[Math.floor(Math.random() * GROOT_CONFIG.COLORS.length)];
      const angle = (i / GROOT_CONFIG.TOTAL_PARTICLES) * Math.PI * 2 + Math.random();
      const dist = GROOT_CONFIG.SPREAD_RADIUS * (0.3 + Math.random() * 0.7);
      
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 100;

      // Parabolic path logic: Mid-point with height offset
      const midX = tx * 0.5;
      const midY = ty * 0.3 - (100 + Math.random() * 150); // Peak of parabola

      return {
        id: i,
        // Path: Start -> Peak (Parabol) -> Destination -> Floating
        pathX: [0, midX, tx, tx + (Math.random() * 50 - 25)],
        pathY: [0, midY, ty, ty - 50],
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 1.5, 0],
        color: color.bg,
        glow: color.glow,
        // Randomized size: 1px to 6px
        size: 1 + Math.random() * 5,
        duration: GROOT_CONFIG.DURATION_MIN + Math.random() * (GROOT_CONFIG.DURATION_MAX - GROOT_CONFIG.DURATION_MIN),
        delay: Math.random() * 10,
      };
    });

  const [particles] = useState(generateGrootParticles);

  return (
    <div className="absolute pointer-events-none z-20" style={{ left: GROOT_CONFIG.CENTER_X, top: GROOT_CONFIG.CENTER_Y }}>
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl"
        style={{ width: 80, height: 80 }}
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.3, 0.9] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.glow}, 0 0 24px ${p.glow}`,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: p.pathX,
            y: p.pathY,
            opacity: p.opacity,
            scale: p.scale,
            filter: ["blur(0px)", "blur(1px)", "blur(4px)", "blur(8px)"],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

export default GrootParticles;