import "./globals.css";

import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import Dock from "@/components/dock";
import GlobalBackground from "@/components/global-background";
import Navbar from "@/components/navbar";
import { NowPlayingProvider } from "@/components/now-playing";
import SmoothScroll from "@/components/smooth-scroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Toaster } from "@/components/ui/sonner";
import { GoogleSans } from "@/fonts";
import { getSiteSettings, resolvePublicUrl } from "@/lib/site-settings";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || settings.siteUrl;
  const faviconUrl = resolvePublicUrl(settings.faviconUrl, baseUrl);
  const ogImageUrl = resolvePublicUrl(settings.ogImage, baseUrl);

  return {
    title: settings.metaTitle,
    icons: {
      icon: faviconUrl,
    },
    description: settings.metaDescription,
    keywords: settings.metaKeywords,
    authors: [{ name: settings.authorName, url: settings.siteUrl }],
    openGraph: {
      title: settings.ogTitle,
      description: settings.ogDescription,
      url: settings.siteUrl,
      siteName: `${settings.authorName} Portfolio`,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.twitterTitle,
      description: settings.twitterDescription,
      creator: "@thaiduy27",
      images: [ogImageUrl],
    },
  };
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("text-white cursor-none", GoogleSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NowPlayingProvider>
            <GlobalBackground />
            <Navbar />
            <Dock />
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster />

            <SmoothCursor />
          </NowPlayingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
