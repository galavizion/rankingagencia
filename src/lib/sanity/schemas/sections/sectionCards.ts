import { defineType, defineField } from "sanity";

export const sectionCards = defineType({
  name: "sectionCards",
  title: "Tarjetas (Cards)",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "text", rows: 2 }),
    defineField({
      name: "columns",
      title: "Columnas",
      type: "number",
      options: {
        list: [
          { title: "2 columnas", value: 2 },
          { title: "3 columnas", value: 3 },
          { title: "4 columnas", value: 4 },
          { title: "6 columnas", value: 6 },
          { title: "12 columnas (logos)", value: 12 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: "cardStyle",
      title: "Estilo de tarjeta",
      type: "string",
      options: {
        list: [
          { title: "Sombra", value: "shadow" },
          { title: "Borde", value: "outline" },
          { title: "Relleno", value: "filled" },
          { title: "Minimal", value: "minimal" },
          { title: "Circular (avatares/logos)", value: "circular" },
        ],
        layout: "radio",
      },
      initialValue: "shadow",
    }),
    defineField({
      name: "textAlign",
      title: "Alineación de texto",
      type: "string",
      options: {
        list: [
          { title: "Izquierda", value: "left" },
          { title: "Centro", value: "center" },
          { title: "Derecha", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
    }),
    defineField({
      name: "bgColor",
      title: "Color de fondo",
      type: "string",
      description: 'Ej: "#ffffff", "#000000", "none". Dejar vacío para heredar.',
    }),
    defineField({
      name: "items",
      title: "Tarjetas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Etiqueta (badge)", type: "string" }),
            defineField({
              name: "image",
              title: "Imagen",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
            }),
            defineField({ name: "title", title: "Título", type: "string" }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
            defineField({ name: "linkLabel", title: "Texto del enlace", type: "string" }),
            defineField({ name: "linkUrl", title: "URL del enlace", type: "string" }),
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "image" },
          },
        },
      ],
    }),
    defineField({ name: "cta", title: "CTA al pie", type: "cta" }),
    defineField({
      name: "settings",
      title: "Configuración",
      type: "object",
      fields: [
        defineField({ name: "sectionId", title: "ID de ancla", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
