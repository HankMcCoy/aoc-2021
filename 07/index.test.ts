import { part1, part2, gaussSum } from './'

const input = ['16,1,2,0,4,2,7,1,2,14']

test('Part 1', () => {
	expect(part1(input)).toBe(37)
})

test('Part 2', () => {
	expect(part2(input)).toBe(168)
})

test('gaussSum', () => {
	expect(gaussSum(0)).toBe(0)
	expect(gaussSum(1)).toBe(1)
	expect(gaussSum(5)).toBe(15)
	expect(gaussSum(1000)).toBe(500500)
	expect(gaussSum(1001)).toBe(501501)
})
