// Loop for height of map
// If next position is off side of map
// Round position back from zero and count diff
// Check if next position is on "#", if so output++

const { readFileSync } = require('fs');

let output = 0;
const map = readFileSync('../input.txt', 'utf8').split('\r\n');

const mapWidth = map[0].length;
const xDiff = 3;
const yDiff = 1;

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

console.log('OUTPUT:', output);
