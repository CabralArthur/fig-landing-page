export const contactLinks = {
  whatsapp: "https://wa.me/5585999312729",
  instagram: "https://www.instagram.com/figuermenezes/",
  email: "mailto:canaldomenezes@gmail.com",
};

export const spotifyLinks = {
  funkToYou:
    "https://open.spotify.com/search/Funk%20To%20You%20FIG",
};

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", href: contactLinks.instagram },
  { id: "spotify", label: "Spotify", href: spotifyLinks.funkToYou },
  { id: "whatsapp", label: "WhatsApp", href: contactLinks.whatsapp },
  { id: "email", label: "E-mail", href: contactLinks.email },
];

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Música",
    links: [
      { label: "Funk To You", href: spotifyLinks.funkToYou, external: true },
      { label: "Spotify", href: spotifyLinks.funkToYou, external: true },
      { label: "Estilos", href: "#estilos" },
    ],
  },
  {
    title: "Vídeos",
    links: [
      { label: "FIG On Stage", href: "#videos" },
      { label: "Cidades", href: "#cidades" },
    ],
  },
  {
    title: "Booking",
    links: [
      { label: "Contratar", href: "#booking" },
      { label: "WhatsApp", href: contactLinks.whatsapp, external: true },
      { label: "E-mail", href: contactLinks.email, external: true },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Instagram", href: contactLinks.instagram, external: true },
      { label: "E-mail", href: contactLinks.email, external: true },
    ],
  },
];

export const bookingCtas = [
  {
    id: "whatsapp",
    label: "Fale no WhatsApp",
    title: "BOOKING",
    href: contactLinks.whatsapp,
  },
  {
    id: "email",
    label: "Enviar e-mail",
    title: "CONTATO",
    href: contactLinks.email,
  },
];

export interface ActionLink {
  label: string;
  href: string;
  external?: boolean;
}

export const actionLinks: ActionLink[] = [
  { label: "Ouvir", href: "#musica" },
  { label: "Vídeos", href: "#videos" },
  { label: "Booking", href: "#booking" },
];

export const featuredTrack = {
  title: "Funk To You",
  artist: "FIG",
  platform: "Spotify",
  cover: "/images/banner-funk-to-you.png",
  href: spotifyLinks.funkToYou,
};

export interface StageVideo {
  id: string;
  title: string;
  city: string;
  caption: string;
  poster: string;
  video?: string;
}

export const aboutFig = {
  title: "Quem é FIG",
  description:
    "DJ open format do Brasil. FIG mistura estilos, lê a pista e conduz cada set com energia de clube e precisão de pista cheia — do warm-up ao pico, sem fórmula.",
  image: "/images/fig.png",
};

export interface PlayGenre {
  id: string;
  name: string;
  description: string;
}

export const playGenres: PlayGenre[] = [
  {
    id: "eletronica",
    name: "Eletrônica",
    description:
      "Sintetizadores, builds e drops que levam a pista do clima ao pico com precisão e impacto.",
  },
  {
    id: "funk",
    name: "Funk",
    description:
      "Groove brasileiro na veia — batida que não para e energia de pista do começo ao fim.",
  },
  {
    id: "brazilian-rhythms",
    name: "Brazilian Rhythms",
    description:
      "Ritmos do Brasil misturados no set: swing, percussão e identidade que só a pista entende.",
  },
  {
    id: "eletrofunk",
    name: "Eletrofunk",
    description:
      "Fusão de eletrônico e funk — o som que conecta club, baile e pista em alta voltagem.",
  },
];

export interface PlayedCity {
  id: string;
  city: string;
  detail?: string;
}

export const playedCities: PlayedCity[] = [
  { id: "belem", city: "Belém" },
  { id: "recife", city: "Recife" },
  { id: "joao-pessoa", city: "João Pessoa" },
  { id: "fortaleza", city: "Fortaleza", detail: "várias festas" },
  { id: "sao-luis", city: "São Luís" },
  { id: "sao-paulo", city: "São Paulo", detail: "Vila JK" },
];

export const stageVideos: StageVideo[] = [
  {
    id: "1",
    title: "FIG Live",
    city: "Open format",
    caption: "Energia de pista em tempo real",
    poster: "/videos/posters/video-fig-1.jpg",
    video: "/videos/video-fig-1.mp4",
  },
  {
    id: "2",
    title: "FIG Live",
    city: "Open format",
    caption: "Groove e presença de palco",
    poster: "/videos/posters/video-fig-2.jpg",
    video: "/videos/video-fig-2.mp4",
  },
  {
    id: "3",
    title: "FIG Live",
    city: "Open format",
    caption: "Momento do set",
    poster: "/videos/posters/video-fig-3.jpg",
    video: "/videos/video-fig-3.mp4",
  },
  {
    id: "4",
    title: "FIG Live",
    city: "Open format",
    caption: "Da pista ao pico",
    poster: "/videos/posters/video-fig-4.jpg",
    video: "/videos/video-fig-4.mp4",
  },
  {
    id: "5",
    title: "FIG Live",
    city: "Open format",
    caption: "Set ao vivo",
    poster: "/videos/posters/video-fig-5.jpg",
    video: "/videos/video-fig-5.mp4",
  },
  {
    id: "6",
    title: "FIG Live",
    city: "Open format",
    caption: "FIG on stage",
    poster: "/videos/posters/video-fig-6.jpg",
    video: "/videos/video-fig-6.mp4",
  },
];
