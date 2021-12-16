import { run, getInputLines } from '../util'

export const isInBounds = (grid: number[][], { x, y }: Point): boolean =>
	x >= 0 && x < grid[0].length && y >= 0 && y < grid.length

export const isLowPoint = (grid: number[][], { x, y }: Point): boolean => {
	const adjacentValues: Array<number> = []
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (Math.abs(dx) === Math.abs(dy)) continue

			const neighbor = { x: x + dx, y: y + dy }
			if (isInBounds(grid, neighbor)) {
				adjacentValues.push(grid[neighbor.y][neighbor.x])
			}
		}
	}

	return adjacentValues.every((v) => v > grid[y][x])
}

const getRiskLevel = (grid: number[][], { x, y }: Point): number =>
	grid[y][x] + 1

interface Point {
	x: number
	y: number
}

export const parseInput = (input: string[]): number[][] =>
	input.map((line) => line.split('').map((c) => parseInt(c, 10)))

export function part1(input: string[]): number {
	const grid: number[][] = parseInput(input)
	const lowPoints: Array<Point> = []
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (isLowPoint(grid, { x, y })) lowPoints.push({ x, y })
		}
	}
	return lowPoints.reduce((sum, p) => sum + getRiskLevel(grid, p), 0)
}

export function part2(input: string[]): number {
	return 0
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
