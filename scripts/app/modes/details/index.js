const ui = require('./ui');
const keyboard = require('./keyboard');
const initialize = require('./initialize');

const set = (path, executor, ...args) => {
  ui();
  keyboard();
  initialize(path, executor, ...args);
};

module.exports = set;
