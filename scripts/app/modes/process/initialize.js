const prettyjson = require('prettyjson');
const { labels } = require('../../settings');
const { set, getLayout, resetPaneP } = require('../');

const initialize = (path, executor, section, ...args) => {
  const layout = getLayout();

  resetPaneP();

  try {
    executor.process(section).then(({ request, response }) => {
      layout.logsP.text += labels.node_executed + ' ' + section + '\n';

      layout.paneP.text += 'Request:' + '\n';
      layout.paneP.text += '  Url: ' + request.url + '\n';
      layout.paneP.text += '  Method: ' + request.method + '\n';
      layout.paneP.text += '  Headers:' + '\n';
      for (const header of request.headers) {
        layout.paneP.text += '    ' + header + '\n';
      }
      layout.paneP.text += '  Body: ' + request.body + '\n';

      layout.paneP.text += '\n';
      layout.paneP.text += 'Response:' + '\n';

      layout.paneP.text += '  Variables:' + '\n';
      for (const variable of response.variables) {
        layout.paneP.text += '    ' + `${variable.name} : ${variable.value}` + '\n';
      }

      layout.paneP.text += '  Body:' + '\n';
      layout.paneP.text += prettyjson.render(response.data) + '\n';

      layout.pane.scroll = layout.paneP.options.offset;

      set('details', path, executor);
    }).catch(error => {
      layout.logsP.text += error + '\n';

      set('details', path, executor);
    });
  } catch (e) {
    layout.logsP.text += e + '\n';

    set('details', path, executor);
  }
};

module.exports = initialize;
