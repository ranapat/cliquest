import { Chain, Section, Request, Variable } from './nodes';
import { Analyzer, Executor } from './flow';

import { Cq } from './parsers';

const chain = Cq.parse([
  {
    'url': 'http://ranapat.org:8090/posting.php?request=2',
    'method': 'post',
    'headers': [
      'User-Agent: testing'
    ],
    'body': '',
    'variables': [
      { name: 'var2', value: undefined, pattern: /*/\[IDENTIFIER\] => ([0-9a-zA-Z \.\-=\?\&\/]+)/g*/undefined }
    ]
  },
  {
    'url': 'http://ranapat.org:8090/posting.php?request=1',
    'method': 'post',
    'headers': [
      'User-Agent: testing'
    ],
    'body': 'k1=${var1}&k2=${var2}',
    'variables': [
      { name: 'var1', value: 'val1', pattern: 'pattern' }
    ]
  }
]);

const executor = new Executor(chain);

try {
  executor.process(
    1
  ).then(response => {
    console.log('we have response finally', response)
  }).catch(error => {
    console.log('we have error finally', error);
  });
} catch (e) {
  console.log('Executor error', e);
}
