import { defineType, defineField } from "sanity";

export const sectionHero = defineType({
  name: "sectionHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Título principal", type: "string" }),
    defineField({ name: "subheading", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "bullets",
      title: "Puntos clave",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({ name: "primaryCta", title: "CTA Principal", type: "cta" }),
    defineField({ name: "secondaryCta", title: "CTA Secundario", type: "cta" }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title ?? "Hero", subtitle: "Sección Hero" }),
  },
});
