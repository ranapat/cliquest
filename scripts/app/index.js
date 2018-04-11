const prettyjson = require('prettyjson');
const keycode = require('keycode');
const clicomp = require('clicomp');
const cliquest = require('../../bin');

const { layout, reset } = require('./ui');
const { init, exit } = require('./process');

const Renderer = clicomp.Renderer;
const Pane = clicomp.Pane;
const Paragraph = clicomp.Paragraph;
const pwwBreak = clicomp.pwwBreak;

const Cqf = cliquest.Cqf;
const Executor = cliquest.Executor;

const renderer = Renderer.instance;

const stdin = process.stdin;
const stdout = process.stdout;

const populateHelp = () => {
  helpP.text = [
    'l* load',
    'ctrl+p* scroll up',
    'strl+n* scroll down',
    'q* quit'
  ].join('; ');
};

const handleKeyboard = () => {
  help.label = 'help';
  helpP.text = ' '.repeat(helpP.text.length);
  helpP.text = '';

  populateHelp();

  const handler = (key) => {
    if (key == 'q') {
      process.exit();
    } else if (key == 'l') {
      stdin.removeListener('data', handler);
      handleLoad();
    } else if (keycode(key) == 16) {
      if (paneP.text.trim()) {
        let offset = paneP.options.offset;
        offset = offset > .25 ? (offset - .25) : 0;
        paneP.options.offset = offset;
        paneP.options = paneP.options;
        pane.scroll = paneP.options.offset;
      }
    } else if (keycode(key) == 14) {
      if (paneP.text.trim()) {
        let offset = paneP.options.offset;
        offset = offset < .75 ? (offset + .25) : 1;
        paneP.options.offset = offset;
        paneP.options = paneP.options;
        pane.scroll = paneP.options.offset;
      }
    }
  };
  stdin.on('data', handler);
};

const handleLoad = () => {
  help.label = 'load file...';
  helpP.text = ' '.repeat(helpP.text.length);
  helpP.text = '';

  let path = '';

  const handler = (key) => {
    if (key == '\u0003') {
      stdin.removeListener('data', handler);
      handleKeyboard();
    } else if (13 == keycode(key)) {
      loadFile(path);
      stdin.removeListener('data', handler);
      handleKeyboard();
    } else {
      if (keycode(key) === 127) {
        helpP.text = helpP.text.slice(0, -1);

        path = path.slice(0, -1);
      } else {
        helpP.text += key;

        path += key;
      }
    }
  };
  stdin.on('data', handler);
};

const loadFile = (path) => {
  paneP.options.offset = 1;
  paneP.options = paneP.options;
  logsP.text += `loading file ${path}...` + '\n';

  try {
    const chain = Cqf.parse(path, 'utf8');
    if (chain) {
      const executor = new Executor(chain);

      try {
        executor.process(0).then(response => {
          pane.label = `* ${path} *`;
          logsP.text += `loading complete` + '\n';

          if (true) {
            paneP.text += 'Variables:' + '\n';
            for (const variable of response.variables) {
              paneP.text += '  ' + `  ${variable.name} : ${variable.value}` + '\n';
            }
          } else {
            paneP.text += 'Variables:' + '\n';
            paneP.text += '  ' + prettyjson.render(response.variables) + '\n';
          }
          if (true) {
            paneP.text += 'Body:' + '\n';
            paneP.text += '  ' + prettyjson.render(response.data) + '\n';
          }
        }).catch(error => {
          pane.label = 'project not loaded';
          paneP.text = ' ';

          logsP.text += error + '\n';
        });
      } catch (e) {
        pane.label = 'project not loaded';
        paneP.text = ' ';

        logsP.text += e + '\n';
      }
    }
  } catch (e) {
    pane.label = 'project not loaded';
    paneP.text = ' ';

    logsP.text += e + '\n';
  }

  pane.scroll = paneP.options.offset;
};

init();
reset.set();
const { pane, paneP, logsP, help, helpP } = layout();
handleKeyboard();
exit();
