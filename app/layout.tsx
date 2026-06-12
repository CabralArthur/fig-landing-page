import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://figdj.com"),
  title: "FIG | DJ Open Format",
  description:
    "FIG — DJ Open Format do Brasil. Sets ao vivo, eventos e contratações.",
  openGraph: {
    title: "FIG | DJ Open Format",
    description: "O set é agora. Open format — de verdade.",
    images: ["/images/banner.png"],
  },
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
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
