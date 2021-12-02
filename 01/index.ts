import { run, getInputInts } from '../util'

/**
 * "Couldn't you do this more elegantly in a functional style?" I hear you say.
 * Could I? Absolutely. Would it be as universally easy to read? I would argue
 * no.
 */
export function part1(nums: number[]) {
	let numIncreases = 0
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i - 1]) numIncreases++
	}
	return numIncreases
}

/**
 * If we're comparing the sum of two 3-measurement windows, but two of the
 * measurements in each window are the same, we don't _actually_ need to sum the
 * whole window. We can just compare the first measurement of the first window
 * to the last measurement of the last window.
 */
export function part2(nums: number[]) {
	let numIncreases = 0
	for (let i = 3; i < nums.length; i++) {
		if (nums[i] > nums[i - 3]) numIncreases++
	}
	return numIncreases
}

run(() => {
	const inputNums = getInputInts(__dirname)
	console.log('PART 1:', part1(inputNums))
	console.log('PART 2:', part2(inputNums))
})
