import { run, getInputInts } from '../util'

export function part1(nums: number[]) {
	let numIncrease = 0
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i - 1]) numIncrease++
	}
	return numIncrease
}

run(() => {
	const inputNums = getInputInts(__dirname)
	console.log('PART 1:', part1(inputNums))
})
