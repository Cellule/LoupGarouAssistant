var getCallStack = require("./getCallStack");

export default function logTodo(message) {
  console.warn(
    "TODO::" + (message || ""),
    getCallStack(1, 2)
  );
}
