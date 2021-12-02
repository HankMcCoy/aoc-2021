import { run, getInputLines } from '../util'

interface Location {
	position: number
	depth: number
}
export function part1(cmds: string[]): Location {
	const loc = { position: 0, depth: 0 }
	cmds.forEach((cmd) => {
		const dir = cmd.split(' ')[0]
		const val = parseInt(cmd.split(' ')[1])

		if (dir === 'forward') loc.position += val
		else if (dir === 'up') loc.depth -= val
		else if (dir === 'down') loc.depth += val
	})
	return loc
}

interface LocAndAim {
	position: number
	depth: number
	aim: number
}
export function part2(cmds: string[]): LocAndAim {
	const loc = { position: 0, depth: 0, aim: 0 }
	cmds.forEach((cmd) => {
		const dir = cmd.split(' ')[0]
		const val = parseInt(cmd.split(' ')[1])

		if (dir === 'forward') {
			loc.position += val
			loc.depth += val * loc.aim
		} else if (dir === 'up') {
			loc.aim -= val
		} else if (dir === 'down') {
			loc.aim += val
		}
	})
	return loc
}

run(() => {
	const inputLines = getInputLines(__dirname)

	const loc1 = part1(inputLines)
	console.log('Part 1:', loc1.position * loc1.depth)

	const loc2 = part2(inputLines)
	console.log('Part 2:', loc2.position * loc2.depth)
})
