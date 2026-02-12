import { useEffect, useState } from 'react'
import { loadSettings, saveSettings } from '../lib/storage/storage'
import type { AppSettings } from '../lib/sudoku/types'

const settingLabels: Record<keyof AppSettings, string> = {
  autoRemoveNotes: 'Auto remove notes when entering a number',
  highlightPeers: 'Highlight row, column, and box for selected cell',
  autoCheckConflicts: 'Count mistakes when entering wrong values',
  highContrast: 'Use high contrast board colors',
}

export function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings())

  useEffect(() => {
    document.body.dataset.theme = settings.highContrast ? 'contrast' : 'default'
  }, [settings.highContrast])

  const toggle = (key: keyof AppSettings) => {
    const next = { ...settings, [key]: !settings[key] }
    setSettings(next)
    saveSettings(next)
  }

  return (
    <section className="panel stack-lg">
      <h1>Settings</h1>
      <p className="muted">Customize how the game feels on mobile and desktop.</p>

      <div className="settings-list">
        {(Object.keys(settingLabels) as Array<keyof AppSettings>).map((key) => (
          <label className="setting-row" key={key}>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => toggle(key)}
              aria-label={settingLabels[key]}
            />
            <span>{settingLabels[key]}</span>
          </label>
        ))}
      </div>
    </section>
  )
}
