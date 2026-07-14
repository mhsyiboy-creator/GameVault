import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useGameStore } from '../contexts/GameContext'
import StatsCard from '../components/StatsCard'
import GameCard from '../components/GameCard'

export default function Dashboard() {
  const { games, t } = useGameStore()

  const stats = useMemo(() => {
    const count = games.length
    const average = count ? games.reduce((sum, game) => sum + game.rating, 0) / count : 0
    const statuses = games.reduce(
      (acc, game) => {
        acc[game.status] = (acc[game.status] || 0) + 1
        return acc
      },
      { Playing: 0, Completed: 0, Wishlist: 0 }
    )
    return {
      count,
      average: average.toFixed(1),
      statuses,
    }
  }, [games])

  return (
    <section className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-8 shadow-glow">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{t('dashboard.title')}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{t('dashboard.overview')}</h2>
          <p className="mt-3 text-slate-400">{t('dashboard.description')}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatsCard label={t('statusSnapshot')} value={stats.count} detail={t('libraryLabel')} />
            <StatsCard label={t('averageRating')} value={stats.average} detail={t('score')} />
            <StatsCard label={t('wishlist')} value={stats.statuses.Wishlist} detail={t('queued')} />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{t('statusSnapshot')}</p>
            <div className="mt-6 space-y-4">
              {Object.entries(stats.statuses).map(([status, value]) => (
                <div key={status} className="flex items-center justify-between rounded-3xl bg-slate-900/80 px-5 py-4">
                  <p className="text-sm text-slate-300">{t(`status.${status}`)}</p>
                  <p className="text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-secondary)]">{t('dashboard.quickActions')}</p>
            <div className="mt-6 grid gap-3">
              <Link
                to="/add"
                className="rounded-3xl bg-[var(--accent)]/15 px-5 py-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/25"
              >
                {t('dashboard.addGame')}
              </Link>
              <Link
                to="/library"
                className="rounded-3xl border border-slate-800/90 px-5 py-4 text-sm font-semibold text-slate-200 transition hover:border-violet-400/50"
              >
                {t('dashboard.browseLibrary')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{t('dashboard.featuredGames')}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{t('dashboard.topPicks')}</h3>
          </div>
          <Link
            to="/library"
            className="inline-flex items-center rounded-full border border-slate-800/90 bg-slate-900/80 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-400/60 hover:text-white"
          >
            {t('dashboard.exploreAll')}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {games.slice(0, 3).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}
