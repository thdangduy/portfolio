import React from "react";
import { Quote } from "./quote";
import { FooterContent } from "./footer-content";

export const Footer = () => {
  return (
    <div className="w-full h-[200vh]">
      <div className="w-screen sticky top-0  h-screen flex items-center justify-center">
        <Quote />
      </div>
      <div className="w-full h-screen backdrop-blur-md">
        <FooterContent />
      </div>
    </div>
  );
};
