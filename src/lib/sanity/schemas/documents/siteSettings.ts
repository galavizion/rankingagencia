import { defineType, defineField } from "sanity";

export const siteSettingsDocument = defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Nombre del sitio", type: "string" }),
    defineField({ name: "siteUrl", title: "URL del sitio", type: "url" }),
    defineField({ name: "defaultTitle", title: "Título por defecto", type: "string" }),
    defineField({ name: "defaultDescription", title: "Descripción por defecto", type: "text", rows: 3 }),
    defineField({
      name: "defaultOgImage",
      title: "Imagen OG por defecto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "analyticsId", title: "Google Analytics ID", type: "string" }),
    defineField({ name: "tagManagerId", title: "Google Tag Manager ID", type: "string" }),
    defineField({ name: "adsenseClient", title: "AdSense Client ID", type: "string" }),
    defineField({ name: "searchConsoleVerification", title: "Search Console Verification", type: "string" }),
    defineField({
      name: "cta",
      title: "CTA global (header)",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto", type: "string" }),
        defineField({ name: "url", title: "URL", type: "string" }),
      ],
    }),
    defineField({
      name: "organization",
      title: "Organización (Schema.org)",
      type: "object",
      fields: [
        defineField({ name: "phone", title: "Teléfono", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({
          name: "sameAs",
          title: "Perfiles sociales (URLs)",
          type: "array",
          of: [{ type: "url" }],
        }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navegación",
      type: "array",
      of: [{ type: "navItem" }],
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare: ({ title }) => ({ title: title ?? "Configuración del Sitio" }),
  },
});
