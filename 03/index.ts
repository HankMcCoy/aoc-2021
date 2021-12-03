import { run, getInputLines } from '../util'

export function part1(diagnostic: string[]): number {
	const numDigits = diagnostic[0].length
	const numOnesByPlace = new Array<number>(numDigits).fill(0)
	diagnostic.forEach((line) => {
		line.split('').forEach((bit, i) => {
			if (bit === '1') numOnesByPlace[i] += 1
		})
	})

	const gamma = parseInt(
		numOnesByPlace
			.map((c) => (c >= diagnostic.length / 2 ? '1' : '0'))
			.join(''),
		2
	)

	// Bitwise NOT gamma to get epsilon, but mask it to only the digits we care about.
	const epsilon = ~gamma & (2 ** numDigits - 1)

	return gamma * epsilon
}

run(() => {
	console.log('Part 1:', part1(getInputLines(__dirname)))
})
