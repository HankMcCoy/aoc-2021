import { objectExpression } from '@babel/types'
import { run, getInputLines, splitOnEmpty, isNotUndefined } from '../util'

type RuleSet = Record<string, string>

function parseRules(lines: string[]): RuleSet {
	return lines
		.map((l) => {
			const regExpResult = /([A-Z]{2}) -> ([A-Z])/.exec(l)
			if (!regExpResult) throw new Error('What a dumb rule')

			return {
				pair: regExpResult[1],
				insert: regExpResult[2],
			}
		})
		.reduce(
			(ruleSet, { pair, insert }) => ({ ...ruleSet, [pair]: insert }),
			{} as RuleSet
		)
}
export const getPairs = (polymer: string): string[] =>
	polymer
		.split('')
		.map((_, i, arr) => (arr[i + 1] ? arr[i] + arr[i + 1] : undefined))
		.filter(isNotUndefined)

export const applyRulesToPair = (pair: string, rules: RuleSet): string => {
	if (!rules[pair]) throw new Error(`Invalid pair: ${pair}`)
	return pair[0] + rules[pair]
}

function applyRules(polymer: string, rules: RuleSet): string {
	const pairs = getPairs(polymer)
	return (
		pairs.map((p) => applyRulesToPair(p, rules)).join('') +
		polymer[polymer.length - 1]
	)
}

function getElementCounts(polymer: string): Record<string, number> {
	return polymer.split('').reduce((counts, element) => {
		counts[element] = (counts[element] || 0) + 1
		return counts
	}, {} as Record<string, number>)
}
export function part1(input: string[]): number {
	let [templateLines, rulesLines] = splitOnEmpty(input)
	const rules = parseRules(rulesLines)
	let curPolymer = templateLines[0]

	for (let i = 0; i < 10; i++) {
		curPolymer = applyRules(curPolymer, rules)
	}
	const counts = Object.values(getElementCounts(curPolymer)).sort(
		(a, b) => a - b
	)
	return counts[counts.length - 1] - counts[0]
}

export function part2(input: string[]): number {
	return 0
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
