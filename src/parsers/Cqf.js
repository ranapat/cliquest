import fs from 'fs';

import Parser from './Parser';
import Cq from './Cq';

class Cqf extends Parser {
  static parse(path, encoding = 'utf8') {
    if (fs.existsSync(path)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(path, encoding));
        for (const section of parsed) {
          for (const variable of section.variables) {
            if (variable.pattern.indexOf('regexp*') !== -1) {
              variable.pattern = new RegExp(variable.pattern.replace('regexp*', '').trim(), 'g');
            }
          }
        }
        return Cq.parse(parsed);
      } catch (e) {
        console.log('Cfq::parse - error parsing data', e);
      }
    } else {
      throw new Error('Cfq::parse - file does not exist');
    }
  }
}

export default Cqf;
