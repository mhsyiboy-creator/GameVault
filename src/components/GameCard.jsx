import { Link } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'
import StatusBadge from './StatusBadge'

export default function GameCard({ game }) {
  const { t } = useGameStore()

  return (
    <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 shadow-glow transition hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.18)]">
      <Link to={`/games/${game.id}`} className="block overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">{game.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{game.genre} • {game.year}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-violet-300">{game.rating.toFixed(1)}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{t('form.rating')}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={game.status} />
          <Link
            to={`/games/${game.id}`}
            className="rounded-full bg-[var(--accent)]/15 px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/25"
          >
            {t('button.view')}
          </Link>
        </div>
      </div>
    </article>
  )
}
