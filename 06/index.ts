import { getInputLines, run } from '../util'

export function part1(input: string): number {
	let fishTimers = input.split(',').map((x) => parseInt(x, 10))

	for (let i = 0; i < 80; i++) {
		fishTimers = fishTimers.flatMap((t) => (t === 0 ? [6, 8] : [t - 1]))
	}
	return fishTimers.length
}

export function part2(input: string): number {
	let fishTimers = input
		.split(',')
		.map((x) => parseInt(x, 10))
		.reduce((m, t) => {
			m.set(t, (m.get(t) || 0) + 1)
			return m
		}, new Map<number, number>())

	for (let i = 0; i < 256; i++) {
		const nextFishTimers = new Map<number, number>()
		for (let count = 7; count >= 0; count--) {
			nextFishTimers.set(count, fishTimers.get(count + 1) || 0)
		}
		const spawning = fishTimers.get(0) || 0
		nextFishTimers.set(8, spawning)
		nextFishTimers.set(6, spawning + (nextFishTimers.get(6) || 0))
		fishTimers = nextFishTimers
	}
	return [...fishTimers.values()].reduce((a, b) => a + b)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)[0]))
	console.log('Part 2', part2(getInputLines(__dirname)[0]))
})
