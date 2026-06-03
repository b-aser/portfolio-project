// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Format the Telegram message (Markdown v2)
    const text = [
      `📬 *New message from your portfolio*`,
      ``,
      `👤 *Name:*  ${escapeMarkdown(name)}`,
      `📧 *Email:* ${escapeMarkdown(email)}`,
      ``,
      `💬 *Message:*`,
      escapeMarkdown(message),
    ].join("\n");

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id:    TELEGRAM_CHAT_ID,
          text,
          parse_mode: "MarkdownV2",
        }),
      }
    );

    if (!telegramRes.ok) {
      const err = await telegramRes.json();
      console.error("Telegram API error:", err);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Escape special chars required by Telegram MarkdownV2
function escapeMarkdown(text: string) {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}
