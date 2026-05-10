import "./globals.css";

import About from "@/components/about";
import BlogPreview from "@/components/blog-preview";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Intro from "@/components/intro";
import ProjectsIntro from "@/components/projects-intro";
import Skills from "@/components/skills";
import { getProjects } from "@/lib/actions/projects";

export const revalidate = 600;

export default async function Home() {
  await getProjects();
  let wakatimeData = { languages: [] };
  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/68eb264d-d06b-44ea-ab1c-552fbed580de/stats/last_7_days?timeout=15",
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const json = await res.json();
      wakatimeData = json.data;
    }
  } catch (error) {
    console.error("Error fetching Wakatime stats:", error);
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
