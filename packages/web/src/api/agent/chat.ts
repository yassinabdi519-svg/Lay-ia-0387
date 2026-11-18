import {
  createGateway,
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import type { Context } from "hono";
const gateway = createGateway({
  baseURL: process.env.AI_GATEWAY_BASE_URL,
  apiKey: process.env.AI_GATEWAY_API_KEY,
});
const limits = new Map<string, { count: number; reset: number }>();
export async function chat(c: Context) {
  const key = c.req.header("x-forwarded-for") ?? "local";
  const old = limits.get(key);
  const value =
    old && old.reset > Date.now()
      ? old
      : { count: 0, reset: Date.now() + 60000 };
  if (value.count++ >= 20)
    return c.json(
      { error: "Trop de demandes. Réessaie dans une minute." },
      429,
    );
  limits.set(key, value);
  try {
    const body = await c.req.json();
    if (
      !Array.isArray(body.messages) ||
      body.messages.length > 50 ||
      JSON.stringify(body.messages).length > 50000
    )
      return c.json(
        {
          error: "Conversation trop longue. Commence une nouvelle discussion.",
        },
        400,
      );
    const result = streamText({
      model: gateway("openai/gpt-5.4-mini"),
      system: `Tu es LAY IA, un ami intelligent pour les jeunes de Djibouti. Réponds en français simple et chaleureux, avec étapes concrètes. Aide à apprendre, aux langues, au CV, à préparer les candidatures et à créer une activité. Adapte la langue à celle de la personne. Ne prétends pas avoir accès aux offres d'emploi ou aux données actuelles : sans recherche connectée, explique comment vérifier. N'invente pas de contacts ou d'offres. Refuse les demandes dangereuses, illégales, de fraude ou d'exploitation, et propose une aide sûre. Ne demande ni PIN, ni mot de passe, ni secrets financiers. Pour les urgences conseille une aide professionnelle locale. Les discussions et l'aide de base sont gratuites. Premium n'est pas activé : les vidéos générées, scripts vidéo avancés et prompts avancés sont indisponibles. Ne prétends jamais générer une vidéo ni activer un abonnement. Tu peux proposer des conseils généraux et un plan simple de contenu. Les réponses IA peuvent être incorrectes : recommande de vérifier les informations importantes.`,
      messages: await convertToModelMessages(body.messages as UIMessage[]),
      maxOutputTokens: 1600,
    });
    return result.toUIMessageStreamResponse({
      onError: (error) => {
        if (
          error instanceof Error &&
          error.message.includes("paid Runable plan")
        )
          return "La discussion IA nécessite un abonnement Runable payant pour le propriétaire de LAY IA. Elle n’est pas encore active.";
        return "L’IA est momentanément indisponible. Vérifie la configuration et l’abonnement Runable, puis réessaie.";
      },
    });
  } catch {
    return c.json({ error: "L’IA est indisponible. Réessaie plus tard." }, 503);
  }
}
