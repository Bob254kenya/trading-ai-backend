/**
 * Serverless backend for the AI assistant widget — Vercel version.
 * No server to run or maintain; Vercel hosts this function for you.
 *
 * This file lives at: api/ask.js
 * Once deployed, it becomes available at: https://your-project.vercel.app/api/ask
 */

const MODEL = "claude-sonnet-4-6";

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

export default async function handler(req, res) {
  // Only allow your own site to call this (edit the domain before going live)
  res.setHeader("Access-Control-Allow-Origin", "*"); // tighten this to your domain in production
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

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: trimmedHistory,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const answer = data.content?.find((c) => c.type === "text")?.text || "";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
