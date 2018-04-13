const keycode = require('keycode');

const { set, getLayout } = require('../');

const keyboard = () => {
  const layout = getLayout();
  const stdin = process.stdin;
  const stdout = process.stdout;

  const handler = (key) => {
    if (key == 'q') {
      process.exit();
    } else if (key == 'l') {
      stdin.removeListener('data', handler);

      set('load');
    } else if (keycode(key) == 16) {
      if (layout.paneP.text.trim()) {
        let offset = layout.paneP.options.offset;
        offset = offset > .25 ? (offset - .25) : 0;
        layout.paneP.options.offset = offset;
        layout.paneP.options = layout.paneP.options;
        layout.pane.scroll = layout.paneP.options.offset;
      }
    } else if (keycode(key) == 14) {
      if (layout.paneP.text.trim()) {
        let offset = layout.paneP.options.offset;
        offset = offset < .75 ? (offset + .25) : 1;
        layout.paneP.options.offset = offset;
        layout.paneP.options = layout.paneP.options;
        layout.pane.scroll = layout.paneP.options.offset;
      }
    }
  };

  stdin.on('data', handler);
};

module.exports = keyboard;
