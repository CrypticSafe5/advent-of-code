import fs from "node:fs";
import { test } from "../../utils.js";

function parseInstructions(data) {
  return data.match(/don\'t\(\)|do\(\)|mul\(\d{1,3},\d{1,3}\)/g);
}

function doInstructions(data) {
  let skip = false;
  const values = data.map((e) => {
    if (e === "don't()") {
      skip = true;
      return 0;
    } else if (e === "do()") {
      skip = false;
      return 0;
    }

    if (skip) {
      return 0;
    }

    const [e1, e2] = e.match(/\d{1,3}/g);
    return e1 * e2;
  });
  return values;
}

function main(input) {
  // Parse values
  const instructions = parseInstructions(input);
  // Perform operations
  const values = doInstructions(instructions);
  // // Add values together
  const output = values.reduce((acc, it) => acc + it, 0);
  // // Return value
  return output;
}

const data = fs.readFileSync("./2024/day_3/part_2/example.txt", "utf-8");
const testData = [[data, 48]];

test(main, testData);

const input = fs.readFileSync("./2024/day_3/input.txt", "utf-8");
const output = main(input); // 103811193
console.log("Output:", output);
