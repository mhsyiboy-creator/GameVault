import { useMemo, useState } from 'react'
import { useGameStore } from '../contexts/GameContext'
import { GENRE_OPTIONS, STATUS_OPTIONS } from '../utils/constants'

export default function GameForm({ initialGame = {}, onSubmit, submitLabel }) {
  const { t } = useGameStore()
  const [game, setGame] = useState({
    title: initialGame.title || '',
    cover: initialGame.cover || '',
    genre: initialGame.genre || '',
    rating: initialGame.rating || '',
    status: initialGame.status || 'Wishlist',
    year: initialGame.year || '',
    description: initialGame.description || '',
  })
  const [error, setError] = useState('')

  const isValid = useMemo(
    () => game.title.trim() && game.cover.trim() && game.genre && game.rating && game.year,
    [game]
  )

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setGame((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) {
      setError(t('form.validation'))
      return
    }
    const payload = {
      ...initialGame,
      ...game,
      rating: Number(game.rating),
      year: Number(game.year),
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
      {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-500/20">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="space-y-2 text-sm text-[var(--text-secondary)]">
          <span>{t('form.title')}</span>
          <input
            type="text"
            value={game.title}
            onChange={handleChange('title')}
            placeholder={t('form.enterTitle')}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]/90 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </label>
        <label className="space-y-2 text-sm text-[var(--text-secondary)]">
          <span>{t('form.cover')}</span>
          <input
            type="url"
            value={game.cover}
            onChange={handleChange('cover')}
            placeholder={t('form.enterCover')}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]/90 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </label>
        <label className="space-y-2 text-sm text-[var(--text-secondary)]">
          <span>{t('form.genre')}</span>
          <select
            value={game.genre}
            onChange={handleChange('genre')}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-alt)]/90 px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            <option value="">{t('form.chooseGenre')}</option>
            {GENRE_OPTIONS.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>{t('form.status')}</span>
          <select
            value={game.status}
            onChange={handleChange('status')}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {t(`status.${status}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>{t('form.rating')}</span>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={game.rating}
            onChange={handleChange('rating')}
            placeholder="8.5"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>{t('form.year')}</span>
          <input
            type="number"
            min="1980"
            max="2035"
            value={game.year}
            onChange={handleChange('year')}
            placeholder="2025"
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-slate-300">
        <span>{t('form.description')}</span>
        <textarea
          value={game.description}
          onChange={handleChange('description')}
          rows="4"
          placeholder={t('form.addDescription')}
          className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
        />
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">{t('form.savedNotice')}</p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
