type GameToolbarProps = {
  notesMode: boolean
  canUndo: boolean
  canRedo: boolean
  onToggleNotes: () => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onRestart: () => void
}

export function GameToolbar({
  notesMode,
  canUndo,
  canRedo,
  onToggleNotes,
  onUndo,
  onRedo,
  onClear,
  onRestart,
}: GameToolbarProps) {
  return (
    <div className="game-toolbar" role="toolbar" aria-label="Game actions">
      <button type="button" className={notesMode ? 'active' : ''} onClick={onToggleNotes}>
        Notes
      </button>
      <button type="button" onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button type="button" onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
      <button type="button" onClick={onClear}>
        Erase
      </button>
      <button type="button" onClick={onRestart}>
        Restart
      </button>
    </div>
  )
}
