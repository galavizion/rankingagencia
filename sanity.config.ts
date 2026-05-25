import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postSchema } from "./src/lib/sanity/schema";

export default defineConfig({
  name: "default",
  title: "Studio",

  projectId: "e6n3tgu1",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: [postSchema],
  },
});
