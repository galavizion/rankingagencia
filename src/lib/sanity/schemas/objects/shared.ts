import { defineType, defineField } from "sanity";

export const ctaObject = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texto", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
  ],
});

export const seoObject = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título SEO", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
    defineField({ name: "canonical", title: "URL Canónica", type: "url" }),
    defineField({ name: "noindex", title: "No indexar", type: "boolean", initialValue: false }),
    defineField({
      name: "ogImage",
      title: "Imagen OG",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const sectionSettingsObject = defineType({
  name: "sectionSettings",
  title: "Configuración de Sección",
  type: "object",
  fields: [
    defineField({
      name: "theme",
      title: "Tema",
      type: "string",
      options: {
        list: [
          { title: "Oscuro (transparent)", value: "transparent" },
          { title: "Claro (light)", value: "light" },
        ],
        layout: "radio",
      },
      initialValue: "transparent",
    }),
    defineField({
      name: "id",
      title: "ID de ancla (para navegación)",
      type: "string",
      description: 'Ej: "servicios", "contacto". Sirve para links tipo /#servicios',
    }),
  ],
});

export const navItemObject = defineType({
  name: "navItem",
  title: "Elemento de navegación",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Etiqueta", type: "string" }),
    defineField({
      name: "type",
      title: "Tipo de enlace",
      type: "string",
      options: {
        list: [
          { title: "Página interna", value: "internal" },
          { title: "URL externa", value: "external" },
          { title: "Ancla (#id)", value: "anchor" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "anchorId", title: "ID de ancla", type: "string" }),
    defineField({ name: "externalUrl", title: "URL externa", type: "url" }),
    defineField({
      name: "internalPage",
      title: "Página interna",
      type: "reference",
      to: [{ type: "page" }],
    }),
    defineField({
      name: "children",
      title: "Submenú",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etiqueta", type: "string" }),
            defineField({
              name: "type",
              title: "Tipo",
              type: "string",
              options: {
                list: [
                  { title: "Interna", value: "internal" },
                  { title: "Externa", value: "external" },
                  { title: "Ancla", value: "anchor" },
                ],
              },
            }),
            defineField({ name: "anchorId", title: "ID ancla", type: "string" }),
            defineField({ name: "externalUrl", title: "URL externa", type: "url" }),
            defineField({
              name: "internalPage",
              title: "Página",
              type: "reference",
              to: [{ type: "page" }],
            }),
          ],
        },
      ],
    }),
  ],
});
