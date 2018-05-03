import fs from 'fs';
import jsonfile from 'jsonfile';

class Persistance {
  constructor(path) {
    this.path = path;
  }

  set variables(data) {
    try {
      jsonfile.writeFileSync(this.path, data.filter(variable => variable.variable.persist === 'true' || variable.variable.persist === true));
    } catch (e) {
      //
    }
  }

  get variables() {
    try {
      if (fs.statSync(this.path).isFile()) {
        return jsonfile.readFileSync(this.path);
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }
}

export default Persistance;
