import type { Board, CellValue } from './types'

export const BOARD_SIZE = 9
export const CELL_COUNT = 81
export const ALL_DIGITS_MASK = 0b1111111110

export const DIGITS: CellValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const toIndex = (row: number, col: number) => row * BOARD_SIZE + col

export const toRowCol = (index: number) => ({
  row: Math.floor(index / BOARD_SIZE),
  col: index % BOARD_SIZE,
})

export const cloneBoard = (board: Board): Board => [...board] as Board

export const emptyBoard = (): Board => Array(CELL_COUNT).fill(0) as Board

const peersCache: number[][] = Array.from({ length: CELL_COUNT }, () => [])

const buildPeers = () => {
  for (let i = 0; i < CELL_COUNT; i += 1) {
    const { row, col } = toRowCol(i)
    const peers = new Set<number>()

    for (let c = 0; c < BOARD_SIZE; c += 1) {
      if (c !== col) peers.add(toIndex(row, c))
    }

    for (let r = 0; r < BOARD_SIZE; r += 1) {
      if (r !== row) peers.add(toIndex(r, col))
    }

    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3
    for (let r = boxRow; r < boxRow + 3; r += 1) {
      for (let c = boxCol; c < boxCol + 3; c += 1) {
        const idx = toIndex(r, c)
        if (idx !== i) peers.add(idx)
      }
    }

    peersCache[i] = Array.from(peers)
  }
}

buildPeers()

export const getPeers = (index: number) => peersCache[index]

export const getBoxId = (index: number) => {
  const { row, col } = toRowCol(index)
  return Math.floor(row / 3) * 3 + Math.floor(col / 3)
}

export const isValidPlacement = (
  board: Board,
  index: number,
  value: CellValue,
): boolean => {
  if (value === 0) return true
  for (const peer of getPeers(index)) {
    if (board[peer] === value) return false
  }
  return true
}

export const getCandidatesMask = (board: Board, index: number) => {
  if (board[index] !== 0) return 0
  let mask = ALL_DIGITS_MASK
  for (const peer of getPeers(index)) {
    const value = board[peer]
    if (value > 0) {
      mask &= ~(1 << value)
    }
  }
  return mask
}

export const maskToDigits = (mask: number): CellValue[] => {
  const values: CellValue[] = []
  for (let digit = 1 as CellValue; digit <= 9; digit += 1) {
    if ((mask & (1 << digit)) !== 0) values.push(digit)
  }
  return values
}

export const countBits = (value: number) => {
  let n = value
  let count = 0
  while (n > 0) {
    n &= n - 1
    count += 1
  }
  return count
}

export const noteHasDigit = (mask: number, digit: CellValue) =>
  (mask & (1 << digit)) !== 0

export const toggleNoteDigit = (mask: number, digit: CellValue) =>
  mask ^ (1 << digit)

export const clearNoteDigit = (mask: number, digit: CellValue) =>
  mask & ~(1 << digit)

export const formatDateKey = (date: Date) => date.toISOString().slice(0, 10)

export const parseDateKey = (dateKey: string) => new Date(`${dateKey}T00:00:00`)
