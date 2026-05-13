import { prisma } from "@/lib/prisma";

export const SITE_SETTINGS_ID = "site";

export type SiteSettings = {
  id: string;
  downloadCvUrl: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutQuote: string;
  aboutPrinciples: string;
  aboutSubquote: string;
  aboutFootnote: string;
  skillsTitle: string;
  competencies: string[];
  tools: string[];
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  authorName: string;
  siteUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: SITE_SETTINGS_ID,
  downloadCvUrl:
    "https://drive.google.com/file/d/1wcR-9LoLmYQQ3lh-m35V7NxV1AdURNda/view?usp=drive_link",
  aboutTitle: "Me",
  aboutParagraphs: [
    "I'm Duy from Vietnam. I'm a Self-taught SysAdmin with a deep passion for cloud infrastructure and operational efficiency.",
    "With over 10 years of experience in Logistics & Operations (Viettel Post, MWG), I've transitioned into the tech world during a personal break to care for my father. This period has become my \"intensive lab,\" where I've mastered the art of bridging real-world operations with modern technology.",
  ],
  aboutQuote:
    "I don't just write code; I build systems that solve real business problems using the core principles:",
  aboutPrinciples: "Fast, Accurate, Convenient, Safe, and Cost-optimized.",
  aboutSubquote:
    "Whether it's Docker orchestration, n8n automation, or self-hosted networking - I focus on stability and performance.",
  aboutFootnote:
    "// talk is cheap, actions speak louder. scroll down to see my stack!",
  skillsTitle: "Skills & Tools",
  competencies: [
    "Automation & Workflows",
    "Infrastructure & Virtualization",
    "Networking",
    "System Optimization",
    "Database Management",
    "Logistics Operations & Optimization",
  ],
  tools: [
    "Python",
    "Proxmox",
    "ERPNext",
    "Ubuntu",
    "Git",
    "MongoDB",
    "Frappe",
    "Docker",
    "n8n",
    "Wireguard",
  ],
  faviconUrl: "/favicon.png",
  metaTitle: "Thái Duy | Self-taught SysAdmin & Infrastructure lover",
  metaDescription:
    "Thái Duy is a SysAdmin and Automation expert from Vietnam, specializing in self-hosted infrastructure, Docker, n8n workflows, and logistics operations optimization.",
  metaKeywords: [
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
  authorName: "Thái Duy",
  siteUrl: "https://portfolio.thaiduy.digital",
  ogTitle: "Thái Duy | Self-taught SysAdmin & Infrastructure lover",
  ogDescription:
    "Explore the portfolio of Thái Duy, focusing on system administration, infrastructure, and business automation. Expert in n8n, Docker, and Logistics-driven tech solutions.",
  ogImage: "/hero.png",
  twitterTitle: "Thái Duy | SysAdmin & Automation Expert",
  twitterDescription:
    "Specializing in infrastructure, self-hosted services, and logistics optimization through automation.",
};

type SiteSettingsInput = Partial<Omit<SiteSettings, "downloadCvUrl">> & {
  downloadCvUrl?: string | null;
};

const asStringArray = (value: unknown, fallback: string[]) => {
  if (!Array.isArray(value)) return fallback;

  const cleaned = value
    .map((item) => String(item).trim())
    .filter((item) => item.length > 0);

  return cleaned.length ? cleaned : fallback;
};

export const normalizeSiteSettings = (
  value: SiteSettingsInput | null | undefined,
): SiteSettings => ({
  ...DEFAULT_SITE_SETTINGS,
  ...value,
  id: SITE_SETTINGS_ID,
  downloadCvUrl:
    value?.downloadCvUrl?.trim() || DEFAULT_SITE_SETTINGS.downloadCvUrl,
  aboutParagraphs: asStringArray(
    value?.aboutParagraphs,
    DEFAULT_SITE_SETTINGS.aboutParagraphs,
  ),
  competencies: asStringArray(
    value?.competencies,
    DEFAULT_SITE_SETTINGS.competencies,
  ),
  tools: asStringArray(value?.tools, DEFAULT_SITE_SETTINGS.tools),
  metaKeywords: asStringArray(
    value?.metaKeywords,
    DEFAULT_SITE_SETTINGS.metaKeywords,
  ),
});

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: SITE_SETTINGS_ID },
    });

    return normalizeSiteSettings(settings);
  } catch (error) {
    console.error("Failed to load site settings:", error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export function resolvePublicUrl(value: string, baseUrl: string) {
  if (!value) return value;
  if (/^https?:\/\//i.test(value)) return value;

  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;

  return `${normalizedBase}${normalizedPath}`;
}
