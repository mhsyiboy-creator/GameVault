import { useRef, useState } from 'react'
import { useGameStore } from '../contexts/GameContext'
import NotificationBanner from './NotificationBanner'
import { downloadBackupFile, parseBackupData, validateBackupData } from '../utils/backup'

export default function BackupPanel({ games, onRestore }) {
  const { t } = useGameStore()
  const [feedback, setFeedback] = useState(null)
  const fileInputRef = useRef(null)

  const handleExport = () => {
    try {
      downloadBackupFile(games)
      setFeedback({ type: 'success', message: t('settings.exportSuccess') })
    } catch {
      setFeedback({ type: 'error', message: t('settings.backupError') })
    }
  }

  const triggerImport = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (file.type !== 'application/json' && !file.name.toLowerCase().endsWith('.json')) {
      setFeedback({ type: 'error', message: t('settings.backupError') })
      return
    }

    try {
      const fileText = await file.text()
      validateBackupData(fileText)
      const { games: parsedGames } = parseBackupData(fileText)
      onRestore(parsedGames)
      setFeedback({ type: 'success', message: t('settings.importSuccess') })
    } catch (error) {
      setFeedback({ type: 'error', message: error?.message || t('settings.backupError') })
    }
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
      <div className="flex flex-col gap-3">
        <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{t('settings.backupTitle')}</h3>
            <p className="mt-2 text-[var(--text-secondary)]">{t('settings.backupDescription')}</p>
        </div>
        {feedback && <NotificationBanner message={feedback.message} type={feedback.type} />}
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center rounded-3xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
          >
              {t('settings.exportData')}
          </button>
          <button
            type="button"
            onClick={triggerImport}
            className="inline-flex items-center rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-soft)]"
          >
              {t('settings.importData')}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </div>
    </div>
  )
}
