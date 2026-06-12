import type { Metadata } from "next";
import { SiteExperience } from "@/components/SiteExperience";
import { siteConfig, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteUrl,
    title: siteConfig.og.title,
    description: siteConfig.og.description,
    images: [
      {
        url: siteConfig.images.og,
        width: 1200,
        height: 630,
        alt: siteConfig.og.imageAlt,
      },
    ],
  },
};

export default function Home() {
  return <SiteExperience />;
}
