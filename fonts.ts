import { JetBrains_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Montserrat } from "next/font/google";
export const JetBrains_Light = JetBrains_Mono({
  subsets: ["latin"],
  weight: "300",
});
export const JetBrains_Bold = JetBrains_Mono({
  subsets: ["latin"],
  weight: "700",
});

export const Playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

export const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: "600",
});
