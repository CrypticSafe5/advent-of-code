const fs = require('fs');

const rawElfList = fs.readFileSync('../input.txt', 'utf8');
const elfList = rawElfList
	.split('\r\n')
	.reduce((acc, it, index) => {
		if (index === 0) return [parseInt(it, 10)];
		if (it === '') return [...acc, 0];
		const calories = acc.pop();
		return [...acc, calories + parseInt(it, 10)];
	}, [])
	.sort((a, b) => {
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	});

console.log(elfList[0] + elfList[1] + elfList[2]);
