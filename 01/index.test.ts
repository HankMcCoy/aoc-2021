import { part1, part2 } from './'

test('Part 1', () => {
	const input = [1, 2, 3]
	expect(part1(input)).toBe(2)
})

test('Part 2', () => {
	const input = [1, 2, 3, 0, 5, 4]
	expect(part2(input)).toBe(2)
})
