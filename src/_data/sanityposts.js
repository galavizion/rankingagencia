const { toHTML } = require("@portabletext/to-html");

const PROJECT_ID = "e6n3tgu1";
const DATASET    = "dev";
const API_VERSION = "2025-01-01";

const QUERY = encodeURIComponent(`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      "url": asset->url,
      alt
    },
    body
  }
`);

function sanityImageUrl(ref) {
  if (!ref) return null;
  // ref: "image-abc123-800x600-jpg" → "abc123-800x600.jpg"
  const id = ref.replace(/^image-/, "").replace(/-([a-z]+)$/, ".$1");
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}`;
}

module.exports = async function () {
  try {
    const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;
    const res  = await fetch(url);
    const data = await res.json();
    const posts = data.result ?? [];

    return posts.map((post) => ({
      id:      post._id,
      title:   post.title,
      slug:    post.slug,
      excerpt: post.excerpt ?? "",
      date:    post._createdAt,
      image:   post.coverImage?.url ?? null,
      imageAlt: post.coverImage?.alt ?? post.title ?? "",
      bodyHtml: post.body
        ? toHTML(post.body, {
            components: {
              types: {
                image: ({ value }) => {
                  const src = sanityImageUrl(value?.asset?._ref);
                  return src
                    ? `<img src="${src}" alt="${value?.alt ?? ""}" loading="lazy" />`
                    : "";
                },
              },
            },
          })
        : "",
    }));
  } catch (err) {
    console.warn("[sanity] No se pudieron obtener los posts:", err.message);
    return [];
  }
};
