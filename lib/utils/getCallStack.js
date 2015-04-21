

export default function getCallStack(count: number, skip: number) {
  var begin = (skip || 0) + 1;
  return "\n" + new Error()
    .stack
    .replace("Error\n", "")
    .split("\n")
    .splice(begin, count || 2)
    .join("\n");
}
