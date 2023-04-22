require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// здесь нужно указать токен вашего бота, полученный от BotFather
const token = '6257472316:AAEjWJpHQiAUl9KSUEkI2MfKATNASDwmFPc';
console.log(token)

// создаем новый экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// приветственное сообщение при старте бота
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}! Я простой бот, который может отправлять сообщения.`);
  if (msg.text === '/start') {
    bot.sendMessage(chatId, "Стартуем!");
  } else {
    bot.sendMessage(chatId, `${msg.text}`);
  }
});

// команда для отправки сообщения
bot.onText(/\/send (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const message = match[1];
  bot.sendMessage(chatId, message);
});
