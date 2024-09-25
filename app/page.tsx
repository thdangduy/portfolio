"use client";
import React, { useState, useEffect } from "react";
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
      <React.Fragment>
        <main className="w-full">
          <div className="relative h-screen w-full flex items-center justify-center">
            <video
              src="https://res.cloudinary.com/dorxspa9g/video/upload/v1727156327/c4iyudhntmfcv2uztb8y.mp4"
              autoPlay
              loop
              muted
              preload="auto"
              typeof="video/mp4"
              playsInline
              aria-placeholder="my video"
              className="h-fit w-3/4 select-none  "
              controls={false}
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onError={() => {
                console.log("error");
              }}
            ></video>
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
        </main>
      </React.Fragment>
    </>
  );
};

export default Home;
