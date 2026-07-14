import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'
import GameForm from '../components/GameForm'

export default function EditGame() {
  const { id } = useParams()
  const { getGameById, updateGame, t } = useGameStore()
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

  const handleUpdate = (updated) => {
    updateGame(updated)
    navigate(`/games/${updated.id}`)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6 shadow-glow">
        <h2 className="text-2xl font-semibold text-white">{t('editGamePage.title')}</h2>
        <p className="mt-2 text-slate-400">{t('editGamePage.description')}</p>
      </div>
      <GameForm initialGame={game} onSubmit={handleUpdate} submitLabel={t('form.saveChanges')} />
    </div>
  )
}
