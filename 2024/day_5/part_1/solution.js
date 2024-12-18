import fs from "node:fs";
import { test } from "../../utils.js";

function getRule(rules, p1, p2) {
  return rules.find(([e1, e2]) => e1 === p1 && e2 === p2);
}

function parseInput(data) {
  const [orderRulesRaw, ordersRaw] = data.split("\r\n\r\n");
  const orderRules = orderRulesRaw.split("\r\n").map((e) => e.split("|"));
  const orders = ordersRaw.split("\r\n").map((e) => e.split(","));
  return [orderRules, orders];
}

function getCorrectPrintOrders(printOrder, orderRules) {
  // Loop over print orders
  for (let i = 0; i < printOrder.length; i++) {
    // Get rules for page
    const currPage = printOrder[i];

    // Check for invalid page combos that exist before the current page
    for (let j = 0; j < i; j++) {
      const ruleExists = getRule(orderRules, currPage, printOrder[j]);
      if (ruleExists) {
        return null;
      }
    }

    // Check for invalid page combos that exist after the current page
    for (let j = i + 1; j < printOrder.length; j++) {
      const ruleExists = getRule(orderRules, printOrder[j], currPage);
      if (ruleExists) {
        return null;
      }
    }
  }

  return printOrder;
}

function main(data) {
  // Parse into both data sets
  const [printRules, printOrders] = parseInput(data);

  // Loop over each print order and get the orders that are correct
  const validPrintOrders = printOrders
    .map((e) => getCorrectPrintOrders(e, printRules))
    .filter((e) => e !== null);

  // Get the middle number of each correct print order and add them together
  const output = validPrintOrders.reduce(
    (acc, it) => acc + Number(it[Math.floor(it.length / 2)]),
    0
  );

  return output;
}

const data = fs.readFileSync("./2024/day_5/example.txt", "utf-8");
const testData = [[data, 143]];

test(main, testData);

const input = fs.readFileSync("./2024/day_5/input.txt", "utf-8");
const output = main(input); // 5129
console.log("Output:", output);
