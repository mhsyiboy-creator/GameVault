import { useGameStore } from '../contexts/GameContext'
import { GENRE_OPTIONS, STATUS_OPTIONS } from '../utils/constants'

export default function SearchFilter({ filters, onChange, onClear }) {
  const { t } = useGameStore()

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex-1 space-y-3">
          <label className="block text-sm text-slate-300">
            {t('libraryOption.searchLabel')}
            <input
              type="search"
              value={filters.query}
              onChange={(event) => onChange({ ...filters, query: event.target.value })}
              placeholder={t('libraryOption.searchPlaceholder')}
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:w-[55%]">
          <label className="block text-sm text-slate-300">
            {t('form.status')}
            <select
              value={filters.status}
              onChange={(event) => onChange({ ...filters, status: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">{t('libraryOption.allStatuses')}</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {t(`status.${status}`)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-slate-300">
            {t('form.genre')}
            <select
              value={filters.genre}
              onChange={(event) => onChange({ ...filters, genre: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">{t('libraryOption.allGenres')}</option>
              {GENRE_OPTIONS.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center rounded-3xl border border-slate-800/90 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-violet-400/60 hover:text-white"
          >
            {t('libraryOption.clearFilters')}
          </button>
        </div>
      </div>
    </div>
  )
}
