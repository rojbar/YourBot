/**
 * Is a class that represents an event that the bot is going to listen
 */
class Event{
    
    /**
     * @constructor
     * @param {string} name the name of the event
     * @param {boolean} once if its a once or on type of event
     * @param {function} exec a function that defines what is going to be executed
     */
    constructor(name = 'default', once = true, exec = () =>{})
    {
        this.name = name;
        this.once = once;
        this.exec = exec;
    }
}
module.exports = Event;