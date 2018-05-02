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
      console.log('some error', e)
      process.exit();
    }
  }

  get variables() {
    if (fs.statSync(this.path).isFile()) {
      return jsonfile.readFileSync(this.path);
    }
  }
}

export default Persistance;
