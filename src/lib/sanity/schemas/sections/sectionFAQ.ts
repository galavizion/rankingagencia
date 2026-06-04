import { defineType, defineField } from "sanity";

export const sectionFAQ = defineType({
  name: "sectionFAQ",
  title: "Preguntas Frecuentes",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "faqs",
      title: "Preguntas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Pregunta", type: "string" }),
            defineField({
              name: "answer",
              title: "Respuesta",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title ?? "FAQ", subtitle: "Sección FAQ" }),
  },
});
