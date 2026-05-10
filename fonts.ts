import local from "next/font/local";

export const GoogleSans = local({
  src: [
    {
      path: "./public/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./public/fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
});

export const GoogleSansCode = local({
  src: "./public/fonts/GoogleSansCode-VariableFont_MONO,wght.ttf",
  weight: "100 900",
  variable: "--font-google-sans-code",
});

// Alias for backward compatibility
export const JetBrainsMono = GoogleSansCode;
