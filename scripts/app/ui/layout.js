const { Renderer, Pane, Paragraph, pwwBreak } = require('clicomp');

const { labels } = require('../settings');

const renderer = Renderer.instance;

const layout = () => {
  const maxX = renderer.maxX();
  const maxY = renderer.maxY() - 1;
  const logsHeight = Math.ceil(maxY / 3) - 3;
  const contentHeight = maxY - logsHeight - 6;

  const pane = new Pane(0, 0, 999, contentHeight, labels.project_not_loaded);
  pane.show();

  const paneP = new Paragraph(2, 1, '', {
    maxWidth: maxX - 8,
    maxHeight: contentHeight,
    wordWrap: pwwBreak,
    offset: 1
  });
  paneP.show();

  const logs = new Pane(0, contentHeight + 2, 999, logsHeight - 1, labels.logs);
  logs.show();

  const logsP = new Paragraph(2, contentHeight + 3, '', {
    maxWidth: maxX - 8,
    maxHeight: logsHeight - 1,
    wordWrap: pwwBreak,
    offset: 1
  });
  logsP.show();

  const help = new Pane(0, maxY - 3, 999, 1, labels.help);
  help.show();

  const helpP = new Paragraph(2, maxY - 1, '', {
    maxWidth: maxX - 8,
    maxHeight: 1,
    wordWrap: pwwBreak,
    offset: 1
  });
  helpP.show();

  return { pane, paneP, logsP, help, helpP };
};

module.exports = layout;
