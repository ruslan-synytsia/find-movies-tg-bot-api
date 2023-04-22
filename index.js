require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const bot = new TelegramBot(process.env.TOKEN);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  
  const bot = new TelegramBot(process.env.TOKEN);
  bot.setWebHook(`${process.env.SERVER_URL}/webhook`);
  console.log(`Webhook set to ${process.env.SERVER_URL}/webhook`);
});
