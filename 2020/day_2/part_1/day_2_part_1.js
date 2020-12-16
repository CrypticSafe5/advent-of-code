// Loop line by line
// Parse out known letter, acceptable iterations, and password
// If valid, add to total count

const { readFileSync } = require('fs');

let output = 0;
const list = readFileSync('../input.txt', 'utf8').split('\r\n');
list.forEach((e) => {
	if (!e) return;
	const initialSplit = e.split(': ');
	const secondarySplit = initialSplit[0].split(' ');

	const letter = secondarySplit[1];
	const range = secondarySplit[0].split('-').map((e) => parseInt(e, 10));
	const password = initialSplit[1];

	const letterCount = password.split('').filter((e) => e === letter).length;
	if (
		password.includes(letter)
		&& letterCount >= range[0]
		&& letterCount <= range[1]
	) output++;
});

console.log('OUTPUT:', output);
