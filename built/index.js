"use strict";
const Base_Bot = require("./core/base_bot");
const { prefix } = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();
const init = async () => {
    const bot = new Base_Bot(prefix);
    bot.browser = await puppeteer.launch({ headless: false });
    await bot.start();
};
init();