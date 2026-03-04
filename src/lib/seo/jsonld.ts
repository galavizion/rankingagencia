// src/lib/seo/jsonld.ts
type Img = string | null | undefined;

const clean = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const buildOrgSchema = (siteUrl: string) =>
  clean({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ranking Agencia",
    url: siteUrl,
    description: "SEO y Publicidad Digital enfocados en generar ventas.",
  });

export const buildBreadcrumb = (siteUrl: string, items: { name: string; url: string }[]) =>
  clean({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${siteUrl}${it.url}`,
    })),
  });

export const buildServiceSchema = (args: {
  siteUrl: string;
  name: string;
  description?: string;
  url: string;
  image?: Img;
  price?: number | null;
  priceCurrency?: string; // "MXN"
}) =>
  clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: args.url.startsWith("http") ? args.url : `${args.siteUrl}${args.url}`,
    image: args.image || undefined,
    provider: {
      "@type": "Organization",
      name: "Ranking Agencia",
      url: args.siteUrl,
    },
    offers:
      args.price != null
        ? {
            "@type": "Offer",
            priceCurrency: args.priceCurrency || "MXN",
            price: args.price,
            url: args.url.startsWith("http") ? args.url : `${args.siteUrl}${args.url}`,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  });

export const buildProductSchema = (args: {
  siteUrl: string;
  name: string;
  description?: string;
  url: string;
  image?: Img;
  price?: number | null;
  priceCurrency?: string; // "MXN"
  sku?: string;
  brand?: string; // "Ranking Agencia"
}) =>
  clean({
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    image: args.image ? [args.image] : undefined,
    sku: args.sku,
    brand: args.brand
      ? { "@type": "Brand", name: args.brand }
      : { "@type": "Brand", name: "Ranking Agencia" },
    offers:
      args.price != null
        ? {
            "@type": "Offer",
            priceCurrency: args.priceCurrency || "MXN",
            price: args.price,
            url: args.url.startsWith("http") ? args.url : `${args.siteUrl}${args.url}`,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  });

export const buildArticleSchema = (args: {
  siteUrl: string;
  headline: string;
  description?: string;
  url: string;
  image?: Img;
  datePublished?: string;
  dateModified?: string;
}) =>
  clean({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    mainEntityOfPage: args.url.startsWith("http") ? args.url : `${args.siteUrl}${args.url}`,
    image: args.image ? [args.image] : undefined,
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    author: {
      "@type": "Organization",
      name: "Ranking Agencia",
      url: args.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ranking Agencia",
      url: args.siteUrl,
    },
  });