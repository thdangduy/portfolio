import "./globals.css";

import { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import Dock from "@/components/dock";
import GlobalBackground from "@/components/global-background";
import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/smooth-scroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Toaster } from "@/components/ui/sonner";
import { GoogleSans } from "@/fonts";
import { cn } from "@/lib/utils";

const heroImgUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/hero4.png`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Thái Duy | Self-taught SysAdmin & Infrastructure lover",
  icons: {
    icon: heroImgUrl,
  },
  description:
    "Thái Duy is a SysAdmin and Automation expert from Vietnam, specializing in self-hosted infrastructure, Docker, n8n workflows, and logistics operations optimization.",
  keywords: [
    "thaiduy",
    "Thái Duy",
    "portfolio",
    "portfolio.thaiduy.digital",
    "SysAdmin Vietnam",
    "Infrastructure Engineer",
    "Automation Expert",
    "n8n workflows",
    "Self-hosted Specialist",
    "Docker & Proxmox",
    "Logistics Optimization",
    "Networking & VPN",
    "Ubuntu Server",
    "Oracle Cloud ARM",
    "Portfolio",
  ],
  authors: [{ name: "Thái Duy", url: "https://portfolio.thaiduy.digital" }],
  openGraph: {
    title: "Thái Duy | Self-taught SysAdmin & Infrastructure lover",
    description:
      "Explore the portfolio of Thái Duy, focusing on system administration, infrastructure, and business automation. Expert in n8n, Docker, and Logistics-driven tech solutions.",
    url: "https://portfolio.thaiduy.digital",
    siteName: "Thái Duy Portfolio",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: heroImgUrl,
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thái Duy | SysAdmin & Automation Expert",
    description:
      "Specializing in infrastructure, self-hosted services, and logistics optimization through automation.",
    creator: "@thaiduy",
    images: [heroImgUrl],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={cn("text-white cursor-none", GoogleSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <GlobalBackground />
          <Navbar />
          <Dock />
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />

          <SmoothCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
