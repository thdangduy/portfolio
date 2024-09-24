"use client";

import { Linkedin, MailIcon } from "lucide-react";
import { FaGithub, FaTelegram } from "react-icons/fa";

import { FooterForm } from "./footer-form";
import { MagicCard } from "./magicui/magic-card";

export const FooterContent = () => {
  const social = [
    {
      label: "bisal.int@gmail.com",
      link: "mailto:bisal.int@gmail.com",
      icon: MailIcon,
    },
    {
      label: "avisek-ray",
      link: "https://www.linkedin.com/in/avisek-ray/",
      icon: Linkedin,
    },
    {
      label: "Avisek Ray",
      link: "https://github.com/biisal",
      icon: FaGithub,
    },
    {
      label: "biisal",
      link: "https://telegram.me/biisal",
      icon: FaTelegram,
    },
  ];
  return (
    <div className="w-full h-full items-center justify-center flex flex-col py-32 px-6">
      <div className="w-full grid items-center justify-center gap-5 md:grid-cols-2 grid-cols-1 md:p-4">
        <MagicCard className="w-full h-fit bg-primary p-4">
          <FooterForm />
        </MagicCard>
        <MagicCard className="w-full gap-4 bg-primary p-4">
          <div className="mb-4">
            <h1 className="md:text-3xl text-xl font-semibold text-gray-400">
              Looking for Freelance Projects or Job Opportunities?
            </h1>
            <p className="text-gray-500 ">
              I&apos;m open to freelance work or a full-time position. If you
              have a project or job offer, feel free to get in touch!
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="md:text-3xl text-xl font-semibold text-gray-400">
              Find Me On
            </h1>
            <ul>
              {social.map(({ label, link, icon: Icon }) => (
                <li
                  key={label}
                  className="flex gap-2 items-center text-gray-500 hover:text-gray-300 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" /> <a href={link}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </MagicCard>
      </div>
    </div>
  );
};
