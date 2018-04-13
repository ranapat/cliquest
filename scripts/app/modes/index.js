const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => {
  return readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)
    .map(name => name.replace(`${source}/`, ''))
  ;
}

const DEFAULT_MODE = 'general';

const modules = getDirectories(__dirname);
let layoutKeeper;

const init = (layout) => {
  layoutKeeper = layout;
};

const set = (name = DEFAULT_MODE, ...args) => {
  const layout = layoutKeeper;
  if (!layout) {
    throw new Error('Modules::index - layout not set');
  }

  if (modules.indexOf(name) !== -1) {
    const module = require(`./${name}`);
    module(...args);
  } else {

  }
};

const getLayout = () => layoutKeeper;

const resetPaneP = () => {
  const layout = getLayout();

  layout.paneP.options.offset = 1;
  layout.paneP.options = layout.paneP.options;
  layout.paneP.hide();
  layout.paneP.text = '';
  layout.paneP.show();
};

const resetVariablesP = () => {
  const layout = getLayout();

  layout.variablesP.options.offset = 1;
  layout.variablesP.options = layout.variablesP.options;
  layout.variablesP.hide();
  layout.variablesP.text = '';
  layout.variablesP.show();
};

const resetHelpP = () => {
  const layout = getLayout();

  layout.helpP.hide();
  layout.helpP.text = '';
  layout.helpP.show();
};

module.exports = {
  init, set,
  getLayout,
  resetPaneP, resetVariablesP, resetHelpP
};
