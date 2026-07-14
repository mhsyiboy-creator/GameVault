import { useGameStore } from '../contexts/GameContext'

const statusStyles = {
  Playing: 'bg-cyan-500/15 text-cyan-300 ring-cyan-300/20',
  Completed: 'bg-emerald-500/15 text-emerald-300 ring-emerald-300/20',
  Wishlist: 'bg-violet-500/15 text-violet-300 ring-violet-300/20',
}

export default function StatusBadge({ status }) {
  const { t } = useGameStore()

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ring-1 ${
        statusStyles[status] || 'bg-slate-700/50 text-slate-200 ring-slate-700/70'
      }`}
    >
      {t(`status.${status}`)}
    </span>
  )
}
