const { data } = require('./variables');
const { getLayout } = require('../');
const { labels } = require('../../settings');

const initialize = (path, executor, ...args) => {
  const layout = getLayout();

  data.path = path;
  data.executor = executor;
  data.nodes = executor.chain.nodes.length;

  const analyzer = executor.analyzer;

  executor.tracer = (request, response) => {
    const layout = getLayout();

    layout.logsP.append(labels.request_executed + ' [' + request.method + '] ' + request.url);
  };

  for (const variable of analyzer.variables) {
    layout.variablesP.append('[' + variable.index + '] ' + (variable.variable.persist === 'true' || variable.variable.persist === true? '*' : '') + variable.variable.name + '\n' + '  ' + variable.variable.value);
  }
};

module.exports = initialize;
