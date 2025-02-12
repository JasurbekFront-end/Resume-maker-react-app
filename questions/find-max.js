console.log('-------FIND MAX------');

/**
 *
 * @param {string[]} list
 */
function findMax(list) {
	let max = Number.MIN_SAFE_INTEGER;

	for (const item of list) {
		const num = Number(item);
		const value = isNaN(num) ? item.length : num;

		max = Math.max(max, value);
	}

	return max;
}

console.log(findMax(['alic3', 'bob', '3', '4', '00000']) === 5);
console.log(findMax(['bobur', '22', '15', 'arslonbek good boy']) === 22);
console.log(findMax(['pdp', 'pdp22', '14']) === 14);
console.log(findMax(['03', '02', 'pdp8']) === 4);
console.log(findMax(['abc', 'cccc', '6']) === 6);
console.log(findMax(['abc', 'bbb', 'cccc']) === 4);
