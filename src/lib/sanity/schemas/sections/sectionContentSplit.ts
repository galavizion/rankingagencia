import { defineType, defineField } from "sanity";

export const sectionContentSplit = defineType({
  name: "sectionContentSplit",
  title: "Contenido con Imagen",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "layout",
      title: "Diseño",
      type: "string",
      options: {
        list: [
          { title: "Dividido (texto + imagen)", value: "split" },
          { title: "Solo texto (ancho completo)", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "split",
    }),
    defineField({
      name: "imageSide",
      title: "Lado de la imagen",
      type: "string",
      options: {
        list: [
          { title: "Izquierda", value: "left" },
          { title: "Derecha", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
      hidden: ({ parent }) => parent?.layout !== "split",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
      hidden: ({ parent }) => parent?.layout !== "split",
    }),
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
    defineField({ name: "sectionId", title: "ID de ancla", type: "string" }),
    defineField({ name: "settings", title: "Configuración", type: "sectionSettings" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
