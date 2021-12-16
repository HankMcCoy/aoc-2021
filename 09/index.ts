import { run, getInputLines } from '../util'

type Grid = number[][]

export const isInBounds = (grid: Grid, { x, y }: Point): boolean =>
	x >= 0 && x < grid[0].length && y >= 0 && y < grid.length

const getNeighbors = (grid: Grid, { x, y }: Point): Array<Point> => {
	const neighbors = []
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (Math.abs(dx) === Math.abs(dy)) continue

			const neighbor = { x: x + dx, y: y + dy }
			if (isInBounds(grid, neighbor)) {
				neighbors.push(neighbor)
			}
		}
	}
	return neighbors
}

export const isLowPoint = (grid: Grid, p: Point): boolean =>
	getNeighbors(grid, p)
		.map((n) => grid[n.y][n.x])
		.every((v) => v > grid[p.y][p.x])

const getLowPoints = (grid: Grid): Array<Point> => {
	const lowPoints: Array<Point> = []
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (isLowPoint(grid, { x, y })) lowPoints.push({ x, y })
		}
	}
	return lowPoints
}

const getRiskLevel = (grid: Grid, { x, y }: Point): number => grid[y][x] + 1

interface Point {
	x: number
	y: number
}

export const parseInput = (input: string[]): number[][] =>
	input.map((line) => line.split('').map((c) => parseInt(c, 10)))

export function part1(input: string[]): number {
	const grid = parseInput(input)
	return getLowPoints(grid).reduce((sum, p) => sum + getRiskLevel(grid, p), 0)
}

const serializePoint = ({ x, y }: Point): string => `${x},${y}`
const deserializePoint = (s: string): Point => {
	const [x, y] = s.split(',').map((x) => parseInt(x, 10))
	return { x, y }
}

const uniq = <T>(a: Array<T>): Array<T> => [...new Set([...a]).values()]

export const getHigherNeighbors = (grid: Grid, pStr: string): Array<string> => {
	const p = deserializePoint(pStr)
	return getNeighbors(grid, p)
		.filter((n) => {
			const nVal = grid[n.y][n.x]
			return nVal >= grid[p.y][p.x] && nVal !== 9
		})
		.map(serializePoint)
}
export const getBasinSize = (grid: Grid, lowPoint: Point): number => {
	let basin: Array<string> = [serializePoint(lowPoint)]
	while (true) {
		const prevSize = basin.length
		basin = uniq([
			...basin,
			...basin.flatMap((pStr) => getHigherNeighbors(grid, pStr)),
		])
		if (basin.length === prevSize) break
	}
	return basin.length
}

export function part2(input: string[]): number {
	const grid = parseInput(input)
	const lowPoints = getLowPoints(grid)

	const basinSizes = lowPoints
		.map((p) => getBasinSize(grid, p))
		.sort((a, b) => b - a)

	return basinSizes.slice(0, 3).reduce((a, b) => a * b)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
