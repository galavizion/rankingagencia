import { defineType, defineField } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Artículo (Post)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "excerpt",
      title: "Resumen",
      type: "text",
    }),
  ],
});
