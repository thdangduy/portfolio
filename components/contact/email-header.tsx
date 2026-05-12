"use client";
import { toast } from "sonner";

export const EmailHeader = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast(`${text} copied to clipboard`);
      })
      .catch(() => {
        toast.error(`Failed to copy ${text} to clipboard`);
      });
  };
  return (
    <h1
      onClick={() => copyToClipboard("me@thaiduy.digital")}
      className="lg:text-9xl md:text-7xl text-4xl font-bold text-center flex flex-col justify-center items-center mt-2 hover:scale-95 transition-all duration-300 cursor-pointer hover:text-primary text-white/90"
    >
      me<span className="text-primary">@thaiduy.digital</span>
    </h1>
  );
};
