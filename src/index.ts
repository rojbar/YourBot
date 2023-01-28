import BaseBot from './core/base_bot';
import dotenv from 'dotenv';


dotenv.config();

const init = async () =>{
    const bot = new BaseBot("$");
    bot.start();
}

init();