import fs from "node:fs";
import { test } from "../../utils.js";

function parseData(data) {
  const rows = data.split("\r\n");
  const board = rows.map((e) => e.split(""));
  return board;
}

function getAllPositions(data) {
  const output = [];
  // Rows
  for (let i = 0; i < data.length; i++) {
    // Columns
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "X") {
        output.push([i, j]);
      }
    }
  }
  return output;
}

function validateWord(board, [y, x], direction, angle) {
  // Get all positions based on direction and angle
  // Short circuit if not part of "XMAS"
  let positions = [
    [y, x, "M"],
    [y, x, "A"],
    [y, x, "S"],
  ];

  if (angle === "VERTICAL" && direction === "FORWARD") {
    positions = positions.map(([y1, x1, char], i) => [y1 + 1 + i, x1, char]);
  } else if (angle === "VERTICAL" && direction === "BACKWARD") {
    positions = positions.map(([y1, x1, char], i) => [y1 - 1 - i, x1, char]);
  } else if (direction === "FORWARD") {
    positions = positions.map(([y1, x1, char], i) => [y1, x1 + 1 + i, char]);
  } else if (direction === "BACKWARD") {
    positions = positions.map(([y1, x1, char], i) => [y1, x1 - 1 - i, char]);
  }

  if (angle === "UP") {
    positions = positions.map(([y1, x1, char], i) => [y1 + 1 + i, x1, char]);
  } else if (angle === "DOWN") {
    positions = positions.map(([y1, x1, char], i) => [y1 - 1 - i, x1, char]);
  }

  for (const [y1, x1, char] of positions) {
    if (!(y1 in board) || !(x1 in board[y1]) || board[y1][x1] !== char) {
      return null;
    }
  }
  return [[y, x], ...positions];
}

function getValidWords(board, positions) {
  const output = [];
  // Search each position for neighbor, drop record if non-existent
  for (const position of positions) {
    // Get angle and direction based on neighbor
    for (const direction of ["FORWARD", "BACKWARD"]) {
      for (const angle of ["VERTICAL", "UP", "FLAT", "DOWN"]) {
        // direction needs to not be determinate
        const wordCoordinates = validateWord(board, position, direction, angle);
        if (wordCoordinates === null) {
          continue;
        }
        output.push(wordCoordinates);
      }
    }
  }
  return output;
}

function main(data) {
  // Parse data
  const board = parseData(data);
  // Locate each "X"
  const xInstances = getAllPositions(board);
  // Validate word
  const validWords = getValidWords(board, xInstances);
  // Return number XMASs
  return validWords.length;
}

const data = fs.readFileSync("./2024/day_4/example.txt", "utf-8");
const testData = [[data, 18]];

test(main, testData);

const input = fs.readFileSync("./2024/day_4/input.txt", "utf-8");
const output = main(input); // 2532
console.log("Output:", output);
