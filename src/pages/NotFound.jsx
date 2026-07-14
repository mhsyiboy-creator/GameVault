import { Link } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'

export default function NotFound() {
  const { t } = useGameStore()

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-10 text-center shadow-glow">
      <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-[var(--text-primary)]">{t('notFound.title')}</h1>
      <p className="mt-4 text-[var(--text-secondary)]">{t('notFound.description')}</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
      >
        {t('notFound.back')}
      </Link>
    </div>
  )
}
