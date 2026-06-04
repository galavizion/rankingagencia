import { defineType, defineField } from "sanity";

export const sectionBenefits = defineType({
  name: "sectionBenefits",
  title: "Beneficios",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Elementos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            defineField({ name: "highlight", title: "Etiqueta destacada", type: "string" }),
            defineField({
              name: "icon",
              title: "Ícono",
              type: "string",
              description: "Clave: seo, sem, redes, web, analytics, cro",
              options: {
                list: [
                  { title: "SEO ↗", value: "seo" },
                  { title: "SEM ◎", value: "sem" },
                  { title: "Redes ✦", value: "redes" },
                  { title: "Web ⌁", value: "web" },
                  { title: "Analytics ◷", value: "analytics" },
                  { title: "CRO ◉", value: "cro" },
                ],
              },
            }),
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
