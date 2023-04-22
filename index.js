const TelegramBot = require('node-telegram-bot-api');

// здесь нужно указать токен вашего бота, полученный от BotFather
const token = process.env.TOKEN;

// создаем новый экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// приветственное сообщение при старте бота
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Я простой бот, который может отправлять сообщения.`);
});

// команда для отправки сообщения
bot.onText(/\/send (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const message = match[1];
  bot.sendMessage(chatId, message);
});
