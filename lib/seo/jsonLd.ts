/**
 * JSON-LD schemas pour Zen Lounge.
 *
 * NOTE : Les valeurs marquées TODO sont des placeholders à compléter par
 * Vizion Web / la cliente (adresse exacte, horaires, téléphone, géoloc).
 * Ces schémas sont injectés dans <head> via next/script et lus par Google,
 * Bing, ainsi que les moteurs IA (ChatGPT, Perplexity).
 */

const SITE_URL = "https://zenlounge-guyane.fr";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "Zen Lounge",
  alternateName: ["Zen Lounge Guyane", "JOWES"],
  legalName: "JOWES",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: [
    `${SITE_URL}/massage-1.jpg`,
    `${SITE_URL}/lounge-1.jpg`,
    `${SITE_URL}/spa-composition.png`,
  ],
  description:
    "Institut de bien-être à Matoury (Cayenne, Guyane). Massages relaxants et thérapeutiques, soins du visage et du corps, forfaits avantageux et séjours détente avec jacuzzi privé.",
  telephone: "+594694003935",
  email: "contact@zenlounge-guyane.com",
  vatID: "FR73821281334",
  taxID: "82128133400010",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "87 Les Hauts de la Chaumière",
    addressLocality: "Matoury",
    addressRegion: "Guyane française",
    postalCode: "97351",
    addressCountry: "GF",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 4.8516, // TODO ajuster avec la position GPS exacte si besoin
    longitude: -52.3501,
  },
  areaServed: [
    { "@type": "City", name: "Cayenne" },
    { "@type": "City", name: "Matoury" },
    { "@type": "City", name: "Rémire-Montjoly" },
    { "@type": "AdministrativeArea", name: "Guyane française" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00", // TODO confirmer
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://instagram.com/zenlounge",
    "https://www.facebook.com/odassenergyzen",
    "https://wa.me/594694003935",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations Zen Lounge",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Massages",
        url: `${SITE_URL}/massages`,
      },
      {
        "@type": "OfferCatalog",
        name: "Soins du corps & visage",
        url: `${SITE_URL}/soins`,
      },
      {
        "@type": "OfferCatalog",
        name: "Forfaits bien-être",
        url: `${SITE_URL}/forfaits`,
      },
    ],
  },
};

/**
 * Génère un FAQPage schema à partir d'un tableau {question, answer}.
 */
export function buildFaqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Génère un BreadcrumbList schema à partir d'un tableau ordonné.
 */
export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

type ServiceItem = {
  name: string;
  description: string;
  duration: number;
  price: number;
  imageUrl?: string;
  slug?: string;
};

/**
 * Génère un Service schema enrichi pour une catégorie (massages, soins,
 * forfaits) avec la liste des prestations et leurs offres.
 */
export function buildServiceJsonLd({
  categoryName,
  categoryDescription,
  url,
  items,
  aggregateRating,
}: {
  categoryName: string;
  categoryDescription: string;
  url: string;
  items: ServiceItem[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) {
  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: categoryName,
    name: categoryName,
    description: categoryDescription,
    url,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "City", name: "Cayenne" },
      { "@type": "City", name: "Matoury" },
      { "@type": "AdministrativeArea", name: "Guyane française" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: categoryName,
      itemListElement: items.map((item) => ({
        "@type": "Offer",
        priceCurrency: "EUR",
        price: item.price,
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          ...(item.imageUrl ? { image: `${SITE_URL}${item.imageUrl}` } : {}),
        },
      })),
    },
  };

  if (aggregateRating && aggregateRating.reviewCount > 0) {
    service.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue.toFixed(1),
      reviewCount: aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return service;
}

/**
 * Construit l'AggregateRating global du business à partir des avis.
 */
export function buildBusinessAggregateRating(
  reviews: { stars: number }[]
) {
  if (!reviews.length) return null;
  const total = reviews.reduce((sum, r) => sum + (r.stars || 0), 0);
  const ratingValue = total / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${SITE_URL}/#business` },
    ratingValue: ratingValue.toFixed(1),
    reviewCount: reviews.length,
    bestRating: "5",
    worstRating: "1",
  };
}
