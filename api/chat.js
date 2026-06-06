const SANITY_PROJECT = "e6n3tgu1";
const SANITY_DATASET = "dev";
const SANITY_VERSION = "2025-01-01";
const SANITY_QUERY   = encodeURIComponent(`*[_type=="botConfig"][0]{ systemPrompt, name }`);
const SANITY_URL     = `https://${SANITY_PROJECT}.api.sanity.io/v${SANITY_VERSION}/data/query/${SANITY_DATASET}?query=${SANITY_QUERY}`;

const DEFAULT_PROMPT = `Eres Prospekto, asesor de IA de Ranking Agencia (Monterrey, México).
Respuestas de máximo 2 oraciones. Directo, amigable, sin tecnicismos.
Si no sabes algo, di "te conecto con el equipo".
Nunca preguntes por presupuesto. Idioma: español.`;

async function getSanityPrompt() {
  try {
    const res  = await fetch(SANITY_URL, { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data?.result?.systemPrompt || null;
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body ?? {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages requerido" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  // Jalar el system prompt de Sanity en tiempo real
  const systemPrompt = (await getSanityPrompt()) || DEFAULT_PROMPT;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 180,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message ?? "Error de OpenAI" });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
