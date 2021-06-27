const Module = require('../core/module.js');
const chess = new Module();
chess.setName('chess');
chess.setDescription('It allows you to play chess against other player!');
chess.setHasArgs(false);
chess.setUsage('$chess <oponnet>');
chess.setCooldown(5);
module.exports = chess;