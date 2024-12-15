import fs from "node:fs";
import { test } from "../../utils.js";

function makeSubLists(input) {
  return new Array(input.length)
    .fill(null)
    .map((_, i) => input.filter((_, i1) => i1 !== i));
}

function problemDampener(func, input) {
  const output = func(input);
  if (output === false) {
    const subLists = makeSubLists(input);
    const variousOutcomes = subLists.map(isSafe);
    return variousOutcomes.includes(true);
  }
  return output;
}

function getDirection(y1, y2) {
  const isUp = y1 > y2;
  const isFlat = y1 === y2;
  return isUp ? "UP" : isFlat ? "FLAT" : "DOWN";
}

function isSafe(report) {
  let direction = null;
  let prevLevel = null;
  for (const level of report) {
    const hasPrevLevel = prevLevel !== null;
    const currDir = getDirection(prevLevel, level);
    const isFlat = currDir === "FLAT";
    let dirsMatch = currDir === direction;

    // Initial item
    if (!hasPrevLevel) {
      prevLevel = level;
      continue;
    }

    // Second item to determine direction
    if (direction === null && hasPrevLevel) {
      direction = currDir;
      dirsMatch = true;
    }

    // Step check
    if (Math.abs(level - prevLevel) > 3) {
      return false;
    }

    // Direction check
    if (isFlat || !dirsMatch) {
      return false;
    }

    prevLevel = level;
  }
  return true;
}

function parseData(input) {
  const rows = input.split("\r\n");
  const data = rows.reduce(
    (acc, it) => [...acc, it.split(" ").map(Number)],
    []
  );
  return data;
}

function main(input) {
  const data = parseData(input);
  const safeReportCount = data.reduce(
    (acc, it) => acc + (problemDampener(isSafe, it) === true ? 1 : 0),
    0
  );
  return safeReportCount;
}

const data = fs.readFileSync("./2024/day_2/example.txt", "utf-8");
const testData = [[data, 4]];

test(main, testData);

const input = fs.readFileSync("./2024/day_2/input.txt", "utf-8");
const output = main(input); // 658
console.log("Output:", output);
