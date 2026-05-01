"use client";
import { JetBrainsMono } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  TwitterIcon,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { HyperText } from "@/components/ui/hyper-text";
import { email, linkedin, phoneNumber, xTwetter, github } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
const Intro = () => {
  return (
    <section
      id="intro"
      className="relative flex min-h-screen w-full flex-col  justify-center overflow-hidden text-white"
    >
      <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 z-10">
          <BlurFade delay={0.25} inView>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-white/80">
                Open to work
              </span>
            </div>
          </BlurFade>

          <div className="flex flex-col gap-2">
            <BlurFade delay={0.35} inView>
              <h2 className="text-xl font-bold text-primary md:text-2xl">
                Software Engineer :)
              </h2>
            </BlurFade>
            <BlurFade delay={0.45} inView>
              <HyperText
                className={cn(
                  "text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl",
                  JetBrainsMono.className,
                )}
                startOnView={true}
                delay={1000}
              >
                Avisek Ray
              </HyperText>
            </BlurFade>
          </div>

          <BlurFade delay={0.55} inView>
            <div className="mt-8 flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:flex-wrap md:gap-8">
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-primary" />
                <span>{email}</span>
              </Link>

              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 hover:text-white transition-colors"
              >
                <Image
                  src="/icons/linkedin.svg"
                  className="blur-[1.3px]"
                  alt="Linkedin"
                  width={24}
                  height={24}
                />
                <span className="blur-[1.2px]">/in/biisal</span>
              </Link>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>India</span>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.65} inView>
            <div className="mt-8 flex gap-4">
              <div className="flex gap-4">
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/icons/github-dark.svg"
                    alt="Github"
                    width={24}
                    height={24}
                  />
                </Link>
                <a
                  href={xTwetter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/icons/x-twitter.svg"
                    alt="X Twitter"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Intro;
