import { part1, part2 } from './'

test('Day 2, Part 1', () => {
	const { position, depth } = part1([
		'forward 5',
		'down 5',
		'forward 8',
		'up 3',
		'down 8',
		'forward 2',
	])
	expect(position).toBe(15)
	expect(depth).toBe(10)
})

test('Day 2, Part 2', () => {
	const { position, depth } = part2([
		'forward 5',
		'down 5',
		'forward 8',
		'up 3',
		'down 8',
		'forward 2',
	])
	expect(position).toBe(15)
	expect(depth).toBe(60)
})
