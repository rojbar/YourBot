import { Client, Interaction } from "discord.js";


/**
 * Is a class that represents an event that the bot is going to listen
 * @property {string} name the name of the event
 * @property {boolean} once if its a once or on type of event
 * @property {function} exec a function that defines what is going to be executed
 */

type EXECUTABLE = ( args: Client | Interaction | undefined | null ) => void;
class Event{

    // aqui deberia de poder decirle al constructor que use estos tipos de datoss
    name: string;
    once: boolean;
    exec: EXECUTABLE
    
    /**
     * @constructs
     * @param {string} name the name of the event
     * @param {boolean} once if its a once or on type of event
     * @param {function} exec a function that defines what is going to be executed
     */

    constructor(name: string, once: boolean, exec: EXECUTABLE ){
        this.name = name;
        this.once = once;
        this.exec = exec;
    }


}

export default Event;