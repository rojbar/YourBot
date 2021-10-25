const Base_Bot = require("./core/base_bot");
const {prefix, token} = require('./config.json');


const bot = new Base_Bot(prefix, token);
bot.start();


