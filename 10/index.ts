import { run, getInputLines } from '../util'

type Closer = ')' | ']' | '}' | '>'
type Opener = '(' | '[' | '{' | '<'
const chunkMatches = (opener: Opener, closer: Closer): boolean =>
	(opener === '(' && closer === ')') ||
	(opener === '[' && closer === ']') ||
	(opener === '{' && closer === '}') ||
	(opener === '<' && closer === '>')
const isCloser = (x: string | undefined): x is Closer =>
	!!x && [')', ']', '}', '>'].includes(x)
const ensureIsCloser = (x: string | undefined): x is Closer => {
	if (!isCloser(x)) throw new Error(`${x} is not a closer`)
	return true
}
const isOpener = (x: string | undefined): x is Opener =>
	!!x && ['(', '[', '{', '<'].includes(x)
const ensureIsOpener = (x: string | undefined): x is Opener => {
	if (!isOpener(x)) throw new Error(`${x} is not an opener`)
	return true
}

const peek = <T>(a: Array<T>): T | undefined => a[0]
const push = <T>(a: Array<T>, x: T): Array<T> => [x, ...a]
const pop = <T>([head, ...rest]: Array<T>): [T, Array<T>] => [head, rest]
const scoring = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
}
const getInvalidClosingCharacter = (line: string): Closer | undefined => {
	let stack: Array<Opener> = []
	for (let i = 0; i < line.length; i++) {
		const last = peek(stack)
		const cur = line[i]
		if (last) {
			// If the current character is an opener, push it on the stack
			if (isOpener(cur)) {
				stack = push(stack, cur)
			} else if (isCloser(cur)) {
				if (chunkMatches(last, cur)) {
					// If it is a closer that matches the last opener, remove the last opener
					stack = pop(stack)[1]
				} else {
					// If it is a closer that DOESN'T match the last opener, return invalid
					return cur
				}
			} else {
				throw new Error(`Invalid character ${cur}`)
			}
		} else {
			// If we don't have anything on the stack, start a new chunk
			const v = line[i]
			if (ensureIsOpener(v)) {
				stack = push(stack, v)
			}
		}
	}
	return undefined
}

export function part1(input: string[]): number {
	return input
		.map(getInvalidClosingCharacter)
		.filter(isCloser)
		.map((c) => scoring[c])
		.reduce((a, b) => a + b)
}

export function part2(input: string[]): number {
	return 0
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
