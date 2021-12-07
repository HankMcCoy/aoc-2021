import { part1, part2, getPointsFromLine } from './'

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe(5)
})

test('getPointsFromLine - Works with vertical lines', () => {
	const points = getPointsFromLine({ p1: { x: 0, y: 10 }, p2: { x: 0, y: 7 } })
	expect(points.length).toBe(4)
	expect(points.find((p) => p.x === 0 && p.y === 10)).toBeTruthy()
	expect(points.find((p) => p.x === 0 && p.y === 7)).toBeTruthy()
})

test('getPointsFromLine - Works with horizontal lines', () => {
	const points = getPointsFromLine({ p1: { x: 10, y: 5 }, p2: { x: 15, y: 5 } })
	expect(points.length).toBe(6)
	expect(points.find((p) => p.x === 10 && p.y === 5)).toBeTruthy()
	expect(points.find((p) => p.x === 15 && p.y === 5)).toBeTruthy()
})

test('Part 2', () => {
	expect(part2(input)).toBe(12)
})
