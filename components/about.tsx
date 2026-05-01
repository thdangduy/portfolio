import { BlurFade } from "@/components/ui/blur-fade";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full flex flex-col gap-8 z-10 ">
        <BlurFade delay={0.2} inView>
          <h2 className="text-4xl md:text-5xl font-bold  mb-2">Me</h2>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="flex flex-col gap-2 text-gray-300  text-base md:text-lg">
            <p>
              I’m Avisek from{" "}
              <span className="text-lg text-white font-bold">
                West Bengal, India
              </span>
              . I’m pursuing a{" "}
              <span className="text-lg text-white font-medium">
                BCA in Software Engineering
              </span>{" "}
              at Amity University.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="py-2 flex flex-row items-stretch max-w-3xl  rounded-r-xl ">
            <div className="bg-primary w-1 rounded-full self-stretch"></div>
            <p className="text-xl py-1 md:text-2xl font-semibold text-white leading-snug pl-5">
              I like to make things that help people using my programming
              skills. Also, I’m a freelancer.
              <br />
              My goal is to keep learning, explore new technologies, and
              contribute to projects that make a real difference.
            </p>
          </div>
          <p className="text-xs pt-2 opacity-90">talk is cheap, scroll down!</p>
        </BlurFade>
      </div>
    </section>
  );
};

export default About;
