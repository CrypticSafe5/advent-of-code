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
      if (data[i][j] === "A") {
        output.push([i, j]);
      }
    }
  }
  return output;
}

function validateWord(board, [y, x], direction) {
  let positions = [
    [y, x, "M"],
    [y, x, "M"],
    [y, x, "S"],
    [y, x, "S"],
  ];

  if (direction === "UP") {
    positions[0] = [y - 1, x - 1, "M"];
    positions[1] = [y - 1, x + 1, "M"];
    positions[2] = [y + 1, x - 1, "S"];
    positions[3] = [y + 1, x + 1, "S"];
  } else if (direction === "RIGHT") {
    positions[0] = [y - 1, x - 1, "M"];
    positions[1] = [y + 1, x - 1, "M"];
    positions[2] = [y - 1, x + 1, "S"];
    positions[3] = [y + 1, x + 1, "S"];
  } else if (direction === "DOWN") {
    positions[0] = [y + 1, x - 1, "M"];
    positions[1] = [y + 1, x + 1, "M"];
    positions[2] = [y - 1, x - 1, "S"];
    positions[3] = [y - 1, x + 1, "S"];
  } else if (direction === "LEFT") {
    positions[0] = [y + 1, x + 1, "M"];
    positions[1] = [y - 1, x + 1, "M"];
    positions[2] = [y + 1, x - 1, "S"];
    positions[3] = [y - 1, x - 1, "S"];
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
    for (const direction of ["UP", "DOWN", "LEFT", "RIGHT"]) {
      const wordCoordinates = validateWord(board, position, direction);
      if (wordCoordinates === null) {
        continue;
      }
      output.push(wordCoordinates);
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
const testData = [[data, 9]];

test(main, testData);

const input = fs.readFileSync("./2024/day_4/input.txt", "utf-8");
const output = main(input); // 1941
console.log("Output:", output);
