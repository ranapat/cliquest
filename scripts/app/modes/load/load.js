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
      layout.logsP.append(labels.project_empty);
    }
  } catch (e) {
    layout.logsP.append(e);
  }

  return undefined;
};

module.exports = load;
