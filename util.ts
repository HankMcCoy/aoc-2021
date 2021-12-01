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

export function run(fnToRun: () => void) {
	if (process.env.NODE_ENV !== 'test') {
		fnToRun()
	}
}
