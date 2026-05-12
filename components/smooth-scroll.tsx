"use client";

import Lenis from "lenis";
import { useEffect } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      anchors: {
        duration: 1.2,
        easing,
      },
      stopInertiaOnNavigate: true,
    });

    window.lenis = lenis;

    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (target) {
        lenis.scrollTo(target);
      }
    };

    let frameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);
    window.addEventListener("hashchange", scrollToHash);
    scrollToHash();

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      cancelAnimationFrame(frameId);
      if (window.lenis === lenis) {
        delete window.lenis;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
