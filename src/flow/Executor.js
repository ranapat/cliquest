import axios from 'axios';
import jp from 'jsonpath';

import Analyzer from './Analyzer';
import Persistance from './Persistance';

class Executor {
  constructor(chain, persistancePath) {
    this.chain = chain;

    this.analyzer = new Analyzer(this.chain);
    this.persistance = new Persistance(persistancePath);
    this.tracer = undefined;

    this._preload();
  }

  process(index = 0) {
    const { request, dependencies } = this.analyzer.analyze(index);
    if (dependencies.length > 0) {
      const promises = [];
      for (const sindex of dependencies) {
        promises.push(this.process(sindex));
      }

      return Promise.all(promises).then(response => {
        const finale = this.analyzer.analyze(index);
        if (finale.dependencies.length === 0) {
          return this._execute(index, finale.request).then(result => {
            return result;
          });
        } else {
          return this._execute(index, finale.request).then(result => {
            return result;
          });
          //throw new Error('Executor::process - some dependencies not resolved');
        }
      });
    } else {
      return this._execute(index, request);
    }
  }

  _preload() {
    const persisted = this.persistance.variables;
    const variables = this.analyzer.variables;
    for (const p of persisted) {
      for (const variable of variables) {
        if (p.index === variable.index && p.variable.name === variable.variable.name) {
          variable.variable.value = p.variable.value;
        }
      }
    }
  }

  _execute(index, request) {
    return axios({
      method: request.method,
      url: request.url,
      headers: request.xHeaders,
      data: request.body
    }).then(response => {
      if (this.tracer && typeof this.tracer === 'function') {
        this.tracer.apply(undefined, [ request, response ]);
      }

      this._populate(index, response.data);
      this._persist();

      return {
        request,
        response: {
          data: response.data,
          variables: this.chain.nodes[index].variables
        }
      };
    });
  }

  _populate(index, body) {
    const section = this.chain.nodes[index];
    if (section.variables && Array.isArray(section.variables)) {
      const variables = section.variables;
      for (const variable of variables) {
        if (variable.pattern) {
          if (typeof body === 'object' && typeof variable.pattern === 'string') {
            variable.value = jp.value(body, variable.pattern);
          } else if (typeof body === 'string' && variable.pattern.constructor.name === 'RegExp') {
            const regexp = variable.pattern;
            let executed;
            while (executed = regexp.exec(body)) {
              variable.value = executed[1];
            }
          }
        }
      }
    }
  }

  _persist() {
    this.persistance.variables = this.analyzer.variables;
  }
}

export default Executor;
