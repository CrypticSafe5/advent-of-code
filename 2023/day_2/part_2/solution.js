const fs = require('fs');

function solution(input) {
    // Parse input by game
    // Loop each game classifying as win/loss
    // Add up wins
    const games = [];
    const gamesRaw = input.split('\r\n');
    for (const game of gamesRaw) {
        const [id, shown] = game.split(': ');
        const cleanGame = {
            id,
            power: 0,
            blue: 0,
            green: 0,
            red: 0
        };
        const hands = shown.split('; ');
        for (const hand of hands) {
            const colors = hand.split(', ');
            for (const color of colors) {
                const [count, id] = color.split(' ');
                const colorCount = Number(count);
                if (cleanGame[id] >= colorCount) continue;
                cleanGame[id] = colorCount;
                cleanGame.power = cleanGame.blue * cleanGame.green * cleanGame.red;
            }
        }

        games.push(cleanGame);
    }

    return games.reduce((acc, it) => acc + it.power, 0);
}

function solve() {
    const answer = 83435;
    const fails = [];
    const input = fs.readFileSync('./2023/day_2/input.txt', 'utf8');
    const output = solution(input);
    console.log('=== SOLVE CHECK ===');
    console.log('Solution:', output);
    console.log('Fail checks pass:', !fails.includes(output) && output === answer);
    console.log('=======');
}

function test() {
    const expectedOutput = 2286;
    const input = fs.readFileSync('./2023/day_2/part_2/example_input.txt', 'utf8');
    const output = solution(input);
    console.log('=== TEST CHECK ===');
    console.log('Output:', output);
    console.log('Expected output:', expectedOutput);
    console.log('Pass:', output === expectedOutput);
    console.log('=======');
}

test();
solve();
