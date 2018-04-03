import { methods } from '../methods';

class Request {
  constructor() {
    this.url = undefined;
    this.headers = [];
    this.body = undefined;
    this._method = undefined;
  }

  set method(_value) {
    const value = this._normalizeMethod(_value);
    if (methods.indexOf(value) !== -1) {
      this._method = value;
    }
  }

  get method() {
    return this._method;
  }

  get xHeaders() {
    const result = {};
    for (const header of this.headers) {
      const parts = header.split(':');
      if (parts.length === 2) {
        result[parts[0].trim()] = parts[1].trim();
      }
    }
    return result;
  }

  _normalizeMethod(value) {
    return value && typeof value === 'string' ? value.toLowerCase() : undefined;
  }
}

export default Request;
