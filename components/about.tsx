import { BlurFade } from "@/components/ui/blur-fade";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full flex flex-col gap-8 z-10 ">
        <BlurFade delay={0.2} inView>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">Me</h2>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="flex flex-col gap-4 text-gray-300 text-base md:text-lg max-w-4xl">
            <p>
              I&apos;m Duy from{" "}
              <span className="text-lg text-white font-bold">Vietnam</span>. 
              I&apos;m a <span className="text-lg text-white font-medium">Self-taught SysAdmin</span> with a 
              deep passion for cloud infrastructure and operational efficiency.
            </p>
            <p>
              With over 10 years of experience in <span className="text-white font-medium">Logistics &amp; Operations</span> (Viettel Post, MWG), 
              I&apos;ve transitioned into the tech world during a personal break to care for my father. This period has 
              become my &quot;intensive lab,&quot; where I&apos;ve mastered the art of bridging real-world operations with modern technology.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="py-4 flex flex-row items-stretch max-w-3xl rounded-r-xl ">
            <div className="bg-primary w-1 rounded-full self-stretch"></div>
            <p className="text-xl py-1 md:text-2xl font-semibold text-white leading-snug pl-5">
              I don&apos;t just write code; I build systems that solve real business problems using the 
              core principles: <span className="text-primary italic">Fast, Accurate, Convenient, Safe, and Cost-optimized.</span>
              <br />
              <span className="text-lg font-normal text-gray-400 mt-2 block">
                Whether it&apos;s Docker orchestration, n8n automation, or self-hosted networking—I focus on 
                stability and performance.
              </span>
            </p>
          </div>
          <p className="text-xs pt-4 opacity-70 font-mono italic">
            {"// talk is cheap, actions speak louder. scroll down to see my stack!"}
          </p>
        </BlurFade>
      </div>
    </section>
  );
};

export default About;