require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const webAppURL = `${process.env.WEB_APP_URL}`;
const token = `${process.env.TOKEN}`;
const bot = new TelegramBot(token, {polling: true});

server.listen(port, () => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,
            `Hi, ${!msg.from.username ? msg.from.first_name : msg.from.username}✋\nI'll help you find the movies you need 😉`, {});

        bot.sendMessage(chatId,
            `👇Launch me👇`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Let's GO!", web_app: {url: webAppURL}}]
                    ]
                }
            });
    });
});