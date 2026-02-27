import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, UIMessage, convertToModelMessages } from "ai";

const inception = createOpenAICompatible({
  name: "inception",
  apiKey: process.env.INCEPTION_API_KEY!,
  baseURL: "https://api.inceptionlabs.ai/v1",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: inception("mercury-2"),
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 4096,
  });

  return result.toUIMessageStreamResponse();
}
