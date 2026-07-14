import { COLOR_PALETTES } from '../utils/constants'
import { useGameStore } from '../contexts/GameContext'

export default function Settings() {
  const { theme, locale, palette, setTheme, setLocale, setPalette, t } = useGameStore()

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t('settings.title')}</h2>
        <p className="mt-2 text-[var(--text-secondary)]">{t('settings.description')}</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
          <h3 className="text-lg font-semibold text-white">{t('settings.theme')}</h3>
          <p className="mt-2 text-[var(--text-secondary)]">{t('settings.themeDescription')}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {['dark', 'light'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                  theme === option
                    ? 'bg-[var(--accent)] text-white shadow-glow'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800/90'
                }`}
              >
                {option === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{t('settings.language')}</h3>
          <p className="mt-2 text-[var(--text-secondary)]">{t('settings.languageDescription')}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { value: 'en', label: t('settings.english') },
              { value: 'fa', label: t('settings.persian') },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLocale(option.value)}
                className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${
                  locale === option.value
                    ? 'bg-[var(--accent)] text-white shadow-glow'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800/90'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{t('settings.colorPalette')}</h3>
        <p className="mt-2 text-[var(--text-secondary)]">{t('settings.paletteDescription')}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          {COLOR_PALETTES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setPalette(option)}
              className={`inline-flex min-w-[10rem] items-center gap-3 rounded-3xl border px-5 py-4 text-left transition ${
                palette.id === option.id
                  ? 'border-[var(--accent)] bg-[var(--surface-soft)] text-[var(--text-primary)] shadow-glow'
                  : 'border-slate-800/90 bg-slate-900/90 text-slate-300 hover:border-[var(--accent)] hover:bg-slate-800/90'
              }`}
            >
              <span
                className="h-10 w-10 rounded-2xl"
                style={{ background: option.accent }}
              />
              <div>
                <p className="font-semibold">{t(`settings.paletteNames.${option.id}`)}</p>
                <p className="text-sm text-slate-400">{option.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-alt)]/90 p-6 shadow-glow">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{t('settings.aboutTitle')}</h3>
        <p className="mt-3 text-[var(--text-secondary)] leading-7">{t('settings.aboutDescription')}</p>
      </div>
    </div>
  )
}
