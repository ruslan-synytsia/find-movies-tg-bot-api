require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const webAppURL = `${process.env.WEB_APP_URL}`;
const token = `${process.env.TOKEN}`;
const bot = new TelegramBot(token, {polling: true});

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
