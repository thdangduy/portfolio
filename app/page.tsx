import Intro from "@/components/intro";
import "./globals.css";
import ProjectsIntro from "@/components/projects-intro";
import About from "@/components/about";
import Footer from "@/components/footer";
import Skills from "@/components/skills";
import connectToDB from "@/lib/mongo.db";
import ContactSection from "@/components/contact-section";
import SmoothScroll from "@/components/smooth-scroll";
import BlogPreview from "@/components/blog-preview";
import { getProjects } from "@/lib/actions/projects";
import { prisma } from "@/lib/prisma";
import { Project } from "@/.generated/client";

export const revalidate = 600;

export default async function Home() {
  await getProjects();
  let wakatimeData = { languages: [] };
  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/0f55e9f5-6228-466e-903b-95815eb3a43e/stats/last_7_days?timeout=15",
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const json = await res.json();
      wakatimeData = json.data;
    }
  } catch (error) {
    console.error("Error fetching Wakatime stats:", error);
  }

  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany();
  } catch (err) {
    console.log("Error fetching projects : ", err);
  }
  return (
    <>
      <div className="container mx-auto px-6 pb-28 lg:px-20">
        <Intro />
        <About />
        <ProjectsIntro />
        <Skills languages={wakatimeData.languages} />
        <BlogPreview />
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
