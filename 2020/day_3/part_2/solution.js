// INCOMPLETE

// Loop for height of map
// If next position is off side of map
// Round position back from zero and count diff
// Check if next position is on "#", if so output++

const { readFileSync } = require('fs');

const map = readFileSync('../input.txt', 'utf8').split('\r\n');

function countCollisions(xDiff, yDiff) {
	let output = 0;
	const mapWidth = map[0].length;

	let x = 0;
	let y = 0;

	map.forEach((e, i) => {
		if (i !== y) return;

		let nextX = x + xDiff;
		if (e[x] === '#') output++;

		// Next position
		if (nextX >= mapWidth) {
			x = nextX - mapWidth;
		} else {
			x = nextX;
		}
		y += yDiff;
	});

	return output;
}

let output = 1;
[
	[1, 1],
	[3, 1],
	[5, 1],
	[7, 1],
	[1, 2]
].map(([x, y]) => countCollisions(x, y))
	.forEach((e) => output *= e);

console.log('OUTPUT: ', output);
