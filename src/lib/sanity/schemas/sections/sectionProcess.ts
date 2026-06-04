import { defineType, defineField } from "sanity";

export const sectionProcess = defineType({
  name: "sectionProcess",
  title: "Proceso",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "steps",
      title: "Pasos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título del paso", type: "string" }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            defineField({ name: "icon", title: "Ícono (emoji o texto)", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
