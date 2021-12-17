import { part1, part2 } from './'

const smallInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.split('\n')
const mediumInput = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.split('\n')

const largeInput = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split('\n')

test('Part 1', () => {
	expect(part1(smallInput)).toBe(10)
	expect(part1(mediumInput)).toBe(19)
	expect(part1(largeInput)).toBe(226)
})

test('Part 2', () => {
	expect(part2(smallInput)).toBe(0)
})
