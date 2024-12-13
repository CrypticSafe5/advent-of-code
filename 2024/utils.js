import assert from "node:assert/strict";

export function test(func, data) {
  for (const [input, expectedOutput] of data) {
    assert.equal(func(input), expectedOutput);
  }
}
