import { run, getInputLines, uniq } from '../util'

type AdjacencyList = Record<string, string[]>
const addEdge = (
	adjList: AdjacencyList,
	node1: string,
	node2: string
): void => {
	adjList[node1] = [...(adjList[node1] || []), node2]
	adjList[node2] = [...(adjList[node2] || []), node1]
}

const isUpperCase = (s: string): boolean => s.toUpperCase() === s
type Path = string[]

export function part1(input: string[]): number {
	function getNextPaths(adjList: AdjacencyList, path: Path): Path[] {
		const last = path[path.length - 1]
		if (last === 'end') return [path]

		const adjNodes = adjList[last] || []
		// For the current path, find the next steps.
		// I.e. adjacent nodes, excluding the start and any small caves we've already visited
		const validNextSteps = adjNodes
			.filter((n) => n !== 'start')
			.filter((n) => isUpperCase(n) || !path.includes(n))

		return validNextSteps.length
			? validNextSteps.flatMap((n) => getNextPaths(adjList, [...path, n]))
			: []
	}
	const adjList: AdjacencyList = {}
	input.forEach((line) => {
		const nodes = line.split('-')
		addEdge(adjList, nodes[0], nodes[1])
	})

	// Return
	const paths = getNextPaths(adjList, ['start'])
	return paths.length
}

const hasDuplicateSmallCave = (path: Path): boolean => {
	const smallCaves = path.filter((n) => n.toLowerCase() === n)
	return smallCaves.length !== uniq(smallCaves).length
}
export function part2(input: string[]): number {
	function getNextPaths(adjList: AdjacencyList, path: Path): Path[] {
		const last = path[path.length - 1]
		if (last === 'end') return [path]

		const adjNodes = adjList[last] || []
		// For the current path, find the next steps.
		// I.e. adjacent nodes, excluding the start and any small caves we've already visited
		const validNextSteps = adjNodes
			.filter((n) => n !== 'start')
			.filter(
				(n) =>
					isUpperCase(n) || !path.includes(n) || !hasDuplicateSmallCave(path)
			)

		return validNextSteps.length
			? validNextSteps.flatMap((n) => getNextPaths(adjList, [...path, n]))
			: []
	}
	const adjList: AdjacencyList = {}
	input.forEach((line) => {
		const nodes = line.split('-')
		addEdge(adjList, nodes[0], nodes[1])
	})

	// Return
	const paths = getNextPaths(adjList, ['start'])
	return paths.length
}

run(() => {
	console.log('Part 1', part1(getInputLines(__dirname)))
	console.log('Part 2', part2(getInputLines(__dirname)))
})
