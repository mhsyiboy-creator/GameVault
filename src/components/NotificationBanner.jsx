export default function NotificationBanner({ message, type = 'success' }) {
  if (!message) return null

  const baseClass = 'rounded-3xl border px-4 py-3 text-sm font-medium'
  const variants = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    error: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  }

  return <div className={`${baseClass} ${variants[type] || variants.success}`}>{message}</div>
}
