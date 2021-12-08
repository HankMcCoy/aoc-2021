import { run, getInputLines } from '../util'

/**
 * 1: 2 segments, cf
 * 7: 3 segments, acf
 * 4: 4 segments, bcdf
 * 2: 5 segments, acdeg
 * 3: 5 segments, acdfg
 * 5: 5 segments, abdfg
 * 0: 6 segments, abcefg
 * 6: 6 segments, abdefg
 * 9: 6 segments, abcdfg
 * 8: 7 segments, abcdefg
 */

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

type WireToSegmentMap = Map<string, string>
const getEntryMap = (signalPatterns: string[]): WireToSegmentMap => {
	return new Map()
}
export const getEntryOutput = (entry: NoteEntry): number => {
	const wireToSegmentMap = getEntryMap(entry.signalPatterns)
	return 0
}
export function part2(input: string[]): number {
	const noteEntries = input.map(parseLine)
	return noteEntries.map(getEntryOutput).reduce((a, b) => a + b)
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
