import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'
import GameForm from '../components/GameForm'

function generateId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AddGame() {
  const { addGame, games, t } = useGameStore()
  const navigate = useNavigate()

  const handleCreate = (game) => {
    const id = generateId(game.title)
    const uniqueId = games.some((item) => item.id === id) ? `${id}-${Date.now()}` : id
    addGame({ ...game, id: uniqueId })
    navigate('/library')
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
        <h2 className="text-2xl font-semibold text-white">{t('addGamePage.title')}</h2>
        <p className="mt-2 text-slate-400">{t('addGamePage.description')}</p>
      </div>
      <GameForm onSubmit={handleCreate} submitLabel={t('form.addGame')} />
    </div>
  )
}
