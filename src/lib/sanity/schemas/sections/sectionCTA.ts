import { defineType, defineField } from "sanity";

export const sectionCTA = defineType({
  name: "sectionCTA",
  title: "Llamada a la Acción",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({ name: "primaryCta", title: "CTA Principal", type: "cta" }),
    defineField({ name: "secondaryCta", title: "CTA Secundario", type: "cta" }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title ?? "CTA", subtitle: "Sección CTA" }),
  },
});
