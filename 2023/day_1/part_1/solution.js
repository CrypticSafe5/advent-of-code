// Make a list
// Loop over the lines
// Get the first number
// Get the last number
// EDGE CASE: If only one number, it's the first and last number
// Concatenate together to form 2-digit number
// Push to list
// Add list together

const fs = require('fs');

const output = [];
const input = fs.readFileSync('./2023/day_1/input.txt', 'utf8');
const lines = input.split('\n');
for (const line of lines) {
    const targetCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const firstNumber = line
        .split('')
        .filter((e) => targetCharacters.includes(e))[0];
    const lastNumber = line
        .split('')
        .reverse()
        .filter((e) => targetCharacters.includes(e))[0];
    output.push(Number(firstNumber + lastNumber));
}

console.log('OUTPUT:', output.reduce((acc, it) => acc + it, 0));
