import { useEffect } from "react";

export type SeoRouteKey =
  | "home"
  | "mini-led-clock-red"
  | "jumbo-led-clock"
  | "calendar-clock";

type SeoConfig = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  jsonLd: Record<string, unknown>;
};

const defaultJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "B.R. Electronics (Brim Clocks)",
  "url": "https://brimclocks.com/",
  "telephone": "+919445887243",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "14/20 Ranganathan Street, Ganesh Nagar",
    "addressLocality": "Velachery",
    "addressRegion": "Chennai",
    "postalCode": "600042",
    "addressCountry": "IN",
  },
};

const seoConfigs: Record<SeoRouteKey, SeoConfig> = {
  home: {
    title: "LED Digital Clock Manufacturer Chennai | Buy Wall Clocks Online | Brim Clocks",
    description:
      "Direct from manufacturer: buy LED digital clocks in Chennai. Industrial wall displays, GPS clocks, calendar clocks, and token systems from Brim Clocks.",
    keywords:
      "LED clock manufacturer Chennai, digital clock online, buy clock Chennai, LED digital clock wall, red matrix clock, industrial clock India, Brim Clocks Velachery, bank token display system",
    canonical: "https://brimclocks.com/",
    ogTitle: "Brim Clocks - Premium LED Digital Manufacturer Chennai",
    ogDescription:
      "Need 7-segment or matrix displays? Buy direct from the leading manufacturer in Velachery, Chennai.",
    ogUrl: "https://brimclocks.com/",
    ogType: "website",
    jsonLd: defaultJsonLd,
  },
  "mini-led-clock-red": {
    title: "Mini LED Digital Clock (Red) Chennai | Buy LED Wall Clock Online",
    description:
      "Buy the Mini LED Digital Clock (Red) in Chennai for homes, offices, and executive cabins. Compact, readable, and backed by a 1-year guarantee.",
    keywords:
      "mini LED digital clock red Chennai, buy mini LED wall clock online, compact digital clock Chennai, 7-segment LED clock",
    canonical: "https://brimclocks.com/mini-led-clock-red",
    ogTitle: "Mini LED Digital Clock (Red) - Brim Clocks Chennai",
    ogDescription:
      "Compact LED digital clock for homes, offices, and executive cabins in Chennai.",
    ogUrl: "https://brimclocks.com/mini-led-clock-red",
    ogType: "product",
    jsonLd: {
      ...defaultJsonLd,
      "@type": "Product",
      name: "Mini LED Digital Clock (Red)",
      description:
        "Compact LED digital clock designed for homes, offices, and executive cabins in Chennai.",
      category: "Digital Wall Clock",
      url: "https://brimclocks.com/mini-led-clock-red",
    },
  },
  "jumbo-led-clock": {
    title: "Jumbo LED Clock Chennai | Industrial Digital Clock Manufacturer",
    description:
      "Shop the Jumbo LED Clock in Chennai for schools, colleges, factories, warehouses, temples, churches, and mosques. Built for large halls and long visibility.",
    keywords:
      "jumbo LED clock Chennai, industrial LED clock manufacturer, large hall digital clock, school factory warehouse clock",
    canonical: "https://brimclocks.com/jumbo-led-clock",
    ogTitle: "Jumbo LED Clock - Brim Clocks Chennai",
    ogDescription:
      "Large-format industrial LED clock for schools, factories, halls, and public spaces in Chennai.",
    ogUrl: "https://brimclocks.com/jumbo-led-clock",
    ogType: "product",
    jsonLd: {
      ...defaultJsonLd,
      "@type": "Product",
      name: "Jumbo LED Clock",
      description:
        "Large-format industrial LED clock suited for schools, factories, halls, and public spaces in Chennai.",
      category: "Industrial Clock",
      url: "https://brimclocks.com/jumbo-led-clock",
    },
  },
  "calendar-clock": {
    title: "Digital Calendar Clock Chennai | LED Date and Time Display",
    description:
      "Buy a digital calendar clock in Chennai for homes, shops, offices, and executive cabins. Clear date and time visibility with dependable performance.",
    keywords:
      "digital calendar clock Chennai, date and time display clock, LED calendar clock online, office calendar clock",
    canonical: "https://brimclocks.com/calendar-clock",
    ogTitle: "Digital Calendar Clock - Brim Clocks Chennai",
    ogDescription:
      "Clear digital calendar clock for homes, offices, and executive cabins in Chennai.",
    ogUrl: "https://brimclocks.com/calendar-clock",
    ogType: "product",
    jsonLd: {
      ...defaultJsonLd,
      "@type": "Product",
      name: "Digital Calendar Clock",
      description:
        "LED calendar clock with clear date and time display for homes, shops, offices, and executive cabins.",
      category: "Calendar Clock",
      url: "https://brimclocks.com/calendar-clock",
    },
  },
};

const setMetaTag = (name: string, content: string, attr: "name" | "property" = "name") => {
  let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.content = content;
};

const setCanonicalLink = (href: string) => {
  let element = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
};

export const useSeo = (routeKey: SeoRouteKey) => {
  useEffect(() => {
    const config = seoConfigs[routeKey] ?? seoConfigs.home;

    document.title = config.title;
    setMetaTag("description", config.description);
    setMetaTag("keywords", config.keywords);
    setMetaTag("robots", "index, follow, max-image-preview:large");
    setMetaTag("og:title", config.ogTitle, "property");
    setMetaTag("og:description", config.ogDescription, "property");
    setMetaTag("og:url", config.ogUrl, "property");
    setMetaTag("og:type", config.ogType, "property");
    setMetaTag("twitter:title", config.ogTitle);
    setMetaTag("twitter:description", config.ogDescription);
    setCanonicalLink(config.canonical);

    const existingScript = document.querySelector('script[data-seo-jsonld="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-jsonld", "true");
    script.textContent = JSON.stringify(config.jsonLd);
    document.head.appendChild(script);

    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [routeKey]);
};

export const getSeoConfig = (routeKey: SeoRouteKey) => seoConfigs[routeKey] ?? seoConfigs.home;
