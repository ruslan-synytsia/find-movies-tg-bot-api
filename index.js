require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.setWebHook(`${process.env.SERVER_URL}/webhook`);
console.log(`Webhook set to ${process.env.SERVER_URL}/webhook`);

app.post('/webhook', (req, res) => {
  const bot = new TelegramBot(process.env.TOKEN);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
    await bot.sendMessage(chatId,
        `Hi, ${!msg.from.username ? msg.from.first_name : msg.from.username}✋\nI'll help you find the movies you need 😉`, {});

    await bot.sendMessage(chatId,
        `👇Launch me👇`,
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Let's GO!", web_app: {url: webAppURL}}]
                ]
            }
        });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
