import { run, getInputLines, getNeighbors } from '../util'

const forEveryCell = (
	grid: number[][],
	cb: (x: number, y: number) => void
): void => {
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			cb(x, y)
		}
	}
}
const hasFlashes = (grid: number[][]): boolean =>
	grid.flatMap((row) => row).some((x) => x > FLASH_THRESHOLD)

const FLASH_THRESHOLD = 9
const runStep = (energyLevels: number[][]): number => {
	let numFlashes = 0

	// Add one energy to every cell
	forEveryCell(energyLevels, (x, y) => {
		energyLevels[y][x] += 1
	})

	// Process flashes
	while (hasFlashes(energyLevels)) {
		forEveryCell(energyLevels, (x, y) => {
			if (energyLevels[y][x] > FLASH_THRESHOLD) {
				numFlashes += 1

				energyLevels[y][x] = 0
				getNeighbors(energyLevels, { x, y }, false).forEach((neighbor) => {
					if (energyLevels[neighbor.y][neighbor.x] !== 0) {
						energyLevels[neighbor.y][neighbor.x] += 1
					}
				})
			}
		})
	}

	return numFlashes
}
const parseEnergyLevels = (input: string[]): number[][] =>
	input.map((line) => line.split('').map((x) => parseInt(x, 10)))

export function part1(input: string[]): number {
	const energyLevels = parseEnergyLevels(input)

	let numFlashes = 0
	for (let i = 0; i < 100; i++) {
		numFlashes += runStep(energyLevels)
	}

	return numFlashes
}

const allFlashing = (energyLevels: number[][]): boolean =>
	energyLevels.flatMap((row) => row).every((v) => v === 0)
export function part2(input: string[]): number {
	const energyLevels = parseEnergyLevels(input)
	let i = 0
	while (!allFlashing(energyLevels)) {
		runStep(energyLevels)
		i++
	}
	return i
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
