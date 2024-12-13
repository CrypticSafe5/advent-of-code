import fs from "node:fs";
import { test } from "../../utils.js";

function main(input) {
  const colOne = [];
  const colTwoCounts = {};
  const rows = input.split("\n");
  for (const row of rows) {
    const [e1, e2] = row.split("   ").map(Number);
    colTwoCounts[e2] = e2 in colTwoCounts ? (colTwoCounts[e2] += e2) : e2;
    colOne.push(e1);
  }
  const output = colOne.reduce(
    (acc, it) => acc + (it in colTwoCounts ? colTwoCounts[it] : 0),
    0
  );

  return output;
}

const tests = [
  [
    `3   4
4   3
2   5
1   3
3   9
3   3`,
    31,
  ],
];

test(main, tests);

const input = fs.readFileSync("./2024/day_1/input.txt", "utf-8");
const output = main(input); // 21271939

console.log("Output:", output);
