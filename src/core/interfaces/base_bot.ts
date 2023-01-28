import Discord from 'discord.js';
import Command from './command';

interface BaseBot extends Discord.Client {
    commands: Discord.Collection<string, Command>;
    start() : void;
    loadCommands() : void;
    loadEvents() : void;
}

export default BaseBot;