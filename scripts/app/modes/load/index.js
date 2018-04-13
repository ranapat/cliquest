const ui = require('./ui');
const keyboard = require('./keyboard');
const initialize = require('./initialize');

const set = (...args) => {
  ui();
  keyboard();
  initialize(...args);
};

module.exports = set;
