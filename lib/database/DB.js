var update = require("react/lib/update");

export default class DB {
  constructor(initialData) {
    this.data = initialData || {};
  }

  get(id, createDefaultData) {
    var d = this.data["_" + id];
    if(!d) {
      return this.data["_" + id] = createDefaultData;
    }
    return d;
  }

  update(id, upd) {
    return this.data["_" + id] = update(this.data["_" + id], upd);
  }

  set(id, data) {
    return this.data["_" + id] = data;
  }
}
