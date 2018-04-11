const { reset } = require('../ui');
const { labels } = require('../settings');

const exit = () => {
  process.on('cleanup', () => {
    reset.reset();

    console.log(labels.have_fun);
  });

  process.on('exit', function () {
    process.emit('cleanup');
  });

  process.on('SIGINT', function () {
    console.log('Ctrl-C...');
    process.exit(2);
  });

  process.on('uncaughtException', function (e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
};

module.exports = exit;
