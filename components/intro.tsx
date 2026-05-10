"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { HyperText } from "@/components/ui/hyper-text";
import { JetBrainsMono } from "@/fonts";
import { email, facebook, github, linkedin, phoneNumber, x } from "@/lib/config";
import { cn } from "@/lib/utils";
const Intro = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const hour12 = hours % 12 || 12;
    return {
      hour: hour12.toString().padStart(2, "0"),
      minute: minutes.toString().padStart(2, "0"),
      ampm: hours < 12 ? "AM" : "PM",
    };
  }, [currentTime]);

  const timezone = useMemo(() => {
    const offsetMinutes = -currentTime.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absMinutes = Math.abs(offsetMinutes);
    const offsetHours = Math.floor(absMinutes / 60);
    const offsetRem = absMinutes % 60;
    return {
      label: `UTC ${sign}${offsetHours}${offsetRem ? `:${offsetRem.toString().padStart(2, "0")}` : ""}`,
      minutes: offsetMinutes,
    };
  }, [currentTime]);

  const isSameTimezone = timezone.minutes === 7 * 60;
  const timezoneDiffLabel = useMemo(() => {
    if (isSameTimezone) {
      return "we're on the same time";
    }

    const diffMinutes = timezone.minutes - 7 * 60;
    const sign = diffMinutes >= 0 ? "+" : "-";
    const absDiff = Math.abs(diffMinutes);
    const diffHours = Math.floor(absDiff / 60);
    const diffRem = absDiff % 60;
    return `${sign}${diffHours}h${diffRem ? ` ${diffRem}m` : ""}`;
  }, [timezone.minutes, isSameTimezone]);

  return (
    <section
      id="intro"
      className="relative flex min-h-screen w-full flex-col  justify-center overflow-hidden text-white"
    >
      <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 z-10">
          <BlurFade delay={0.25} inView>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 translate-x-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-white/80">
                Open to work
              </span>
            </div>
          </BlurFade>

          <div className="flex flex-col gap-2">
            <BlurFade delay={0.35} inView>
              <h2 className="text-xl font-bold text-primary md:text-2xl">
                Self-taught SysAdmin & Infrastructure lover :))
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
                Thai Duy
              </HyperText>
            </BlurFade>
          </div>

          <BlurFade delay={0.55} inView>
            <div className="mt-8 flex flex-col gap-4 text-sm text-white/80 md:flex-row md:flex-wrap md:gap-8">
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
                <span className="blur-[1.2px]">/in/thdangduy</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Vietnam</span>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="mt-6 p-4 text-white/80">
              <div className="flex flex-wrap items-baseline gap-3 font-mono text-lg sm:text-xl">
                <div className="h-px w-6 bg-primary" />
                <div className="flex items-baseline gap-0.5">
                  <span className="font-semibold">{time.hour}</span>
                  <span className="text-primary animate-pulse">:</span>
                  <span className="font-semibold">{time.minute}</span>
                  <span className="text-sm text-white/60 ml-1">{time.ampm}</span>
                </div>
                <span className="text-white/60">at {timezone.label}</span>
                <span className="text-xs text-white/50">&#47;&#47; {timezoneDiffLabel}</span>
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
                    src="/icons/github.svg"
                    alt="Github"
                    width={24}
                    height={24}
                  />
                </Link>
                <a
                  href={x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/icons/x.svg"
                    alt="X Twitter"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 fill-white/20 hover:bg-white/10 transition-colors"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt="Facebook"
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
