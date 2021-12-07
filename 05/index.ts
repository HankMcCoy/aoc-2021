import { run, getInputLines } from '../util'

interface Point {
	x: number
	y: number
}
interface Line {
	p1: Point
	p2: Point
}

const serializePoint = (p: Point): string => `${p.x},${p.y}`
const deserializePoint = (s: string): Point => {
	const r = /(?<x>\d+),(?<y>\d+)/.exec(s)
	if (!r || !r.groups) throw new Error('Invalid point')
	return { x: parseInt(r.groups.x, 10), y: parseInt(r.groups.y, 10) }
}
const parseLine = (str: string): Line => {
	const r = /(?<p1>[0-9,]+) -> (?<p2>[0-9,]+)/.exec(str)
	if (!r || !r.groups) throw new Error('BAD LINE')
	return {
		p1: deserializePoint(r.groups.p1),
		p2: deserializePoint(r.groups.p2),
	}
}

export const getPointsFromLine = ({ p1, p2 }: Line): Point[] => {
	// Gross ternaries
	const dY = p1.y === p2.y ? 0 : p1.y < p2.y ? 1 : -1
	const dX = p1.x === p2.x ? 0 : p1.x < p2.x ? 1 : -1

	return new Array<Point>(
		Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) + 1
	)
		.fill({ x: p1.x, y: p1.y })
		.map((p, i) => ({ x: p.x + dX * i, y: p.y + dY * i }))
}

export const getOverlapCounts = (lines: Line[]): Map<string, number> => {
	// Conver the lines to sets of points and then sum up how many times each point shows up
	const counts = new Map<string, number>()
	lines
		.flatMap(getPointsFromLine)
		.map(serializePoint)
		.forEach((p) => {
			counts.set(p, (counts.get(p) || 0) + 1)
		})

	return counts
}

const isHorizOrVert = ({ p1, p2 }: Line): boolean =>
	p1.x === p2.x || p1.y === p2.y

export function part1(input: string[]): number {
	// Get all the horizontal and vertical lines
	const lines = input.map((l) => parseLine(l)).filter(isHorizOrVert)
	const counts = getOverlapCounts(lines)

	// Return how many points show up at least twice
	return [...counts.values()].filter((x) => x >= 2).length
}

export function part2(input: string[]): number {
	// Get all the lines
	const lines = input.map((l) => parseLine(l))
	const counts = getOverlapCounts(lines)

	// Return how many points show up at least twice
	return [...counts.values()].filter((x) => x >= 2).length
}

run(() => {
	console.log('Part 1:', part1(getInputLines(__dirname, false)))
	console.log('Part 2:', part2(getInputLines(__dirname, false)))
})
