import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact | Thái Duy Portfolio",
  description:
    "Get in touch with Thái Duy, a full-stack developer specializing in Python, Go, React, and modern web technologies. Let’s discuss projects, collaborations, or opportunities.",
  openGraph: {
    title: "Contact | Thái Duy Portfolio",
    description:
      "Reach out to Thái Duy, a full-stack developer experienced in backend and frontend development with modern frameworks and tools.",
    url: "https://thaiduy.store/contact",
    siteName: "Thái Duy Portfolio",
    locale: "en_VI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Thái Duy Portfolio",
    description:
      "Contact Thái Duy, full-stack developer skilled in Python, Go, React, and cloud technologies.",
    creator: "@thaiduy",
  },
};

async function Contact() {
  redirect("/#contact");
}
export default Contact;
