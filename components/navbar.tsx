"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  JetBrains_Bold,
  JetBrains_Light,
  MontserratFont,
  Playfair,
} from "@/fonts";
import { cn } from "@/lib/utils";
import Hamburger from "./hamburger";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Contact, Folder, HomeIcon, User } from "lucide-react";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>();
  useGSAP(() => {
    gsap.set("#expendedNav", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      opacity: 0,
    });
    gsap.set("ul li p", { yPercent: 100, opacity: 0 });
    gsap.set("ul li div", { yPercent: 100, opacity: 0 });
    gsap.set("#navTitle", { yPercent: 100, opacity: 0 });
    tl.current = gsap
      .timeline({ paused: true })
      .to("#expendedNav", {
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power4.inOut",
      })
      .to("#navTitle", {
        yPercent: 0,
        duration: 0.7,
        opacity: 1,
      })
      .to("ul li p , ul li div", {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
        delay: -0.75,
        duration: 0.7,
      });
  });

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  const routes = [
    {
      label: "Home",
      icon: HomeIcon,
    },
    {
      label: "About",
      icon: User,
    },
    {
      label: "Projects",
      icon: Folder,
    },
    {
      label: "Contact",
      icon: Contact,
    },
  ];
  return (
    <>
      <nav
        className={cn(
          "w-full px-4 h-16 flex items-center justify-between fixed top-0 right-0 z-40 backdrop-blur-xl",
          Playfair.className
        )}
      >
        <h1 className={cn("", MontserratFont.className)}>@avisek</h1>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
      <div
        className={`pt-16 fixed w-64 h-full  z-20  transition-all duration-300`}
        style={{
          right: 10,
          opacity: 0,
        }}
        id="expendedNav"
      >
        <div className="h-fit p-3 w-full right-10 bg-white/5 backdrop-blur-lg rounded-md overflow-hidden">
          <h1 id="navTitle" className={cn("text-xs", JetBrains_Bold.className)}>
            Navigation
          </h1>
          <br className="bg-white w-full h-3" />
          <ul className={cn("space-y-3 z-20", JetBrains_Light.className)}>
            {routes.map((route) => (
              <li
                key={route.label}
                className="flex w-full items-center space-x-2 h-8 overflow-hidden "
              >
                <div className="bg-red-700 rounded-md p-2 w-fit">
                  <route.icon className="w-4 h-4" />
                </div>
                <p className="px-2 bg-white/5 rounded-md w-full h-full flex items-center text-center leading-loose">
                  {route.label}
                </p>
              </li>
            ))}
          </ul>
          {/* <div className="h-40 w-40 bg-red-700/35 absolute z-10 -right-20 -bottom-20 rounded-full box-border shadow-[0_0_40px_rgba(255,0,0,0.6)]"></div> */}
        </div>
      </div>
    </>
  );
};
