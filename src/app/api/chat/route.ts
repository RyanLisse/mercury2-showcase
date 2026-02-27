import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, UIMessage, convertToModelMessages } from "ai";

const inception = createOpenAICompatible({
  name: "inception",
  apiKey: process.env.INCEPTION_API_KEY!,
  baseURL: "https://api.inceptionlabs.ai/v1",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages)) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid 'messages' array" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const result = streamText({
      model: inception("mercury-2"),
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 4096,
    });
    // Use text stream to avoid "Invalid code data" parse errors with provider stream format
    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Chat request failed";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
