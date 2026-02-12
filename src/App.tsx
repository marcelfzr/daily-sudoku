import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ArchivePage } from './routes/ArchivePage'
import { DailyPage } from './routes/DailyPage'
import { HomePage } from './routes/HomePage'
import { SettingsPage } from './routes/SettingsPage'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daily/:date" element={<DailyPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
