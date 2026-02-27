# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Mercury 2 Showcase — a Next.js 15 single-page chat app demonstrating Inception Labs' Mercury 2 diffusion LLM. Uses Bun as package manager, Tailwind CSS 4, Vercel AI SDK v6 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`).

### Required secrets

- `INCEPTION_API_KEY` — API key for `https://api.inceptionlabs.ai/v1`. Must be set as an environment variable (do **not** create a `.env.local` with a placeholder value, as Next.js will load it and override the real secret).

### Running the dev server

```
bun run dev          # starts Next.js with Turbopack on port 3000
```

### Build & type-check

```
bun run build        # production build (also runs linting + type checking)
npx tsc --noEmit     # standalone TypeScript check
```

### Caveats

- **No dedicated lint script**: The project has no ESLint config or `lint` script. Type checking via `tsc --noEmit` and the `bun run build` step serve as the primary static checks.
- **No test framework**: No test runner or test files exist. Validation is done via build + type-check + manual testing.
- **API validation via curl**: The `/api/chat` endpoint can be tested directly:
  ```
  curl -s -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"id":"1","role":"user","parts":[{"type":"text","text":"Hello"}]}]}'
  ```
  This returns plain text (the API uses `toTextStreamResponse()` with `streamProtocol: "text"` on the frontend). A 200 response with text content confirms the API key and Inception Labs connectivity are working.
- **Do not create `.env.local`**: If a `.env.local` file with a placeholder `INCEPTION_API_KEY` value exists, Next.js will load it and override the real secret injected via the environment. Delete any such file before starting the dev server.
