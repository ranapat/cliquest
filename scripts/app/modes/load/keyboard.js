const keycode = require('keycode');

const { set, getLayout } = require('../');
const load = require('./load');

const keyboard = () => {
  const layout = getLayout();
  const stdin = process.stdin;
  const stdout = process.stdout;

  let path = '';

  const handler = (key) => {
    if (key == '\u0003') {
      stdin.removeListener('data', handler);

      set('general');
    } else if (13 == keycode(key)) {
      const result = load(path ? path : 'examples/example.json');
      if (result !== undefined) {
        stdin.removeListener('data', handler);

        set('details', result.path, result.executor);
      }
    } else if (keycode(key) === 127) {
      layout.helpP.text = layout.helpP.text.slice(0, -1);

      path = path.slice(0, -1);
    } else {
      layout.helpP.text += key;

      path += key;
    }
  };
  stdin.on('data', handler);
};

module.exports = keyboard;
