"use client";

import {
  ArrowUpRight,
  GithubIcon,
  MailIcon,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import { GoogleSans } from "@/fonts";
import { cn } from "@/lib/utils";

import ContactForm from "./contact-form";
import { BlurFade } from "./ui/blur-fade";

const ContactSection = () => {
  const social = [
    {
      icon: MailIcon,
      link: "mailto:me@thaiduy.digital",
      label: "me@thaiduy.digital",
      name: "Email",
    },
    {
      icon: MessageCircle,
      link: "https://wa.me/84909507475",
      label: "+84 909507475",
      name: "WhatsApp",
    },
    {
      icon: GithubIcon,
      link: "https://github.com/thdangduy",
      label: "github.com/thdangduy",
      name: "GitHub",
    },
  ];

  return (
    <section
      id="contact"
      className={cn(
        "relative min-h-screen w-full py-24 flex items-center",
        GoogleSans.variable,
      )}
    >
      <div className="w-full">
        <BlurFade delay={0.1} inView>
          <div className="mb-16">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Let&apos;s Work
              <br />
              <span className="text-white/60">Together</span>
            </h2>
            <div className="flex items-center gap-2 mt-6">
              <div className="h-px w-12 bg-primary" />
              <p className="text-white/50 text-sm">
                Have a project in mind? I&apos;d love to hear about it.
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <BlurFade delay={0.2} inView className="lg:col-span-2">
            <div className="space-y-8">
              <div className="space-y-4">
                {social.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    target="_blank"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-white/40 uppercase tracking-wider">
                        {item.name}
                      </p>
                      <p className="text-white/80 group-hover:text-white transition-colors">
                        {item.label}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-sm text-white/70">
                    Available for freelance projects
                  </span>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl bg-white/2 border border-white/10">
              <ContactForm />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
