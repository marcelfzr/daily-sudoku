import { Link, NavLink } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Daily Sudoku
        </Link>
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}
