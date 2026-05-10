import { Metadata } from "next";

import ProjectsIntro from "@/components/projects-intro";

export const metadata: Metadata = {
  title: "Projects | Thái Duy Portfolio",
  description:
    "Explore a collection of my recent projects, ranging from web applications to backend services and cloud infrastructure.",
  openGraph: {
    title: "Projects | Thái Duy Portfolio",
    description:
      "Explore a collection of my recent projects, ranging from web applications to backend services and cloud infrastructure.",
    url: "https://thaiduy.store/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Thái Duy Portfolio",
    description:
      "Portfolio of projects built with Next.js, Go, Python, and more.",
  },
};

export const revalidate = 600;

export default async function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 lg:px-20">
      <ProjectsIntro />
    </div>
  );
}
