export const getTelegramConfig = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token?.trim()) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
  }

  const id = process.env.TELEGRAM_CHAT_ID;
  if (!id?.trim()) {
    throw new Error("TELEGRAM_CHAT_ID is not defined");
  }

  return {
    telegramBotToken: token,
    telegramChatId: id,
  };
};
