import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "drive.thaiduy.store",
        protocol: "https",
      },
      {
        hostname: "246472115ee824489f8c6e120ea1d3c5.r2.cloudflarestorage.com",
        protocol: "https",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL:
      process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL,
  },
  allowedDevOrigins: ["portfolio.thaiduy.digital"],
};

export default nextConfig;
