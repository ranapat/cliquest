const path = require('path');

const ui = require('./ui');
const process = require('./process');
const modes = require('./modes');
const settings = require('./settings');

settings.cache.path = path.join(__dirname, '../' + settings.cache.sufix);

process.init();
ui.reset.set();
modes.init(ui.layout());
modes.set();
process.exit();
