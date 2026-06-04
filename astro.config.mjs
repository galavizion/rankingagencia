import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  integrations: [
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || "e6n3tgu1",
      dataset: env.PUBLIC_SANITY_DATASET || "dev",
      useCdn: false,
      studioBasePath: "/studio",
    }),
  ],
});