import { cloneBoard, emptyBoard, formatDateKey } from './board'
import { hashString, mulberry32, shuffle } from './rng'
import { solveBoard } from './solver'
import type { Board, Difficulty, PuzzleDefinition } from './types'

const clueTargets: Record<Difficulty, number> = {
  easy: 40,
  medium: 34,
  hard: 30,
  expert: 27,
}

const createSolvedBoard = (seed: string): Board => {
  const random = mulberry32(hashString(`${seed}:solution`))
  const board = emptyBoard()
  const result = solveBoard(board, 1, (digits) => shuffle(digits, random))
  if (!result.firstSolution) {
    throw new Error('Unable to generate solved board')
  }
  return result.firstSolution
}

const carvePuzzle = (solution: Board, seed: string, difficulty: Difficulty): Board => {
  const random = mulberry32(hashString(`${seed}:carve`))
  const puzzle = cloneBoard(solution)
  const targetClues = clueTargets[difficulty]
  const indexes = shuffle(
    Array.from({ length: 81 }, (_, index) => index),
    random,
  )

  let clueCount = 81

  for (const index of indexes) {
    if (clueCount <= targetClues) break

    const previous = puzzle[index]
    puzzle[index] = 0
    const { solutions } = solveBoard(puzzle, 2)
    if (solutions !== 1) {
      puzzle[index] = previous
      continue
    }
    clueCount -= 1
  }

  return puzzle
}

export const buildDailyPuzzle = (
  dateInput?: string,
  difficulty: Difficulty = 'medium',
): PuzzleDefinition => {
  const date = dateInput ?? formatDateKey(new Date())
  const seedBase = `${date}:${difficulty}`
  const solved = createSolvedBoard(seedBase)
  const given = carvePuzzle(solved, seedBase, difficulty)
  const clueCount = given.filter((value) => value !== 0).length

  return {
    id: `daily-${date}-${difficulty}`,
    date,
    difficulty,
    given,
    solution: solved,
    clueCount,
  }
}

export const listArchiveDates = (days = 60): string[] => {
  const now = new Date()
  const dates: string[] = []
  for (let i = 0; i < days; i += 1) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    dates.push(formatDateKey(date))
  }
  return dates
}
