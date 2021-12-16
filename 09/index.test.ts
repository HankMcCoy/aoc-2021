import {
	getHigherNeighbors,
	isInBounds,
	isLowPoint,
	parseInput,
	part1,
	part2,
} from './'

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n')
const grid = parseInput(input)

test('isInBounds', () => {
	expect(isInBounds(grid, { x: -1, y: 0 })).toBe(false)
	expect(isInBounds(grid, { x: 9, y: 0 })).toBe(true)
})

test('isLowPoint', () => {
	expect(isLowPoint(grid, { x: 1, y: 0 })).toBe(true)
})

test('Part 1', () => {
	expect(part1(input)).toBe(15)
})

test('getHigherNeighbors', () => {
	const higherNeighbors = getHigherNeighbors(grid, '6,0')
	expect(higherNeighbors).toContain('5,0')
	expect(higherNeighbors).toContain('6,1')
	expect(higherNeighbors.length).toBe(2)
})
test('Part 2', () => {
	expect(part2(input)).toBe(1134)
})
