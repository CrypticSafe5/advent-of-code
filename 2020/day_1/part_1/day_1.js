// Find 2 items that add to 2020
// Return the result of multiplying the two items

const { readFileSync } = require('fs');

const sumSolution = [];
const list = readFileSync('./expense_report.txt', 'utf8').split('\r\n').map((e) => parseInt(e, 10));

list.forEach((x) => {
	list.forEach((y) => {
		if ((x + y) === 2020) sumSolution.push([x, y]);
	});
});

console.log('OUTPUT: ', sumSolution.map(([x, y]) => x * y));
