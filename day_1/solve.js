const fs = require("fs");

fs.readFile("input.txt", "utf8", (_, contents) => {
  const part1 = contents
    .split("\n")
    .map(Number)
    .map((n, i, a) => [n, a[i + 1]])
    .filter((ns) => Boolean(ns[0] < ns[1])).length;

  const part2 = contents
    .split("\n")
    .map(Number)
    .map((n, i, a) => [n, a[i + 1], a[i + 2]])
    .map((ns) => ns.reduce((sum, n) => sum + n, 0))
    .map((n, i, a) => [n, a[i + 1]])
    .filter((ns) => Boolean(ns[0] < ns[1])).length;

  console.log("---------------");
  console.log(`part1 answer: ${part1}\n`);
  console.log(`part2 answer: ${part2}`);
  console.log("---------------");
});
