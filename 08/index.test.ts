import { part1, part2, getEntryOutput, getEntryMap } from './'

const input =
	`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.split(
		'\n'
	)

test('Part 1', () => {
	expect(part1(input)).toBe(26)
})

test('Part 2', () => {
	expect(part2(input)).toBe(61229)
})

test('getEntryMap', () => {
	const entryMap = getEntryMap(
		'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' ')
	)
	expect(entryMap.d).toBe('a')
	expect(entryMap.e).toBe('b')
	expect(entryMap.a).toBe('c')
	expect(entryMap.f).toBe('d')
	expect(entryMap.g).toBe('e')
	expect(entryMap.b).toBe('f')
	expect(entryMap.c).toBe('g')
})

test('getEntryOutput', () => {
	const entryMap = getEntryMap(
		'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' ')
	)
	expect(getEntryOutput(entryMap, 'cdfeb fcadb cdfeb cdbaf'.split(' '))).toBe(
		5353
	)
})
