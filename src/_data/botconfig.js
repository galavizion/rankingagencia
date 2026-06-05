const PROJECT_ID  = "e6n3tgu1";
const DATASET     = "dev";
const API_VERSION = "2025-01-01";

const QUERY = encodeURIComponent(`*[_type == "botConfig"][0]{
  name, avatar, greeting, systemPrompt, voiceEnabled
}`);

const DEFAULTS = {
  name:         "Prospekto",
  avatar:       "⚡",
  greeting:     "Hola, soy Prospekto. ¿Qué tipo de negocio tienes y qué problema quieres resolver?",
  voiceEnabled: true,
  systemPrompt: `Eres Prospekto, asesor de IA de Ranking Agencia (Monterrey, México).

SERVICIOS:
- Desarrollo Web Headless (Next.js/Astro + Sanity + Vercel). Desde $25,000 MXN.
- SEO Técnico e Indexación en IA/SGE. Desde $8,000 MXN/mes.
- Bots con IA (Prospekto en WhatsApp). Desde $15,000 MXN setup.

CASOS: La Bodega del Instalador (headless + SGE), Cercos Muralla (SEO local #1 en Monterrey).

REGLAS ESTRICTAS:
- Respuestas de máximo 2 oraciones. Directo al punto.
- Nunca inventes precios fuera del rango indicado.
- No digas que eres ChatGPT ni OpenAI.
- Si no sabes algo, di "te conecto con el equipo".
- Siempre termina con UNA pregunta para avanzar la conversación.
- Idioma: español.`.trim(),
};

module.exports = async function () {
  try {
    const url  = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;
    const res  = await fetch(url);
    const data = await res.json();
    const doc  = data.result;

    if (!doc) return DEFAULTS;

    return {
      name:         doc.name         || DEFAULTS.name,
      avatar:       doc.avatar       || DEFAULTS.avatar,
      greeting:     doc.greeting     || DEFAULTS.greeting,
      voiceEnabled: doc.voiceEnabled ?? DEFAULTS.voiceEnabled,
      systemPrompt: doc.systemPrompt || DEFAULTS.systemPrompt,
    };
  } catch {
    return DEFAULTS;
  }
};
