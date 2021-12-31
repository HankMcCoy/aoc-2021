import { part1, part2, parseInput, foldPoint } from './'

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.split('\n')

test('parseInput', () => {
	const result = parseInput(
		`0,1
3,5

fold along x=5
fold along y=7`.split('\n')
	)

	expect(result).toStrictEqual({
		points: [
			{ x: 0, y: 1 },
			{ x: 3, y: 5 },
		],
		folds: [
			{ dir: 'x', pos: 5 },
			{ dir: 'y', pos: 7 },
		],
	})
})

test('foldPoint, on y, past fold', () => {
	const result = foldPoint({ x: 3, y: 35 }, { dir: 'y', pos: 28 })

	expect(result.x).toBe(3)
	expect(result.y).toBe(21)
})
test('foldPoint, on y, pre fold', () => {
	const result = foldPoint({ x: 3, y: 21 }, { dir: 'y', pos: 28 })

	expect(result.x).toBe(3)
	expect(result.y).toBe(21)
})
test('foldPoint, on x, post fold', () => {
	const result = foldPoint({ x: 14, y: 0 }, { dir: 'x', pos: 7 })

	expect(result.x).toBe(0)
	expect(result.y).toBe(0)
})

test('Part 1', () => {
	expect(part1(input)).toBe(17)
})

test('Part 2', () => {
	expect(part2(input)).toBe(`#####
#   #
#   #
#   #
#####
`)
})
