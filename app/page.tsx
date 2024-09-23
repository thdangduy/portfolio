"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { StickyImg } from "@/components/sticky-img";
import Lenis from "@studio-freight/lenis";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});
const Home = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <main className="h-full w-full">
        <Navbar />
        <div className="h-screen w-full">
          <Scene />
        </div>
        <StickyImg
          picturesPath={[
            "/who-am-i.png",
            "Education?",
            "Interests?",
            "Information?",
            "What Do I Do?",
          ]}
          showText={true}
        />
        <About />
        <StickyImg
          picturesPath={[
            "/what-i-have-developed.png",

            "/django.png",
            "/fastapi.png",
            "/nextjs.png",
            "/react.png",
          ]}
        />

        <Projects />
        <Footer />
      </main>
    </>
  );
};

export default Home;
