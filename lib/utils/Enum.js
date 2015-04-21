var _ = require("lodash");

var freeze = Object.freeze || _.noop;

export default class Enum {
  constructor(values: Array<string | Array<string, number>>) {
    var i = 0;
    values.forEach((value, iValue) => {
      var name = value;
      if(_.isArray(value)) {
        name = value[0];
        var idx = value[1];
        if(idx <= i) {
          console.error(
            "Enum: trying to set enum value %d which is smaller than the current value %d for name %s",
            idx, i, name
          );
        }
        i = idx;
        // changing to basic form, [string, number] => string
        values[iValue] = name;
      }
      if(this[name]) {
        console.error("Enum: %s already exist on Enum with value", name, this[name]);
      }
      this[name] = i++;
    });

    if(this.__values) {
      console.warn("Creating an enum with value '__values' will be overwritten");
    }

    this.__values = values;
    freeze(this);
  }

  forEach(iterator) {
    this.__values.forEach(val => iterator(this[val], val));
  }

  count() {
    return this.__value.length;
  }

  max() {
    return this[this.__value[this.count() - 1]];
  }
}
