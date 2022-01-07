import { part1, part2, getPairs, applyRulesToPair } from './'

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n')

test('Part 1', () => {
	expect(part1(input)).toBe(1588)
})

test('getPairs', () => {
	const pairs = getPairs('ABCDE')
	expect(pairs).toStrictEqual(['AB', 'BC', 'CD', 'DE'])
})
test('applyRulesToPair', () => {
	const result = applyRulesToPair('AB', { AB: 'C' })
	expect(result).toBe('AC')
})
test('Part 2', () => {
	expect(part2(input)).toBe(2_188_189_693_529)
})
