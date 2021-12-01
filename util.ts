import { readFileSync } from 'fs'
import * as path from 'path'

export const getInputInts = (dir: string) =>
	getInputLines(dir).map((t) => parseInt(t, 10))

export const getInputFloats = (dir: string) =>
	getInputLines(dir).map((t) => parseFloat(t))

export function getInputLines(dir: string) {
	const input = readFileSync(path.join(dir, './input.txt'), {
		encoding: 'utf-8',
	})
	return input.split('\n').filter((x) => x)
}

/**
 * This little utility just doesn't run the function it is given if the process
 * is running in a test environment. This enables me to put my testable pure
 * functions in the same file as my "write the solution to the console given the
 * actual input" code, but avoid having the latter bit run during tests.
 */
export function run(fnToRun: () => void) {
	if (process.env.NODE_ENV !== 'test') {
		fnToRun()
	}
}
