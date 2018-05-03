const keycode = require('keycode');

const { data, reset } = require('./variables');
const { set, getLayout } = require('../');
const ui = require('./ui');

const keyboard = () => {
  const layout = getLayout();
  const stdin = process.stdin;
  const stdout = process.stdout;

  const handler = (key) => {
    if (key == '\u0003') {
      stdin.removeListener('data', handler);

      reset();

      set('general');
    } else if (key == 'p') {
      stdin.removeListener('data', handler);

      ui('process');
      keyboardProcess();
    } else if (keycode(key) == 16) {
      if (layout.paneP.text.trim()) {
        let offset = layout.paneP.options.offset;
        offset = offset > .15 ? (offset - .15) : 0;
        layout.paneP.options.offset = offset;
        layout.paneP.options = layout.paneP.options;
        layout.pane.scroll = layout.paneP.options.offset;
      }
    } else if (keycode(key) == 14) {
      if (layout.paneP.text.trim()) {
        let offset = layout.paneP.options.offset;
        offset = offset < .85 ? (offset + .15) : 1;
        layout.paneP.options.offset = offset;
        layout.paneP.options = layout.paneP.options;
        layout.pane.scroll = layout.paneP.options.offset;
      }
    }
  };

  stdin.on('data', handler);
};

const keyboardProcess = () => {
  const layout = getLayout();
  const stdin = process.stdin;
  const stdout = process.stdout;

  let section = '';

  const handler = (key) => {
    if (key == '\u0003') {
      stdin.removeListener('data', handler);

      ui('reset');
      keyboard();
    } else if (13 == keycode(key)) {
      if (section >= 0 && section < data.executor.chain.nodes.length) {
        stdin.removeListener('data', handler);

        set('process', data.path, data.executor, section);
      }
    } else if (keycode(key) === 127) {
      layout.helpP.text = layout.helpP.text.slice(0, -1);

      section = section.slice(0, -1);
    } else {
      layout.helpP.text += key;

      section += key;
    }
  };
  stdin.on('data', handler);
};

module.exports = keyboard;
