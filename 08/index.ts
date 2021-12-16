import { run, getInputLines } from '../util'

const segmentsToNum: { [index: string]: number } = {
	abcefg: 0,
	cf: 1,
	acdeg: 2,
	acdfg: 3,
	bcdf: 4,
	abdfg: 5,
	abdefg: 6,
	acf: 7,
	abcdefg: 8,
	abcdfg: 9,
}
interface SegmentToDigit {
	[index: string]: number
}
const segmentToDigit: SegmentToDigit = {
	abcefg: 0,
	cf: 1,
	acdeg: 2,
	acdfg: 3,
	bcdf: 4,
	abdfg: 5,
	abdefg: 6,
	acf: 7,
	abcdefg: 8,
	abcdfg: 9,
}

interface NoteEntry {
	signalPatterns: string[]
	outputValues: string[]
}
const parseLine = (line: string): NoteEntry => {
	const result =
		/(?<patterns>(?:[a-g]+ ?){10}) [|] (?<output>(?: ?[a-g]+){4})/.exec(line)
	if (!result || !result.groups) throw new Error(`Invalid line: ${line}`)

	return {
		signalPatterns: result.groups.patterns.split(' '),
		outputValues: result.groups.output.split(' '),
	}
}

export function part1(input: string[]): number {
	const noteEntries = input.map(parseLine)
	return noteEntries
		.flatMap((e) => e.outputValues)
		.reduce((sum, digitStr) => {
			return [2, 3, 4, 7].includes(digitStr.length) ? sum + 1 : sum
		}, 0)
}

const diff = <T>(s1: Set<T>, s2: Set<T>) =>
	new Set([...s1.values()].filter((x) => !s2.has(x)))
const getAppearanceCount = <T>(x: T, sets: Set<T>[]): number =>
	sets.filter((s) => s.has(x)).length

const verify = <T>(x: T | undefined): T => {
	if (x === undefined) throw new Error('Must not be undefined')
	return x
}

type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
type WireToSegment = Record<string, Segment>
const asSegment = (s: string): s is Segment => {
	if (!['a', 'b', 'c', 'd', 'e', 'f', 'g'].includes(s))
		throw new Error(`Invalid segment '${s}''`)
	return true
}

export const getEntryMap = (signalPatterns: string[]): WireToSegment => {
	const signalSets = signalPatterns.map(
		(s) => new Set<Segment>(s.split('').filter(asSegment))
	)

	const wiresFor7 = verify(signalSets.find((x) => x.size === 3))
	const wiresFor4 = verify(signalSets.find((x) => x.size === 4))
	const wiresFor1 = verify(signalSets.find((x) => x.size === 2))
	const signalsOfLen5 = signalSets.filter((s) => s.size === 5)
	const signalsOfLen6 = signalSets.filter((s) => s.size === 6)

	const wireForA = [...diff(wiresFor7, wiresFor1)][0]
	const wiresForBAndD = diff(wiresFor4, wiresFor1)
	const wireForF = [...wiresFor1].filter(
		(w) => getAppearanceCount(w, signalsOfLen6) === signalsOfLen6.length
	)[0]
	const wireForC = [...diff(wiresFor1, new Set([wireForF]))][0]
	const wireForB = [...wiresForBAndD].filter(
		(w) => getAppearanceCount(w, signalsOfLen5) === 1
	)[0]
	const wireForD = [...diff(wiresForBAndD, new Set([wireForB]))][0]
	const wiresForEAndG = diff(
		new Set<Segment>(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
		new Set([...wiresFor1, ...wiresFor4, ...wiresFor7])
	)
	const wireForG = [...wiresForEAndG].filter(
		(w) => getAppearanceCount(w, signalsOfLen6) === signalsOfLen6.length
	)[0]
	const wireForE = [...diff(wiresForEAndG, new Set([wireForG]))][0]

	return {
		[wireForA]: 'a',
		[wireForB]: 'b',
		[wireForC]: 'c',
		[wireForD]: 'd',
		[wireForE]: 'e',
		[wireForF]: 'f',
		[wireForG]: 'g',
	}
}
export const getEntryOutput = (
	entryMap: WireToSegment,
	outputValues: string[]
): number => {
	const convertWiresToSegments = (output: string): string =>
		output
			.split('')
			.map((c) => entryMap[c])
			.sort()
			.join('')

	const convertSegmentsToDigits = (c: string): number => {
		if (!Object.keys(segmentsToNum).includes(c))
			throw new Error(`Invalid entry ${c}`)
		return segmentsToNum[c]
	}

	const outputStr = outputValues
		.map(convertWiresToSegments)
		.map(convertSegmentsToDigits)
		.join('')

	return parseInt(outputStr, 10)
}
export function part2(input: string[]): number {
	const noteEntries = input.map(parseLine)
	return noteEntries.reduce(
		(sum, { signalPatterns, outputValues }) =>
			sum + getEntryOutput(getEntryMap(signalPatterns), outputValues),
		0
	)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
