const { data } = require('./variables');
const { getLayout } = require('../');
const { labels } = require('../../settings');

const initialize = (path, executor, ...args) => {
  const layout = getLayout();

  data.path = path;
  data.executor = executor;
  data.nodes = executor.chain.nodes.length;

  executor.tracer = (request, response) => {
    const layout = getLayout();

    layout.logsP.append(labels.request_executed + ' [' + request.method + '] ' + request.url);
  };

  const variables = [];
  let index = 0;
  for (const node of executor.chain.nodes) {
    for (const variable of node.variables) {
      variables.push({
        index,
        variable
      });
    }
    ++index;
  }
  for (const variable of variables) {
    layout.variablesP.append('[' + variable.index + '] ' + variable.variable.name + '\n' + '  ' + variable.variable.value);
  }
};

module.exports = initialize;
