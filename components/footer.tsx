import { Github } from "lucide-react";
import Link from "next/link";

import { NowPlaying } from "@/components/now-playing";

const Footer = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-screen bg-black gap-4">
      <h1 className="text-xl font-thin text-white">Thank you :)</h1>
      <NowPlaying />
      <Link
        href="https://github.com/thdangduy/portfolio"
        target="_blank"
        className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <Github className="w-4 h-4" />
        <span>Source Code</span>
      </Link>
    </div>
  );
};

export default Footer;
