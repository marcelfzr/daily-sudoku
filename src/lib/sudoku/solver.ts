import {
  cloneBoard,
  countBits,
  getCandidatesMask,
  isValidPlacement,
  maskToDigits,
} from './board'
import type { Board, CellValue } from './types'

type SearchResult = {
  solutions: number
  firstSolution: Board | null
}

const findBestCell = (board: Board) => {
  let bestIndex = -1
  let bestMask = 0
  let bestCount = Number.POSITIVE_INFINITY

  for (let i = 0; i < board.length; i += 1) {
    if (board[i] !== 0) continue
    const mask = getCandidatesMask(board, i)
    const candidateCount = countBits(mask)
    if (candidateCount === 0) return { index: i, mask: 0, count: 0 }
    if (candidateCount < bestCount) {
      bestCount = candidateCount
      bestIndex = i
      bestMask = mask
      if (candidateCount === 1) break
    }
  }

  return { index: bestIndex, mask: bestMask, count: bestCount }
}

const backtrack = (
  board: Board,
  limit: number,
  result: SearchResult,
  randomOrder?: (digits: CellValue[]) => CellValue[],
) => {
  if (result.solutions >= limit) return

  const { index, mask, count } = findBestCell(board)
  if (index === -1) {
    result.solutions += 1
    if (!result.firstSolution) result.firstSolution = cloneBoard(board)
    return
  }
  if (count === 0) return

  const candidates = maskToDigits(mask)
  const order = randomOrder ? randomOrder(candidates) : candidates

  for (const value of order) {
    if (!isValidPlacement(board, index, value)) continue
    board[index] = value
    backtrack(board, limit, result, randomOrder)
    board[index] = 0
    if (result.solutions >= limit) return
  }
}

export const solveBoard = (
  board: Board,
  limit = 1,
  randomOrder?: (digits: CellValue[]) => CellValue[],
): SearchResult => {
  const working = cloneBoard(board)
  const result: SearchResult = { solutions: 0, firstSolution: null }
  backtrack(working, limit, result, randomOrder)
  return result
}

export const hasUniqueSolution = (board: Board) => solveBoard(board, 2).solutions === 1
