import { NavLink } from 'react-router-dom'
import { useGameStore } from '../contexts/GameContext'

function NavButton({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `inline-flex items-center rounded-3xl px-4 py-2 text-sm font-semibold transition ${
          isActive
            ? 'bg-violet-500 text-white shadow-glow'
            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function AppShell({ children }) {
  const { t } = useGameStore()
  const navItems = [
    { path: '/', label: t('nav.dashboard') },
    { path: '/library', label: t('nav.library') },
    { path: '/add', label: t('nav.addGame') },
    { path: '/settings', label: t('nav.settings') },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="relative overflow-hidden bg-[var(--surface-alt)]/90 pb-10 before:absolute before:inset-x-0 before:top-0 before:h-72 before:bg-hero-gradient before:opacity-90">
        <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-6 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-400/70">{t('appName')}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {t('header.headline')}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {t('header.description')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {navItems.map((item) => (
                <NavButton key={item.path} to={item.path} label={item.label} />
              ))}
            </div>
          </header>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
