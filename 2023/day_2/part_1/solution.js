const fs = require('fs');

function solution(input) {
    // Parse input by game
    // Loop each game classifying as win/loss
    // Add up wins
    const cubeConfig = {
        red: 12,
        green: 13,
        blue: 14
    };
    const games = [];
    const gamesRaw = input.split('\r\n');
    for (const game of gamesRaw) {
        const [id, shown] = game.split(': ');
        const cleanGame = {
            id,
            value: Number(id.split(' ')[1]),
            isPossible: true
        };
        const hands = shown.split('; ');
        for (const hand of hands) {
            const colors = hand.split(', ');
            for (const color of colors) {
                const [count, id] = color.split(' ');
                const colorCount = Number(count);
                if (colorCount > cubeConfig[id]) {
                    cleanGame.isPossible = false;
                    break;
                }
            }
            if (cleanGame.isPossible === false) break;
        }

        games.push(cleanGame);
    }

    return games.reduce((acc, it) => acc + ((it.isPossible === true) ? it.value : 0), 0);
}

function solve() {
    const answer = 2239;
    const fails = [
        128 // Too low
    ];
    const input = fs.readFileSync('./2023/day_2/input.txt', 'utf8');
    const output = solution(input);
    console.log('=== SOLVE CHECK ===');
    console.log('Solution:', output);
    console.log('Fail checks pass:', !fails.includes(output) && answer === 2239);
    console.log('=======');
}

function test() {
    const expectedOutput = 8;
    const input = fs.readFileSync('./2023/day_2/part_1/example_input.txt', 'utf8');
    const output = solution(input);
    console.log('=== TEST CHECK ===');
    console.log('Output:', output);
    console.log('Expected output:', expectedOutput);
    console.log('Pass:', output === expectedOutput);
    console.log('=======');
}

test();
solve();
