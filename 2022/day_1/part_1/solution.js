const fs = require('fs');

const rawElfList = fs.readFileSync('../input.txt', 'utf8');
const elfList = rawElfList
	.split('\r\n')
	.reduce((acc, it, index) => {
		if (index === 0) return [parseInt(it, 10)];
		if (it === '') return [...acc, 0];
		const calories = acc.pop();
		return [...acc, calories + parseInt(it, 10)];
	}, []);

let highestCalorie = 0;
for (const elfIndex in elfList) {
	if (elfList[elfIndex] < highestCalorie) continue;
	highestCalorie = elfList[elfIndex];
}

console.log(highestCalorie);
