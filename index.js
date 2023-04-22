require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

app.use(bodyParser.json());

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.on('polling_error', (error) => {
  console.log(error);
});

bot.setWebHook(`${process.env.SERVER_URL}/webhook`);
console.log(`Webhook set to ${process.env.SERVER_URL}/webhook`);

app.post('/webhook', (req, res) => {
  const bot = new TelegramBot(process.env.TOKEN);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on('message', (msg) => {
  console.log(msg);
  bot.sendMessage(msg.chat.id, 'Received your message!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
