console.log('------- MAX SUB ARRAY SUM ------');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxSubArraySum(nums, k) {
	let max = -Infinity;

	for (let i = 0; i < nums.length; i++) {
		let sum = nums.slice(i, i + k).reduce((a, b) => a + b, 0);

		max = Math.max(max, sum);
	}

	return max;
}

console.log(maxSubArraySum([1, 2, 3, 4, 5], 2) === 9); // 9 (4 + 5)
console.log(maxSubArraySum([5, -2, 3, 1, 2], 3) === 6); // 6 (3 + 1 + 2)
console.log(maxSubArraySum([-1, -2, -3, -4], 2) === -3); // -3 (-1 + -2)
console.log(maxSubArraySum([10, 20, 30, 5, 10], 3) === 60); // 60 (10 + 20 + 30)
console.log(maxSubArraySum([4, 3, 2, 1, 5, 6], 4) === 14); // 14 (3 + 2 + 1 + 5)
