# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:5173)
npm run build     # Type-check and build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Architecture

This is a React 19 + TypeScript Sudoku web app built with Vite. It provides daily puzzles seeded by date, ensuring all users get the same puzzle each day.

### Core Data Flow

**Puzzle Generation** (`src/lib/sudoku/generator.ts`):
- `buildDailyPuzzle(date, difficulty)` creates deterministic puzzles using seeded RNG
- Seeds are derived from `${date}:${difficulty}`, guaranteeing reproducibility
- Generation: create solved board → carve out cells while ensuring unique solution

**Game State** (`src/hooks/useSudokuGame.ts`):
- Single hook manages all game state: cell values, notes (bitmask per cell), selection, undo/redo history
- Notes stored as numbers using bitwise operations (`noteHasDigit`, `toggleNoteDigit`)
- History: `past[]` and `future[]` arrays for undo/redo with 100-step limit

**Persistence** (`src/lib/storage/storage.ts`):
- All state in localStorage with `sudoku:` prefix
- Keys: `sudoku:game:{date}:{difficulty}`, `sudoku:settings`, `sudoku:stats`
- Stats track streaks, completion counts, total time

### Board Representation

- Board is a flat 81-element array (`CellValue[]`) indexed row-major (index = row*9 + col)
- `CellValue = 0 | 1..9` where 0 = empty
- Notes use bitmask: bit N set means digit N is noted (e.g., `0b101010` = digits 1,3,5)

### Routing

Routes in `src/App.tsx`:
- `/` - HomePage (start playing)
- `/daily/:date` - DailyPage (actual game, date format: YYYY-MM-DD)
- `/archive` - ArchivePage (past puzzles)
- `/settings` - SettingsPage
