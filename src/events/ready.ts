import { Client } from 'discord.js';
import Event from '../core/event.js';

function exec (client : Client) : void {
    console.log(`Ready! Logged in as ${client.user.tag}`);
}

export default new Event('ready', true,  exec);
