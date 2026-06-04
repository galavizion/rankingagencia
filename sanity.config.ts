import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  ctaObject,
  seoObject,
  sectionSettingsObject,
  navItemObject,
  sectionHero,
  sectionBenefits,
  sectionProcess,
  sectionFAQ,
  sectionCTA,
  sectionContentSplit,
  sectionRichText,
  sectionCards,
  // Documents
  pageDocument,
  postDocument,
  catalogItemDocument,
  siteSettingsDocument,
} from "./src/lib/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Ranking Agencia",

  projectId: "e6n3tgu1",
  dataset: "dev",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Configuración del Sitio")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("page").title("Páginas"),
            S.documentTypeListItem("post").title("Blog"),
            S.documentTypeListItem("catalogItem").title("Catálogo"),
          ]),
    }),
  ],

  schema: {
    types: [
      // Shared objects
      ctaObject,
      seoObject,
      sectionSettingsObject,
      navItemObject,
      // Sections
      sectionHero,
      sectionBenefits,
      sectionProcess,
      sectionFAQ,
      sectionCTA,
      sectionContentSplit,
      sectionRichText,
      sectionCards,
      // Documents
      pageDocument,
      postDocument,
      catalogItemDocument,
      siteSettingsDocument,
    ],
  },
});
