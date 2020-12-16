// Find 3 items that add to 2020
// Return the result of multiplying the three items

const { readFileSync } = require('fs');

const sumSolution = [];
const list = readFileSync('../part_1/expense_report.txt', 'utf8').split('\r\n').map((e) => parseInt(e, 10));

list.forEach((x) => {
	list.forEach((y) => {
		list.forEach((z) => {
			if ((x + y + z) === 2020) sumSolution.push([x, y, z]);
		});
	});
});

console.log('OUTPUT: ', sumSolution.map(([x, y, z]) => x * y * z));
