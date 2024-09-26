"use client";

import { ThemeProvider } from "next-themes";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      {children}
    </ThemeProvider>
  );
};
