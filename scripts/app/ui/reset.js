const { Renderer } = require('clicomp');

const renderer = Renderer.instance;

const set = () => {
  renderer.clearScreen();
  renderer.cursorHide();
};

const reset = () => {
  renderer.clearScreen();
  renderer.cursorShow();
};

module.exports = {
  set, reset
};
