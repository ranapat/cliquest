const { set, getLayout } = require('../');
const { labels, file } = require('../../settings');
const cliquest = require('../../../../bin');

const Cqf = cliquest.Cqf;
const Executor = cliquest.Executor;

const load = (path) => {
  const layout = getLayout();

  try {
    const chain = Cqf.parse(path, file.encoding);
    if (chain) {
      const executor = new Executor(chain);

      return { path, executor };
    } else {
      layout.logsP.text += labels.project_empty + '\n';
    }
  } catch (e) {
    layout.logsP.text += e + '\n';
  }

  return undefined;
};

module.exports = load;
