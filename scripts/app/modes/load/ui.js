const { labels } = require('../../settings');
const { getLayout, resetPaneP, resetVariablesP, resetHelpP } = require('../');

const ui = () => {
  const layout = getLayout();

  layout.pane.label = labels.project_not_loaded;
  layout.variables.label = labels.variables;
  layout.logs.label = labels.logs;
  layout.help.label = labels.load_file;

  resetPaneP();
  resetVariablesP();
  resetHelpP();
};

module.exports = ui;
