import { defineType, defineField } from "sanity";

export const catalogItemDocument = defineType({
  name: "catalogItem",
  title: "Catálogo",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "excerpt", title: "Resumen", type: "text", rows: 3 }),
    defineField({ name: "category", title: "Categoría", type: "string" }),
    defineField({
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Descripción completa",
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
    defineField({ name: "price", title: "Precio (número)", type: "number" }),
    defineField({ name: "priceLabel", title: "Precio (texto)", type: "string", description: 'Ej: "Desde $2,500 MXN"' }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Activar botón WhatsApp", type: "boolean", initialValue: false }),
        defineField({ name: "phone", title: "Número (con código de país)", type: "string", description: "Ej: 528112345678" }),
        defineField({ name: "message", title: "Mensaje predefinido", type: "text", rows: 2 }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
