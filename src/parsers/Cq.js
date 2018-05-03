import Parser from './Parser';

import { Chain, Section, Request, Variable } from '../nodes';

class Cq extends Parser {
  static parse(data) {
    let result = new Chain();
    if (data && Array.isArray(data)) {
      for (const section of data) {
        const sec = new Section();
        const request = new Request();

        sec.name = section.name;

        request.url = section.url;
        request.headers = section.headers;
        request.method = section.method;
        request.body = section.body;
        sec.request = request;

        if (section.variables && Array.isArray(section.variables)) {
          for (const variable of section.variables) {
            const vari = new Variable();
            vari.name = variable.name;
            vari.value = variable.value;
            vari.pattern = variable.pattern;
            vari.persist = variable.persist;
            sec.variables.push(vari);
          }
        }

        result.nodes.push(sec);
      }
    }
    return result;
  }
}

export default Cq;
