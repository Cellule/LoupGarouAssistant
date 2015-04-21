

export default function getCallStack(count: number, skip: number) {
  var begin = (skip || 0) + 1;
  var end = (count || 3) + begin;
  return new Error()
    .stack
    .replace("Error\n", "")
    .split("\n")
    .splice(begin, end)
    .join("\n");
}
