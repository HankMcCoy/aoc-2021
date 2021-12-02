import { run, getInputLines } from '../util'

interface Location {
	position: number
	depth: number
}
export function part1(cmds: string[]): Location {
	return cmds.reduce(
		({ position, depth }, cmd) => {
			const [_, dir, strVal] = /(forward|down|up) (\d+)/.exec(cmd) ?? []
			const val = parseInt(strVal, 10)
			switch (dir) {
				case 'forward':
					return { position: position + val, depth }
				case 'up':
					return { position, depth: depth - val }
				case 'down':
					return { position, depth: depth + val }
				default:
					throw new Error('Invalid direction')
			}
		},
		{ position: 0, depth: 0 }
	)
}

interface LocAndAim {
	position: number
	depth: number
	aim: number
}
export function part2(cmds: string[]): LocAndAim {
	return cmds.reduce(
		({ position, depth, aim }, cmd) => {
			const [_, dir, strVal] = /(forward|down|up) (\d+)/.exec(cmd) ?? []
			const val = parseInt(strVal, 10)
			switch (dir) {
				case 'forward':
					return { position: position + val, depth: depth + val * aim, aim }
				case 'up':
					return { position, depth, aim: aim - val }
				case 'down':
					return { position, depth, aim: aim + val }
				default:
					throw new Error('Invalid direction')
			}
		},
		{ position: 0, depth: 0, aim: 0 }
	)
}

run(() => {
	const inputLines = getInputLines(__dirname)

	const loc1 = part1(inputLines)
	console.log('Part 1:', loc1.position * loc1.depth)

	const loc2 = part2(inputLines)
	console.log('Part 2:', loc2.position * loc2.depth)
})
