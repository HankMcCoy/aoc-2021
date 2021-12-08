import { run, getInputLines } from '../util'

const range = (start: number, stop: number): number[] =>
	new Array(stop - start).fill(start).map((x, i) => x + i)

const getPosCounts = (input: string[]): Map<number, number> => {
	const positions = input[0].split(',').map((x) => parseInt(x, 10))

	const posCounts = new Map<number, number>()
	positions.forEach((p) => {
		const prevCount = posCounts.get(p) || 0
		posCounts.set(p, prevCount + 1)
	})
	return posCounts
}

export function part1(input: string[]): number {
	const posCounts = getPosCounts(input)
	const minPos = Math.min(...posCounts.keys())
	const maxPos = Math.max(...posCounts.keys())

	const fuelCosts = range(minPos, maxPos).map((alignmentPos) => {
		return [...posCounts.entries()].reduce(
			(fuel, [pos, count]) => fuel + Math.abs(pos - alignmentPos) * count,
			0
		)
	})

	return Math.min(...fuelCosts)
}

export const gaussSum = (n: number): number => {
	if (n === 0) return 0
	if (n % 2 === 1) return n + gaussSum(n - 1)
	return ((n + 1) * n) / 2
}

export function part2(input: string[]): number {
	const posCounts = getPosCounts(input)
	const minPos = Math.min(...posCounts.keys())
	const maxPos = Math.max(...posCounts.keys())

	const fuelCosts = range(minPos, maxPos).map((alignmentPos) => {
		return [...posCounts.entries()].reduce((fuel, [pos, count]) => {
			const dist = Math.abs(pos - alignmentPos)
			const fuelCost = gaussSum(dist)

			return fuel + fuelCost * count
		}, 0)
	})

	return Math.min(...fuelCosts)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
