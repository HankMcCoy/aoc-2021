import { run, getInputLines } from '../util'

export function part1(diagnostic: string[]): number {
	const numDigits = diagnostic[0].length
	const numOnesByPlace = new Array<number>(numDigits).fill(0)
	diagnostic.forEach((line) => {
		line.split('').forEach((bit, i) => {
			if (bit === '1') numOnesByPlace[i] += 1
		})
	})
	const gammaStr = numOnesByPlace
		.map((c) => (c >= diagnostic.length / 2 ? '1' : '0'))
		.join('')
	const gamma = parseInt(gammaStr, 2)

	// Bitwise NOT gamma to get epsilon, but mask it to only the digits we care about.
	const epsilon = ~gamma & (2 ** numDigits - 1)

	return gamma * epsilon
}

function getRating(
	diagnostic: string[],
	type: 'OXYGEN_GENERATOR' | 'CO2_SCRUBBER'
): number {
	let candidates = [...diagnostic]
	const numDigits = diagnostic[0].length

	for (let i = 0; i < numDigits; i++) {
		const numOnes = candidates.reduce((n, c) => (c[i] === '1' ? n + 1 : n), 0)
		const mostCommonDigit = numOnes >= candidates.length / 2 ? '1' : '0'

		candidates = candidates.filter(
			type === 'OXYGEN_GENERATOR'
				? (c) => c[i] === mostCommonDigit
				: (c) => c[i] !== mostCommonDigit
		)

		if (candidates.length === 1) return parseInt(candidates[0], 2)
	}
	throw new Error('Uh oh, failed to filter to a single number')
}

export function part2(diagnostic: string[]): number {
	return (
		getRating(diagnostic, 'OXYGEN_GENERATOR') *
		getRating(diagnostic, 'CO2_SCRUBBER')
	)
}

run(() => {
	console.log('Part 1:', part1(getInputLines(__dirname)))
	console.log('Part 2:', part2(getInputLines(__dirname)))
})
