import { contactLinks, spotifyLinks } from "@/lib/data";
import { siteConfig, siteUrl } from "@/lib/site";

export function JsonLd() {
  const ogImage = `${siteUrl}${siteConfig.images.og}`;
  const bannerImage = `${siteUrl}${siteConfig.images.banner}`;
  const logoImage = `${siteUrl}${siteConfig.images.logo}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.legalName,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage: siteConfig.language,
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        jobTitle: "DJ",
        description: siteConfig.description,
        url: siteUrl,
        image: bannerImage,
        logo: { "@type": "ImageObject", url: logoImage },
        sameAs: [contactLinks.instagram, contactLinks.whatsapp],
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.countryCode,
        },
      },
      {
        "@type": "MusicGroup",
        "@id": `${siteUrl}/#musicgroup`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteUrl,
        image: ogImage,
        genre: ["Open Format", "Funk", "Eletrônica", "Eletrofunk"],
        sameAs: [contactLinks.instagram, spotifyLinks.funkToYou],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#booking`,
        name: `Booking — ${siteConfig.name}`,
        description: siteConfig.og.description,
        url: `${siteUrl}/#booking`,
        provider: { "@id": `${siteUrl}/#person` },
        areaServed: siteConfig.location.countryCode,
        serviceType: "DJ para eventos",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
