import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_TOTAL_CONTENT = 6_000;
const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

const allowedOrigins = new Set(
  (Deno.env.get("ALLOWED_ORIGINS") || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean),
);

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
});

const json = (status: number, payload: unknown, origin = "") => new Response(
  JSON.stringify(payload),
  {
    status,
    headers: {
      ...(origin ? corsHeaders(origin) : {}),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  },
);

const clientIp = (req: Request) => (
  req.headers.get("cf-connecting-ip") ||
  req.headers.get("x-real-ip") ||
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  "unknown"
);

const rateLimited = (req: Request) => {
  const key = `${clientIp(req)}:${req.headers.get("origin") || "no-origin"}`;
  const now = Date.now();
  if (!requestLog.has(key) && requestLog.size >= 5_000) {
    for (const [storedKey, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) requestLog.delete(storedKey);
    }
    if (requestLog.size >= 5_000) return true;
  }
  const recent = (requestLog.get(key) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    requestLog.set(key, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(key, recent);
  return false;
};

type ChatMessage = { role: "user" | "assistant"; content: string };

const parseMessages = async (req: Request): Promise<ChatMessage[]> => {
  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) throw new Error("invalid_payload");

  const raw = await req.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) throw new Error("invalid_payload");

  const payload = JSON.parse(raw);
  if (!Array.isArray(payload?.messages) || payload.messages.length < 1 || payload.messages.length > MAX_MESSAGES) {
    throw new Error("invalid_payload");
  }

  let totalContent = 0;
  const messages = payload.messages.map((message: unknown) => {
    if (!message || typeof message !== "object") throw new Error("invalid_payload");
    const candidate = message as Record<string, unknown>;
    if ((candidate.role !== "user" && candidate.role !== "assistant") || typeof candidate.content !== "string") {
      throw new Error("invalid_payload");
    }
    const content = candidate.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) throw new Error("invalid_payload");
    totalContent += content.length;
    return { role: candidate.role, content } as ChatMessage;
  });

  if (totalContent > MAX_TOTAL_CONTENT || messages.at(-1)?.role !== "user") throw new Error("invalid_payload");
  return messages;
};

const systemPrompt = `You are a helpful automotive service assistant for AutoCar X, a fictional premium auto repair portfolio project.

Your role is to:
- Answer general questions about car maintenance, repairs, and services
- Help visitors understand which service category may be relevant
- Treat all prices as indicative examples, never binding quotes
- Encourage a professional inspection for safety-critical or diagnostic advice

Keep responses professional and under 100 words unless more detail is requested. Do not claim that a booking has been made, that you have inspected a vehicle, or that AutoCar X is a real workshop.`;

serve(async (req) => {
  const origin = (req.headers.get("origin") || "").replace(/\/$/, "");
  const originAllowed = Boolean(origin && allowedOrigins.has(origin));

  if (req.method === "OPTIONS") {
    return originAllowed
      ? new Response(null, { status: 204, headers: corsHeaders(origin) })
      : json(403, { error: "Origin not allowed." });
  }

  if (Deno.env.get("AI_CHAT_ENABLED") !== "true") return json(503, { error: "Chat is disabled." });
  if (!originAllowed) return json(403, { error: "Origin not allowed." });
  if (req.method !== "POST") return json(405, { error: "Method not allowed." }, origin);
  if (!req.headers.get("authorization")?.startsWith("Bearer ")) return json(401, { error: "Authentication required." }, origin);
  if (rateLimited(req)) return json(429, { error: "Too many requests. Please try again later." }, origin);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json(503, { error: "Chat is unavailable." }, origin);

  let messages: ChatMessage[];
  try {
    messages = await parseMessages(req);
  } catch {
    return json(400, { error: "Invalid chat payload." }, origin);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      const status = response.status === 429 ? 429 : response.status === 402 ? 503 : 502;
      return json(status, { error: status === 429 ? "Too many requests. Please try again later." : "Chat is unavailable." }, origin);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders(origin),
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return json(504, { error: "Chat request timed out." }, origin);
  } finally {
    clearTimeout(timeout);
  }
});
