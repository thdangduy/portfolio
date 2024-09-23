"use client";

import { motion } from "framer-motion";
interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Hamburger({ isOpen, setIsOpen }: HamburgerProps) {
  const toggleMenu = () => setIsOpen(!isOpen);

  const topLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 8 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -8 },
  };

  return (
    <button
      onClick={toggleMenu}
      className="relative w-10 h-10 focus:outline-none z-30"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <motion.div
          variants={topLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white mb-1.5 origin-center"
        />
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white mb-1.5"
        />
        <motion.div
          variants={bottomLineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white origin-center"
        />
      </div>
    </button>
  );
}
