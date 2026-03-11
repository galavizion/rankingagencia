// src/lib/sanity/queries.ts
import groq from "groq";

// ✅ Home (único)
export const homeQuery = groq`
*[_type=="page" && pageType=="home"][0]{
  title,
  pageType,
  sections[]{
    _key,
    _type,

    _type == "sectionHero" => {
      heading,
      subheading,
      bullets,
      image,
      primaryCta,
      secondaryCta,
      settings
    },

_type == "sectionBenefits" => {
      title,
      subtitle,
      items[]{
        title,
        description,
        highlight,
        icon
      },
      settings
    },

_type == "sectionProcess" => {
      title,
      subtitle,
      steps[]{
        title,
        description,
        icon
      },
      settings
    },

  _type == "sectionFAQ" => {
      title,
      subtitle,
      faqs[]{
        question,
        answer
      },
      settings
    },

_type == "sectionCTA" => {
      title,
      subtitle,
      primaryCta,
      secondaryCta,
      settings
    },
    _type == "sectionContentSplit" => {
  sectionId,
  title,
  layout,
  imageSide,
  image,
  content,
  settings
},

    _type == "sectionRichText" => {
      title,
      content,
      settings
    }
  }
}
`;

// ✅ Cualquier página por slug (service/landing)
export const pageBySlugQuery = groq`
*[_type=="page" && slug.current==$slug][0]{
  title,
  pageType,
  "slug": slug.current,
  sections[]{
    _key,
    _type,

    _type == "sectionHero" => {
      heading,
      subheading,
      bullets,
      image,
      primaryCta,
      secondaryCta,
      settings
    },

    _type == "sectionBenefits" => {
      title,
      subtitle,
      items[]{
        title,
        description,
        highlight,
        icon
      },
      settings
    },

    _type == "sectionProcess" => {
      title,
      subtitle,
      steps[]{
        title,
        description,
        icon
      },
      settings
    },

    _type == "sectionFAQ" => {
      title,
      subtitle,
      faqs[]{
        question,
        answer
      },
      settings
    },

    _type == "sectionCTA" => {
      title,
      subtitle,
      primaryCta,
      secondaryCta,
      settings
    },
_type == "sectionContentSplit" => {
  sectionId,
  title,
  layout,
  imageSide,
  image,
  content,
  settings
},
    _type == "sectionRichText" => {
      title,
      content,
      settings
    }
  }
}
`;

// ✅ Slugs para prerender (solo service/landing)
export const allPageSlugsQuery = groq`
*[_type=="page" && pageType in ["service","landing"] && defined(slug.current)][]{
  "slug": slug.current,
  pageType
}
`;

export const CATALOG_LIST = groq`
*[_type == "catalogItem" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  coverImage,
  price,
  priceLabel,
  whatsapp{
    enabled,
    phone,
    message
  }
}
`;

export const CATALOG_BY_SLUG = groq`
*[_type == "catalogItem" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  coverImage,
  body,
 price,
  priceLabel,
  whatsapp{
    enabled,
    phone,
    message
  }
}
`;