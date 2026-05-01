const telegramBotToken: string = (() => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token?.trim()) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
  }
  return token;
})();

const telegramChatId: string = (() => {
  const id = process.env.TELEGRAM_CHAT_ID;
  if (!id?.trim()) {
    throw new Error("TELEGRAM_CHAT_ID is not defined");
  }
  return id;
})();

export { telegramBotToken, telegramChatId };
