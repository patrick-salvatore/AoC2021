const fs = require("fs");

const flags = process.argv.slice(2);
const INPUT_FLAG = flags[0];

const FILE = "input.txt";
const DELIMETER = INPUT_FLAG === "1" ? 12 : 5;

const notBinaryOp = (binString) =>
  binString
    .split("")
    .map((byte) => (byte === "0" ? "1" : "0"))
    .join("");

const part1 = (rawStrings) => {
  const gammaBin = new Array(DELIMETER)
    .fill(null)
    .map((_, i) => {
      let bit = "";

      rawStrings.forEach((s) => {
        bit += s[i];
      });
      return bit;
    })
    .map((s) => {
      return s
        .split("")
        .reduce((a, b) => ({ ...a, [b]: a[b] ? a[b] + 1 : 1 }), {});
    })
    .map((o) => {
      const k = Object.keys(o);

      if (o[k[1]] > o[k[0]]) {
        return k[1];
      }

      return k[0];
    })
    .join("");

  const gamma = Number.parseInt(gammaBin, 2);
  const epsilon = Number.parseInt(notBinaryOp(gammaBin), 2);
  return gamma * epsilon;
};

const part2 = (input) => {
  let oxygenIn = [...input];
  let co2In = [...input];
  let index = 0;
  while (oxygenIn.length > 1 || co2In.length > 1) {
    if (oxygenIn.length > 1) {
      const oxCount = [0, 0];
      for (let i = 0; i < oxygenIn.length; i++) {
        if (oxygenIn[i][index] === "0") oxCount[0]++;
        else oxCount[1]++;
      }
      if (oxCount[0] > oxCount[1])
        oxygenIn = oxygenIn.filter((v) => v[index] !== "1");
      else oxygenIn = oxygenIn.filter((v) => v[index] !== "0");
    }

    if (co2In.length > 1) {
      const co2Count = [0, 0];
      for (let i = 0; i < co2In.length; i++) {
        if (co2In[i][index] === "0") co2Count[0]++;
        else co2Count[1]++;
      }
      if (co2Count[0] > co2Count[1])
        co2In = co2In.filter((v) => v[index] !== "0");
      else co2In = co2In.filter((v) => v[index] !== "1");
    }

    index++;
  }
  return parseInt(oxygenIn[0], 2) * parseInt(co2In[0], 2);
};

fs.readFile(FILE, "utf8", (_, contents) => {
  const raw = contents.split("\n");

  console.log("---------------");
  console.log(`part1 answer: ${part1(raw)}\n`);
  console.log(`part2 answer: ${part2(raw)}`);
  console.log("---------------");
});
