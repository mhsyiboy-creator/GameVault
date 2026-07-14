import { useMemo, useState } from 'react'
import { useGameStore } from '../contexts/GameContext'
import GameCard from '../components/GameCard'
import SearchFilter from '../components/SearchFilter'

export default function Library() {
  const { games, t } = useGameStore()
  const [filters, setFilters] = useState({ query: '', status: '', genre: '' })

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const query = filters.query.toLowerCase().trim()
      const matchesQuery =
        !query ||
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        String(game.year).includes(query)
      const matchesStatus = !filters.status || game.status === filters.status
      const matchesGenre = !filters.genre || game.genre === filters.genre
      return matchesQuery && matchesStatus && matchesGenre
    })
  }, [games, filters])

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
        <h2 className="text-2xl font-semibold text-white">{t('library.title')}</h2>
        <p className="mt-2 text-slate-400">{t('library.description')}</p>
      </div>
      <SearchFilter filters={filters} onChange={setFilters} onClear={() => setFilters({ query: '', status: '', genre: '' })} />
      <div className="space-y-6">
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{t('library.summary')}</p>
            <p className="mt-2 text-lg text-slate-300">{t('library.filterInfo', { count: filteredGames.length })}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200">
            {t('library.totalCollection', { total: games.length })}
          </div>
        </div>
        {filteredGames.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/70 p-10 text-center text-slate-400">
            {t('library.empty')}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
