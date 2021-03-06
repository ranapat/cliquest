const { labels } = require('../../settings');
const { getLayout, resetPaneP, resetVariablesP, resetHelpP } = require('../');
const { data } = require('./variables');

const ui = (mode = 'default') => {
  const layout = getLayout();

  if (mode === 'default') {
    layout.variables.label = labels.variables;
    layout.logs.label = labels.logs;
    layout.help.label = labels.help;

    resetVariablesP();
    resetHelpP();

    layout.helpP.text = [
      'p* process node',
      'ctrl+p* scroll up',
      'ctrl+n* scroll down',
      'ctrl+c* leave project'
    ].join('; ');
  } else if (mode === 'process') {
    layout.help.label = labels.select_node + ' ' + 0 + ' ' + labels.and + ' ' + (data.nodes - 1);

    resetHelpP();
  } else if (mode === 'reset') {
    layout.help.label = labels.help;

    layout.helpP.text = [
      'p* process node',
      'ctrl+p* scroll up',
      'ctrl+n* scroll down',
      'ctrl+c* leave project'
    ].join('; ');
  }
};

module.exports = ui;
