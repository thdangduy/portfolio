"use client";
import React from "react";
import { MagicCard } from "./magicui/magic-card";

type Step = {
  title: string;
  description: string;
};

export function WebDevProcess({ steps }: { steps: Step[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 backdrop-blur-lg px-5">
      {steps.map(({ title, description }, index) => (
        <MagicCard key={index} className="bg-primary p-2 relative">
          <div className="absolute backdrop-blur-sm top-0 right-0 rounded-full h-8 w-8 flex items-center justify-center  bg-primary-foreground/5">
            <h1 className="text-sm">{index + 1}</h1>
          </div>

          <div className="flex items-center h-fit gap-2 py-2 border-white/25 border-b">
            <div className="w-1 h-8 bg-red-700 rounded-full" />
            <h1 className="text-xl md:text-2xl text-gray-200">{title}</h1>
          </div>
          <p className="pl-4 pt-2 text-gray-400 text-sm">{description}</p>
        </MagicCard>
      ))}
    </div>
  );
}
