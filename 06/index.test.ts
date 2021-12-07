import { part1, part2 } from './'

const input = '3,4,3,1,2'
test('Part 1', () => {
	expect(part1(input)).toBe(5934)
})

test('Part 2', () => {
	expect(part2(input)).toBe(26984457539)
})
