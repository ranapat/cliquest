const ui = require('./ui');
const process = require('./process');
const modes = require('./modes');

process.init();
ui.reset.set();
modes.init(ui.layout());
modes.set();
process.exit();
