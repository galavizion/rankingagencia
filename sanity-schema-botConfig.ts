// Copia este archivo a tu proyecto de Sanity Studio:
// src/lib/sanity/schemas/documents/botConfig.ts
// Luego agrégalo al índice de schemas (schemas/index.ts)
//
// En Sanity Studio aparecerá como "Bot · Prospekto"
// y podrás editar el cerebro del bot sin tocar código.

import { defineType, defineField } from "sanity";

export const botConfigDocument = defineType({
  name: "botConfig",
  title: "Bot · Prospekto",
  type: "document",
  icon: () => "⚡",
  fields: [
    defineField({
      name: "name",
      title: "Nombre del bot",
      type: "string",
      initialValue: "Prospekto",
    }),
    defineField({
      name: "avatar",
      title: "Emoji avatar",
      type: "string",
      initialValue: "⚡",
      description: "Un emoji que representa al bot en el widget del chat.",
    }),
    defineField({
      name: "greeting",
      title: "Mensaje de bienvenida",
      type: "text",
      rows: 2,
      description: "Primera línea que el bot dice al abrir el chat.",
      initialValue: "Hola, soy Prospekto. ¿Qué tipo de negocio tienes y qué problema quieres resolver?",
    }),
    defineField({
      name: "systemPrompt",
      title: "Cerebro del bot (System Prompt)",
      type: "text",
      rows: 16,
      description: "Instrucciones que definen cómo piensa y responde el bot. Sé específico. Incluye servicios, precios y reglas de comportamiento.",
    }),
    defineField({
      name: "voiceEnabled",
      title: "Activar modo voz",
      type: "boolean",
      initialValue: true,
      description: "Mostrar el botón de micrófono en el widget.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "greeting" },
  },
});
