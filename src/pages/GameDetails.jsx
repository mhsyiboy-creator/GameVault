import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'
import StatusBadge from '../components/StatusBadge'

export default function GameDetails() {
  const { id } = useParams()
  const { getGameById, removeGame, t } = useGameStore()
  const navigate = useNavigate()

  const game = useMemo(() => getGameById(id), [getGameById, id])

  if (!game) {
    return (
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-10 text-center text-[var(--text-secondary)] shadow-glow">
        <p className="text-lg font-semibold text-white">{t('editGamePage.notFoundTitle')}</p>
        <p className="mt-2 text-slate-400">{t('editGamePage.notFoundDescription')}</p>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(t('gameDetails.deleteConfirm', { title: game.title }))) {
      removeGame(game.id)
      navigate('/library')
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)]/90 shadow-inner">
            <img src={game.cover} alt={game.title} className="h-80 w-full object-cover" />
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{t('gameDetails.gameDetails')}</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">{game.title}</h1>
              </div>
              <StatusBadge status={game.status} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[var(--surface-soft)]/90 p-4 text-sm text-[var(--text-secondary)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">{t('gameDetails.genre')}</p>
                <p className="mt-2 text-base text-[var(--text-primary)]">{game.genre}</p>
              </div>
              <div className="rounded-3xl bg-[var(--surface-soft)]/90 p-4 text-sm text-[var(--text-secondary)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">{t('gameDetails.release')}</p>
                <p className="mt-2 text-base text-[var(--text-primary)]">{game.year}</p>
              </div>
              <div className="rounded-3xl bg-[var(--surface-soft)]/90 p-4 text-sm text-[var(--text-secondary)]">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">{t('form.rating')}</p>
                <p className="mt-2 text-base text-[var(--text-primary)]">{game.rating.toFixed(1)}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-[var(--surface-soft)]/90 p-6 text-[var(--text-secondary)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">{t('gameDetails.synopsis')}</p>
              <p className="mt-3 leading-7 text-[var(--text-primary)]">{game.description}</p>
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">{t('gameDetails.actions')}</p>
            <div className="mt-6 space-y-3">
              <Link
                to={`/games/${game.id}/edit`}
                className="block rounded-3xl bg-[var(--accent)]/10 px-5 py-4 text-center text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
              >
                {t('gameDetails.editDetails')}
              </Link>
              <button
                onClick={handleDelete}
                className="w-full rounded-3xl bg-rose-500/10 px-5 py-4 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
              >
                {t('gameDetails.delete')}
              </button>
              <Link
                to="/library"
                className="block rounded-3xl border border-[var(--border)] px-5 py-4 text-center text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]/60"
              >
                {t('gameDetails.back')}
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">{t('gameDetails.quickStats')}</p>
            <ul className="mt-6 space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center justify-between rounded-3xl bg-[var(--surface-soft)]/90 px-4 py-3 text-[var(--text-primary)]">
                <span>{t('gameDetails.gameAge')}</span>
                <span>{t('gameDetails.years', { years: new Date().getFullYear() - game.year })}</span>
              </li>
              <li className="flex items-center justify-between rounded-3xl bg-[var(--surface-soft)]/90 px-4 py-3 text-[var(--text-primary)]">
                <span>{t('gameDetails.statusLabel')}</span>
                <span>{t(`status.${game.status}`)}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
