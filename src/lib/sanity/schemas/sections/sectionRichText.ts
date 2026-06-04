import { defineType, defineField } from "sanity";

export const sectionRichText = defineType({
  name: "sectionRichText",
  title: "Texto Enriquecido",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "content",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
        },
      ],
    }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title ?? "Texto", subtitle: "Sección Texto Enriquecido" }),
  },
});
