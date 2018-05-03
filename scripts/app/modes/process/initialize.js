const prettyjson = require('prettyjson');
const { labels } = require('../../settings');
const { set, getLayout, resetPaneP } = require('../');

const initialize = (path, executor, section, ...args) => {
  const layout = getLayout();

  resetPaneP();

  try {
    layout.logsP.append(labels.node_executing + ' ' + '(' + section +') ' + executor.chain.nodes[section].name);

    executor.process(section).then(({ request, response }) => {
      layout.logsP.append(labels.node_executed + ' ' + '(' + section +') ' + executor.chain.nodes[section].name);

      layout.paneP.append(executor.chain.nodes[section].name);

      layout.paneP.append('');

      layout.paneP.append(labels.request.label);
      layout.paneP.append('  ' + labels.request.url + ' ' + request.url);
      layout.paneP.append('  ' + labels.request.method + ' ' + request.method);
      layout.paneP.append('  ' + labels.request.headers);
      for (const header of request.headers) {
        layout.paneP.append('    ' + header);
      }
      if (typeof request.body === 'object') {
        layout.paneP.append('  ' + labels.request.body);
        layout.paneP.append(prettyjson.render(request.body));
      } else {
        layout.paneP.append('  ' + labels.request.body + ' ' + request.body);
      }

      layout.paneP.append('');

      layout.paneP.append(labels.response.label);
      layout.paneP.append('  ' + labels.response.variables);
      for (const variable of response.variables) {
        layout.paneP.append('    ' + `${variable.name} : ${variable.value}`);
      }
      layout.paneP.append('  ' + labels.response.body);
      layout.paneP.append(prettyjson.render(response.data));

      layout.pane.scroll = layout.paneP.options.offset;

      set('details', path, executor);
    }).catch(error => {
      layout.logsP.append(error);

      set('details', path, executor);
    });
  } catch (e) {
    layout.logsP.append(e);

    set('details', path, executor);
  }
};

module.exports = initialize;
