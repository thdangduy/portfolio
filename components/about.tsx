import { BlurFade } from "@/components/ui/blur-fade";
import type { SiteSettings } from "@/lib/site-settings";

interface AboutProps {
  settings: SiteSettings;
}

const About = ({ settings }: AboutProps) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full flex flex-col gap-8 z-10 ">
        <BlurFade delay={0.2} inView>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            {settings.aboutTitle}
          </h2>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="flex flex-col gap-4 text-gray-300 text-base md:text-lg max-w-4xl">
            {settings.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="py-4 flex flex-row items-stretch max-w-3xl rounded-r-xl ">
            <div className="bg-primary w-1 rounded-full self-stretch"></div>
            <p className="text-xl py-1 md:text-2xl font-semibold text-white leading-snug pl-5">
              {settings.aboutQuote}{" "}
              <span className="text-primary italic">
                {settings.aboutPrinciples}
              </span>
              <br />
              <span className="text-lg font-normal text-gray-400 mt-2 block">
                {settings.aboutSubquote}
              </span>
            </p>
          </div>
          <p className="text-xs pt-4 opacity-70 font-mono italic">
            {settings.aboutFootnote}
          </p>
        </BlurFade>
      </div>
    </section>
  );
};

export default About;
