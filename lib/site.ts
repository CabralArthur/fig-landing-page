export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://figuermenezes.com";

export const siteConfig = {
  name: "FIG",
  legalName: "FIG — DJ Open Format",
  title: "FIG | DJ Open Format",
  shortTitle: "FIG",
  tagline: "O set é agora. Open format — de verdade.",
  description:
    "FIG é DJ open format do Brasil. Sets ao vivo para clubes, festivais, casamentos e eventos corporativos. Funk, eletrônica, ritmos brasileiros e eletrofunk com energia de pista cheia. Contrate para booking em Recife, Pernambuco e todo o Brasil.",
  og: {
    title: "FIG — DJ Open Format",
    description:
      "Contrate FIG para o seu evento. Sets open format com funk, eletrônica e eletrofunk — clubes, festivais e eventos privados.",
    imageAlt: "FIG — DJ Open Format ao vivo",
  },
  keywords: [
    "FIG",
    "DJ FIG",
    "FIG DJ",
    "DJ open format",
    "DJ Brasil",
    "DJ Recife",
    "DJ Pernambuco",
    "contratar DJ",
    "booking DJ",
    "DJ para festa",
    "DJ para casamento",
    "DJ para evento corporativo",
    "funk",
    "eletrônica",
    "eletrofunk",
    "sets ao vivo",
    "Funk To You",
  ],
  locale: "pt_BR",
  language: "pt-BR",
  location: {
    city: "Recife",
    region: "Pernambuco",
    country: "Brasil",
    countryCode: "BR",
    regionCode: "BR-PE",
  },
  instagram: "https://www.instagram.com/figuermenezes/",
  email: "canaldomenezes@gmail.com",
  whatsapp: "+5585999312729",
  images: {
    og: "/images/og.jpg",
    banner: "/images/banner.png",
    logo: "/images/logo-fig.png",
  },
} as const;
