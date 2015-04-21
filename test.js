"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = logTodo;
var getCallStack = require("./getCallStack");

function logTodo() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.unshift("TODO::");
  args.push(getCallStack(1, 2));
  console.warn.apply(console, args);
}

module.exports = exports["default"];
