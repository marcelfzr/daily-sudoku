import { getPeers } from './board'
import type { Board } from './types'

export const getConflictSet = (board: Board) => {
  const conflicts = new Set<number>()

  for (let index = 0; index < board.length; index += 1) {
    const value = board[index]
    if (value === 0) continue

    for (const peer of getPeers(index)) {
      if (peer <= index) continue
      if (board[peer] === value) {
        conflicts.add(index)
        conflicts.add(peer)
      }
    }
  }
  return conflicts
}

export const isSolved = (values: Board, solution: Board) => {
  for (let i = 0; i < values.length; i += 1) {
    if (values[i] !== solution[i]) return false
  }
  return true
}
