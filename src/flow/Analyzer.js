import { Variable, Request, Section } from '../nodes';

class Analyzer {
  constructor(chain) {
    this.source = chain;

    this.dependencies = [];

    this.variablePattern = /\$\{([^\}]*)\}/gi;
  }

  analyze(index) {
    if (
      this._checkSource()
      && this._checkIndex(index)
    ) {
      const section = this.source.nodes[index];

      if (this._checkRequest(section)) {
        this.dependencies = [];

        const normalized = this._normalizeRequest(section, index);
        this.dependencies.sort();

        return { request: normalized, dependencies: this.dependencies };
      } else {
        throw new Error(`Analyzer::analyze - incorrect request`);
      }

      return section;
    } else {
      throw new Error(`Analyzer::analyze - index '${index}' incompatible with the source chain`);
    }
  }

  _checkSource() {
    return this.source && Array.isArray(this.source.nodes);
  }

  _checkIndex(index) {
    return this.source.nodes.length > index && this.source.nodes[index] instanceof Section;
  }

  _checkRequest(section) {
    return section.request
      && section.request.url
      && section.request.method
      && (!section.request.headers || Array.isArray(section.request.headers))
      && (!section.request.body || section.request.body.constructor.name === 'Object' || typeof section.request.body === 'string');
  }

  _normalizeRequest(section, index) {
    const request = new Request();
    request.method = section.request.method;
    request.url = this._handleString(section.request.url, section, index);
    if (section.request.headers) {
      const headers = [];
      for (const header of section.request.headers) {
        headers.push(this._handleString(header, section, index));
      }
      request.headers = headers;
    }
    if (section.request.body) {
      if (typeof section.request.body === 'string') {
        request.body = this._handleString(section.request.body, section, index);
      } else if (section.request.body.constructor.name === 'Object') {
        const body = {};
        for (const [key, value] of Object.entries(section.request.body)) {
          body[key] = this._handleString(value, section, index);
        }
        request.body = body;
      }
    }

    return request;
  }

  _handleString(string, section, index) {
    const variables = {};

    const regexp = this.variablePattern;
    let executed;
    while (executed = regexp.exec(string)) {
      variables[executed[1]] = this._extractVariable(executed[1], section, index);
    }

    let result = string;
    for (const [key, value] of Object.entries(variables)) {
      if (value !== undefined) {
        result = result.replace('${' + key + '}', value);
      }
    }

    return result;
  }

  _extractVariable(key, section, index) {
    let result = undefined;

    let variables = section.variables;
    if (variables && Array.isArray(variables)) {
      for (let i = 0; i < variables.length; ++i) {
        const variable = variables[i];
        if (
          variable instanceof Variable
          && variable.name === key
          && variable.value !== undefined
        ) {
          result = variable.value;
          break;
        }
      }
    }
    while (index >= 0) {
      variables = this.source.nodes[index].variables;
      if (variables && Array.isArray(variables)) {
        for (let i = 0; i < variables.length; ++i) {
          const variable = variables[i];
          if (
            variable instanceof Variable
              && variable.name === key
          ) {
            if (variable.value !== undefined) {
              result = variable.value;
              break;
            } else {
              if (this._checkRequest(this.source.nodes[index])) {
                if (this.dependencies.indexOf(index) === -1) {
                  this.dependencies.push(index);
                }
              }
            }
          }
        }
      }

      if (result) {
        break;
      }
      --index;
    }

    return result;
  }
}

export default Analyzer;
