const { labels } = require('../../settings');
const { getLayout, resetPaneP, resetVariablesP, resetHelpP } = require('../');

const ui = () => {
  const layout = getLayout();

  layout.pane.label = labels.project_not_loaded;
  layout.variables.label = labels.variables;
  layout.logs.label = labels.logs;
  layout.help.label = labels.help;

  resetPaneP();
  resetVariablesP();
  resetHelpP();

  layout.helpP.text = [
    'l* load',
    'ctrl+p* scroll up',
    'ctrl+n* scroll down',
    'ctrl+c* quit'
  ].join('; ');
};

module.exports = ui;
