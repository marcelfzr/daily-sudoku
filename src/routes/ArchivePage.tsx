import { Link } from 'react-router-dom'
import { listArchiveDates } from '../lib/sudoku/generator'
import { loadSettings, loadStoredGame } from '../lib/storage/storage'
import { formatDuration } from '../lib/time'

export function ArchivePage() {
  const dates = listArchiveDates(90)
  const settings = loadSettings()

  return (
    <section className="panel stack-lg">
      <h1>Archive</h1>
      <p className="muted">Play any of the last 90 daily puzzles.</p>

      <div className="archive-list">
        {dates.map((date) => {
          const game = loadStoredGame(date, settings.defaultDifficulty)
          return (
            <Link key={date} className="archive-item" to={`/daily/${date}`}>
              <span>{date}</span>
              <span className="muted">
                {game?.completed
                  ? `Completed · ${formatDuration(game.elapsedSeconds)}`
                  : game
                    ? `In progress · ${formatDuration(game.elapsedSeconds)}`
                    : 'Not started'}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
