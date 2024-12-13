import fs from "node:fs";
import { test } from "../../utils.js";

function main(input) {
  const [listOne, listTwo] = input
    .split("\n")
    .reduce(
      (acc, it) => {
        const [e1, e2] = it.split("   ");
        acc[0].push(Number(e1));
        acc[1].push(Number(e2));
        return acc;
      },
      [[], []]
    )
    .map((e) => {
      e.sort();
      return e;
    });

  let total = 0;
  for (const i in listOne) {
    total +=
      listOne[i] > listTwo[i]
        ? listOne[i] - listTwo[i]
        : listTwo[i] - listOne[i];
  }
  return total;
}

const testData = [
  [
    `3   4
4   3
2   5
1   3
3   9
3   3`,
    11,
  ],
];

test(main, testData);

const input = fs.readFileSync("./2024/day_1/input.txt", "utf-8");
const output = main(input); // 2367773

console.log("Output:", output);
