import { defineType, defineField } from "sanity";

export const pageDocument = defineType({
  name: "page",
  title: "Páginas",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "pageType",
      title: "Tipo de página",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Servicio", value: "service" },
          { title: "Landing", value: "landing" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      hidden: ({ document }) => document?.pageType === "home",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "sections",
      title: "Secciones",
      type: "array",
      of: [
        { type: "sectionHero" },
        { type: "sectionBenefits" },
        { type: "sectionProcess" },
        { type: "sectionFAQ" },
        { type: "sectionCTA" },
        { type: "sectionContentSplit" },
        { type: "sectionRichText" },
        { type: "sectionCards" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageType" },
  },
});
