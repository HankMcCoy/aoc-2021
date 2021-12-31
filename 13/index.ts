import {
	run,
	getInputLines,
	Point,
	uniqifyPoints,
	serializePoint,
} from '../util'

type Dir = 'x' | 'y'
interface Fold {
	dir: 'x' | 'y'
	pos: number
}
const isDir = (s: string): s is Dir => {
	return s === 'x' || s === 'y'
}
export const parseInput = (input: string[]) => {
	const split = input.indexOf('')
	const pointLines = input.slice(0, split)
	const foldInstructions = input.slice(split + 1)

	return {
		points: pointLines.map((line) => {
			const [x, y] = line.split(',').map((c) => parseInt(c, 10))
			return { x, y }
		}),
		folds: foldInstructions.map((line) => {
			const [dir, pos] = line.split(' ').reverse()[0].split('=')
			if (!isDir(dir)) throw new Error(`Bad direction, ${dir}`)
			return { dir, pos: parseInt(pos, 10) }
		}),
	}
}

export const foldPoint = (p: Point, { dir, pos }: Fold): Point => ({
	...p,
	[dir]: p[dir] > pos ? pos - (p[dir] - pos) : p[dir],
})

const applyFold = (points: Point[], { dir, pos }: Fold): Point[] => {
	return uniqifyPoints(
		points.map((p) => ({
			...p,
			[dir]: p[dir] > pos ? pos - (p[dir] - pos) : p[dir],
		}))
	)
}

const applyFolds = (
	points: Point[],
	[firstFold, ...nextFolds]: Fold[]
): Point[] => {
	const newPoints = applyFold(points, firstFold)
	return nextFolds.length ? applyFolds(newPoints, nextFolds) : newPoints
}

export function part1(input: string[]): number {
	const { points, folds } = parseInput(input)

	const finalPoints = applyFold(points, folds[0])
	return finalPoints.length
}

const printPoints = (points: Point[]): string => {
	const maxX = Math.max(...points.map((p) => p.x))
	const maxY = Math.max(...points.map((p) => p.y))

	const pSet = new Set([...points.map(serializePoint)])

	let result = ''
	for (let y = 0; y <= maxY; y++) {
		let line = ''
		for (let x = 0; x <= maxX; x++) {
			line += pSet.has(serializePoint({ x, y })) ? '#' : ' '
		}
		result += line + '\n'
	}
	return result
}
export function part2(input: string[]) {
	const { points, folds } = parseInput(input)

	const finalPoints = applyFolds(points, folds)
	return printPoints(finalPoints)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname, false)))
	console.log('Part 2')
	console.log(part2(getInputLines(__dirname, false)))
})
