require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = '6257472316:AAEjWJpHQiAUl9KSUEkI2MfKATNASDwmFPc';
console.log(token)

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start') {
    bot.sendMessage(chatId, "Стартуем!");
  } else {
    bot.sendMessage(chatId, msg.text);
  }
});
