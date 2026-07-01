/**
 * Serverless backend for the AI assistant widget — Gemini (free tier) version.
 * Uses Google's Gemini API instead of Anthropic's, since Gemini offers a
 * genuinely free tier with no credit card required.
 *
 * This file lives at: api/ask.js — replace your existing one with this.
 * Once deployed, it's available at: https://your-project.vercel.app/api/ask
 */

const MODEL = "gemini-2.5-flash"; // fast, and covered by the free tier

const SYSTEM_PROMPT = `
You are a friendly, patient assistant embedded in a trading platform, built to help
beginners understand what they're looking at.

WHAT YOU DO:
- Explain trading terms, concepts, order types, chart elements, and platform
  features in plain, simple language, as if to someone with zero background.
- Use short sentences, concrete examples, and avoid jargon unless you define it.
- If a term is platform-specific, describe how it works on this specific platform
  (e.g. how to place an order, where fees show up, what tabs mean).
- Keep answers short: 2-4 sentences unless the user asks for more detail.

WHAT YOU NEVER DO:
- Never recommend a specific trade, asset, or timing ("you should buy X now",
  "this is a good time to sell").
- Never predict where a price will go.
- Never give personalized financial, investment, or tax advice.
- Never suggest position sizing, leverage amounts, or how much someone should
  invest.
- If asked for advice like this, gently redirect: explain that you can help them
  understand the tools and concepts, but the decision of what/when to trade is
  theirs to make, and suggest they consult a licensed financial advisor for
  personal advice.

TONE:
Warm, clear, never condescending. Assume the user is smart but new to trading.
`.trim();

const ALLOWED_ORIGINS = [
  "https://ramzfx.site",
  "https://www.ramzfx.site",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { history } = req.body;

    if (!Array.isArray(history) || history.length === 0) {
      return res.status(400).json({ error: "Missing conversation history" });
    }

    const trimmedHistory = history.slice(-10);

    // Gemini uses "user"/"model" roles and a different message shape than Anthropic
    const geminiContents = trimmedHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 400 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
        }
