const { data } = require('./variables');
const { getLayout } = require('../');
const { labels } = require('../../settings');

const initialize = (path, executor, ...args) => {
  const layout = getLayout();

  data.path = path;
  data.executor = executor;

  layout.pane.label = `* ${path} *`;
  layout.logsP.text += labels.loading_complete + '\n';

  const nodes = executor.chain.nodes.length;
  layout.logsP.text += labels.nodes_count + ' ' + nodes + '\n';
};

module.exports = initialize;
