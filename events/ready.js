const Event = require('../core/event.js');

const exec = client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
}

module.exports = new Event('ready',true,exec);