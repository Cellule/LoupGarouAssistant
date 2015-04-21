var getCallStack = require("./getCallStack");

export default function logTodo(...args) {
  if(args.length) {
    args[0] = "TODO:: " + args[0];
  } else {
    args.unshift("TODO");
  }
  args.push(getCallStack(1, 2));
  console.warn.apply(console, args);
}
