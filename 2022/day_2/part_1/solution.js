const fs = require('fs');

const guide = fs.readFileSync('../input.txt', 'utf8');

const guideHash = {
	A: 0,
	B: 1,
	C: 2,
	X: 0,
	Y: 1,
	Z: 2
};

// A = rock = 0
// B = paper = 1
// C = scissor = 2
// X = rock = 0
// Y = paper = 1
// Z = scissor = 2

const playValueHash = [1, 2, 3];

const gameValueHash = {
	[-1]: 0,
	[0]: 3,
	[1]: 6
};

const gameMatrix = [
	[0, -1, 1],
	[1, 0, -1],
	[-1, 1, 0]
];

function game(play) {
	// For any empty lines Ex. ending line being blank
	if (play.length === 1) return 0;

	const elfPlay = guideHash[play[0]];
	const myPlay = guideHash[play[1]];

	const gameOutcome = gameMatrix[myPlay][elfPlay];

	const payValue = playValueHash[myPlay];
	const gameValue = gameValueHash[gameOutcome];
	return gameValue + payValue;
}

const output = guide
	.split('\r\n')
	.reduce((acc, it) => (acc + game(it.split(' '))), 0);

console.log(output);
