import fs from "node:fs";
import { test } from "../../utils.js";

function parseInstructions(data) {
  return data.match(/mul\(\d{1,3},\d{1,3}\)/g);
}

function doInstructions(data) {
  const values = data.map((e) => {
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

const data = fs.readFileSync("./2024/day_3/part_1/example.txt", "utf-8");
const testData = [[data, 161]];

test(main, testData);

const input = fs.readFileSync("./2024/day_3/input.txt", "utf-8");
const output = main(input); // 179571322
console.log("Output:", output);
