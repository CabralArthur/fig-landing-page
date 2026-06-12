import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const cairoliFig = localFont({
  src: "../public/fonts/CairoliNowCondensed-HeavyItalic.ttf",
  variable: "--font-fig",
  weight: "900",
  style: "italic",
  display: "block",
  preload: true,
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const ogImage = {
  url: siteConfig.images.og,
  width: 1200,
  height: 630,
  alt: siteConfig.og.imageAlt,
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortTitle}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.instagram }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.legalName,
  category: "music",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.legalName,
    title: siteConfig.og.title,
    description: siteConfig.og.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.og.title,
    description: siteConfig.og.description,
    images: [siteConfig.images.og],
  },
  other: {
    "geo.region": siteConfig.location.regionCode,
    "geo.placename": siteConfig.location.city,
    "geo.position": "-8.0476;-34.8770",
    ICBM: "-8.0476, -34.8770",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#001533" },
    { media: "(prefers-color-scheme: light)", color: "#001533" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${dmSans.variable} ${cairoliFig.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
