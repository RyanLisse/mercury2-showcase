# Mercury 2 Showcase

A Next.js chat UI for **Mercury 2** by [Inception Labs](https://www.inceptionlabs.ai/) — the world’s first diffusion reasoning LLM, with reasoning-grade quality at ~1,000 tokens/second.

## Features

- **Streaming chat** — Real-time responses via Vercel AI SDK
- **Rich markdown** — Code, math, Mermaid, and CJK support via Streamdown
- **Speed indicator** — Live token count and throughput
- **Suggestions** — One-click prompt starters
- **Dark UI** — Tailwind + Motion, shadcn-style components

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Vercel AI SDK** — `useChat`, streaming, OpenAI-compatible API
- **Inception Labs API** — Mercury 2 model at `api.inceptionlabs.ai`
- **Streamdown** — Markdown rendering (code, math, Mermaid)
- **Tailwind CSS 4** — Styling
- **Motion** — Animations
- **Radix UI** — Accessible primitives (tooltips, dialogs, etc.)

## Setup

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd mercury2-showcase
   bun install
   ```

2. **Environment**

   Create `.env.local` in the project root:

   ```env
   INCEPTION_API_KEY=your_api_key_here
   ```

   Get an API key from [Inception Labs](https://www.inceptionlabs.ai/).

3. **Run**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `bun run dev`  | Start dev server (Turbopack) |
| `bun run build`| Production build         |
| `bun run start`| Run production server   |

## Project Structure

- `src/app/` — Next.js App Router (page, layout, API route)
- `src/app/api/chat/route.ts` — Chat API (streaming to Mercury 2)
- `src/components/ai-elements/` — Chat UI (conversation, message, suggestion, shimmer)
- `src/components/ui/` — Reusable UI (button, input, tooltip, etc.)
- `src/lib/utils.ts` — Utilities (e.g. `cn`)

## License

Private. Mercury 2 and Inception Labs are trademarks of Inception Labs.
