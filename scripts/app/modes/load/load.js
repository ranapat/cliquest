const prettyjson = require('prettyjson');
const { set, getLayout } = require('../');
const { labels, file } = require('../../settings');
const cliquest = require('../../../../bin');

const Cqf = cliquest.Cqf;
const Executor = cliquest.Executor;

const load = (path) => {
  const layout = getLayout();

  try {
    const chain = Cqf.parse(path, file.encoding);
    if (chain) {
      const executor = new Executor(chain);

      return { path, executor };

      /*
      try {
        executor.process(1).then(response => {
          layout.pane.label = `* ${path} *`;
          layout.logsP.text += `loading complete` + '\n';

          if (true) {
            layout.paneP.text += 'Variables:' + '\n';
            for (const variable of response.variables) {
              layout.paneP.text += '  ' + `  ${variable.name} : ${variable.value}` + '\n';
            }
          } else {
            layout.paneP.text += 'Variables:' + '\n';
            layout.paneP.text += '  ' + prettyjson.render(response.variables) + '\n';
          }
          if (true) {
            layout.paneP.text += 'Body:' + '\n';
            layout.paneP.text += '  ' + prettyjson.render(response.data) + '\n';
          }
        }).catch(error => {
          layout.logsP.text += error + '\n';
        });
      } catch (e) {
        layout.logsP.text += e + '\n';
      }
      */
    } else {
      layout.logsP.text += labels.project_empty + '\n';
    }
  } catch (e) {
    layout.logsP.text += e + '\n';
  }

  //layout.pane.scroll = layout.paneP.options.offset;

  return undefined;
};

module.exports = load;
