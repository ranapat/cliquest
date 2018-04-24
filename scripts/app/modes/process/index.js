const ui = require('./ui');
const keyboard = require('./keyboard');
const initialize = require('./initialize');

const set = (path, executor, section, ...args) => {
  ui();
  keyboard();
  initialize(path, executor, section, ...args);
};

module.exports = set;
