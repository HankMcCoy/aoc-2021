import { run, getInputLines } from '../util'

const BOARD_SIZE = 5

export function part1(bingoData: string[]): number {
	const drawOrder: number[] = bingoData[0]
		.split(',')
		.map((x) => parseInt(x, 10))
	const boardData: string[] = bingoData.slice(2)

	const boards: Array<number[][]> = []
	for (let i = 0; i < boardData.length; i += BOARD_SIZE + 1) {
		const boardLines: string[] = boardData.slice(i, i + BOARD_SIZE)
		boards.push(
			boardLines.map((line) =>
				line
					.split(' ')
					.filter((x) => x)
					.map((x) => parseInt(x, 10))
			)
		)
	}

	for (let drawIdx = 0; drawIdx < drawOrder.length; drawIdx++) {
		const drawnNumbers = drawOrder.slice(0, drawIdx + 1)

		// For each board, check to see if there was a win
		for (let board of boards) {
			// Check for column wins
			if (hasWin(board, drawnNumbers)) {
				// If there was, sum all unmarked numbers
				const unmarkedSum = board
					.flat()
					.filter((x) => !drawnNumbers.includes(x))
					.reduce((a, b) => a + b, 0)
				// Multiply that by the winning number
				return unmarkedSum * drawnNumbers[drawnNumbers.length - 1]
			}
		}
	}

	return 0
}

function hasWin(board: number[][], drawnNumbers: number[]): boolean {
	// Check for row wins
	for (let row = 0; row < BOARD_SIZE; row++) {
		let win = true
		for (let col = 0; col < BOARD_SIZE; col++) {
			win = win && drawnNumbers.includes(board[row][col])
		}
		if (win) return true
	}
	// Check for row wins
	for (let col = 0; col < BOARD_SIZE; col++) {
		let win = true
		for (let row = 0; row < BOARD_SIZE; row++) {
			win = win && drawnNumbers.includes(board[row][col])
		}
		if (win) return true
	}
	return false
}

export function part2(bingoData: string[]): number {
	return 0
}

run(() => {
	console.log('Part 1:', part1(getInputLines(__dirname, false)))
	console.log('Part 2:', part2(getInputLines(__dirname, false)))
})
