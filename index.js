const Base_Bot = require("./core/base_bot");
const {prefix} = require('./config.json');
const dotenv = require('dotenv');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

dotenv.config();


const init = async () =>{
    const bot = new Base_Bot(prefix);
    bot.browser =  await puppeteer.launch({ headless: false });
    await bot.start();
}

init();

