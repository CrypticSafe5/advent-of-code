// Loop line by line
// Parse out known letter, accepted positions, and password
// If valid, add to total count

const { readFileSync } = require('fs');

let output = 0;
const list = readFileSync('../input.txt', 'utf8').split('\r\n');
list.forEach((e) => {
	if (!e) return; // Stupid VSCode adding empty line :/
	const initialSplit = e.split(': ');
	const secondarySplit = initialSplit[0].split(' ');

	const letter = secondarySplit[1];
	const positions = secondarySplit[0].split('-').map((e) => (parseInt(e, 10) - 1)); // 1 based index
	const password = initialSplit[1];

	if (
		(
			password[positions[0]] === letter
			&& password[positions[1]] !== letter
		)
		|| (
			password[positions[0]] !== letter
			&& password[positions[1]] === letter
		)
	) output++;
});

console.log('OUTPUT:', output);
