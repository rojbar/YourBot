const Base_Bot = require("./core/base_bot");
const {prefix} = require('./config.json');
const dotenv = require('dotenv');

dotenv.config();



const bot = new Base_Bot(prefix);
bot.start();


