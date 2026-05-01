import { ZodError } from "zod";

import { formSchema } from "@/lib/schema/contact-form.schema";
import {
  telegramBotToken,
  telegramChatId as telegramChatID,
} from "@/lib/server-config";

export async function POST(request: Request) {
  try {
    const json = await request.json();

    let body;
    try {
      body = formSchema.parse(json);
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0];
        const field = firstError?.path?.[0];
        return new Response(
          `Invalid or missing value in "${String(field)}" field.`,
          { status: 400 },
        );
      }
      return new Response("Invalid form data.", { status: 400 });
    }

    const payload = {
      chat_id: telegramChatID,
      text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.whatsapp} (WhatsApp)\nMessage: ${body.message}`,
    };

    const res = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending message:", error);

      return new Response(
        "Unable to send your message right now. Please try again later.",
        { status: 502 },
      );
    }

    return new Response("Message sent successfully!", { status: 200 });
  } catch (err) {
    console.error("Unexpected error in contact form:", err);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
