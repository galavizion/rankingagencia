import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  name: "default",
  title: "Studio",

  projectId: "e6n3tgu1",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: [], // Añade tus esquemas aquí
  },
});
