import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NotFoundProps {
  text?: string;
}
const NotFound = ({ text }: NotFoundProps) => {
  return (
    <div className="bg-linear-to-b relative h-screen w-screen from-black via-midnightpurple/30 to-black p-4 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-30 w-full flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-7xl text-center w-full font-bold text-white">
          {text || "Page Not Found"}
        </h1>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-all duration-300 group px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Go back to Mom
        </Link>
      </div>
      <div className="h-10 w-full left-0 bg-linear-to-b from-transparent to-black absolute bottom-20 z-20" />
      <Image
        src="/404.png"
        className="h-auto w-auto bottom-20 absolute left-1/2 -translate-x-1/2 z-10"
        alt="Page Not Found Hero"
        width={500}
        height={384}
        priority
      />
    </div>
  );
};

export default NotFound;
