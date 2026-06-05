module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addFilter("date", function (value, format) {
    const d = value === "now" ? new Date() : new Date(value);
    if (format === "yyyy") return d.getFullYear().toString();
    if (format === "yyyy-MM-dd") return d.toISOString().slice(0, 10);
    if (format === "dd MMM yyyy") {
      return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
    }
    return d.toLocaleDateString("es-MX");
  });

  eleventyConfig.addFilter("truncate", function (str, len) {
    if (!str) return "";
    const text = str.replace(/<[^>]+>/g, "");
    return text.length > len ? text.slice(0, len) + "…" : text;
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
