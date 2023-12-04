const fs = require('fs');

function solution(input) {
    // Make a list
    // Loop over the lines
    // Get the first number
    // Get the last number
    // EDGE CASE: If only one number, it's the first and last number
    // Convert any word forms to digits
    // Concatenate together to form 2-digit number
    // Push to list
    // Add list together

    const output = [];
    const lines = input.split('\n');
    for (const line of lines) {
        const wordHash = {
            zero: '0',
            one: '1',
            two: '2',
            three: '3',
            four: '4',
            five: '5',
            six: '6',
            seven: '7',
            eight: '8',
            nine: '9',
            '0': '0',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9'
        };
        const splitted = line.matchAll(/(?=(zero|one|two|three|four|five|six|seven|eight|nine|\d))/g);
        const splitLine = [];
        for (const thing of splitted) splitLine.push(wordHash[thing[1]]);
        const firstNumber = wordHash[splitLine[0]];
        const lastNumber = wordHash[splitLine.reverse()[0]];

        output.push(Number(firstNumber + lastNumber))
    }
    return output.reduce((acc, it) => acc + it, 0);
}

function solve() {
    const answer = 53866;
    const fails = [
        53900 // Too high
    ];
    const input = fs.readFileSync('./2023/day_1/input.txt', 'utf8');
    const output = solution(input);
    console.log('=== SOLVE CHECK ===');
    console.log('Fail checks pass:', !fails.includes(output) && output === answer);
    console.log('Solution:', output);
    console.log('=======');
}

function test() {
    const expectedOutput = 281;
    const input = fs.readFileSync('./2023/day_1/part_2/example_input.txt', 'utf8');
    const output = solution(input);
    console.log('=== TEST CHECK ===');
    console.log('Output:', output);
    console.log('Expected output:', expectedOutput);
    console.log('Pass:', output === expectedOutput);
    console.log('=======');
}

test();
solve();
