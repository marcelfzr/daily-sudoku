import { Link } from 'react-router-dom'
import { formatDateKey } from '../lib/sudoku/board'
import { buildDailyPuzzle } from '../lib/sudoku/generator'
import { loadStats, loadStoredGame } from '../lib/storage/storage'
import { formatDuration } from '../lib/time'

export function HomePage() {
  const today = formatDateKey(new Date())
  const puzzle = buildDailyPuzzle(today)
  const saved = loadStoredGame(today)
  const stats = loadStats()
  const averageTime =
    stats.completedGames > 0 ? Math.round(stats.totalTimeSeconds / stats.completedGames) : 0

  return (
    <section className="panel stack-lg">
      <h1>Daily Sudoku</h1>
      <p className="muted">
        One clean puzzle every day. Fast on mobile, comfortable on desktop.
      </p>

      <div className="stats-grid">
        <article>
          <h2>Today</h2>
          <p>{today}</p>
          <p className="muted">
            {puzzle.difficulty} · {puzzle.clueCount} clues
          </p>
        </article>
        <article>
          <h2>Progress</h2>
          <p>{saved?.completed ? 'Completed' : saved ? 'In progress' : 'Not started'}</p>
          <p className="muted">{saved ? `${formatDuration(saved.elapsedSeconds)} elapsed` : '-'}</p>
        </article>
      </div>

      <div className="cta-row">
        <Link className="button" to={`/daily/${today}`}>
          {saved ? 'Continue today' : 'Start today'}
        </Link>
        <Link className="button button-soft" to="/archive">
          Browse archive
        </Link>
      </div>

      <div className="stats-grid">
        <article>
          <h2>Completed</h2>
          <p>{stats.completedGames}</p>
        </article>
        <article>
          <h2>Current streak</h2>
          <p>{stats.currentStreak}</p>
        </article>
        <article>
          <h2>Best streak</h2>
          <p>{stats.bestStreak}</p>
        </article>
        <article>
          <h2>Avg time</h2>
          <p>{averageTime ? formatDuration(averageTime) : '--:--'}</p>
        </article>
      </div>
    </section>
  )
}
