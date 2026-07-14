import { useCallback, useEffect, useMemo, useState } from 'react'
import sampleGames from '../data/sampleGames'
import { loadStorage, saveStorage } from '../utils/storage'
import { STORAGE_KEYS, COLOR_PALETTES } from '../utils/constants'
import { GameContext } from './game-context.js'
import { formatMessage } from '../i18n/messages.js'

const getInitialGames = () => {
  const savedGames = loadStorage(STORAGE_KEYS.games)
  return Array.isArray(savedGames) && savedGames.length ? savedGames : sampleGames
}

const getInitialTheme = () => {
  const savedTheme = loadStorage(STORAGE_KEYS.theme)
  return savedTheme === 'light' ? 'light' : 'dark'
}

const getInitialLocale = () => {
  const savedLocale = loadStorage(STORAGE_KEYS.locale)
  return savedLocale === 'fa' ? 'fa' : 'en'
}

const getInitialPalette = () => {
  const savedPalette = loadStorage(STORAGE_KEYS.palette)
  return COLOR_PALETTES.find((palette) => palette.id === savedPalette) || COLOR_PALETTES[0]
}

function applyThemeVariables(theme, palette) {
  const isLight = theme === 'light'
  const root = document.documentElement

  root.style.setProperty('--accent', palette.accent)
  root.style.setProperty('--accent-strong', palette.accentStrong)
  root.style.setProperty('--accent-muted', palette.accentMuted)
  root.style.setProperty('--surface', isLight ? palette.lightSurface : palette.darkSurface)
  root.style.setProperty('--surface-alt', isLight ? palette.lightPanel : palette.darkPanel)
  root.style.setProperty('--surface-soft', isLight ? palette.lightPanelSoft : palette.darkPanelSoft)
  root.style.setProperty('--text-primary', isLight ? palette.textDark : palette.textLight)
  root.style.setProperty('--text-secondary', isLight ? '#475569' : '#94a3b8')
  root.style.setProperty('--border', isLight ? palette.borderLight : palette.borderDark)
  root.style.setProperty('--shadow-color', isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(15, 23, 42, 0.45)')
}

export function GameProvider({ children }) {
  const [games, setGames] = useState(getInitialGames)
  const [theme, setThemeState] = useState(getInitialTheme)
  const [locale, setLocaleState] = useState(getInitialLocale)
  const [palette, setPaletteState] = useState(getInitialPalette)

  useEffect(() => {
    saveStorage(STORAGE_KEYS.games, games)
  }, [games])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.theme, theme)
    document.documentElement.classList.toggle('theme-light', theme === 'light')
    applyThemeVariables(theme, palette)
  }, [theme, palette])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.locale, locale)
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('lang-fa', locale === 'fa')
  }, [locale])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.palette, palette.id)
    applyThemeVariables(theme, palette)
  }, [palette, theme])

  const t = useCallback(
    (path, values) => formatMessage(locale, path, values),
    [locale]
  )

  const addGame = useCallback((game) => {
    setGames((current) => [game, ...current])
  }, [])

  const updateGame = useCallback((updatedGame) => {
    setGames((current) => current.map((game) => (game.id === updatedGame.id ? updatedGame : game)))
  }, [])

  const removeGame = useCallback((id) => {
    setGames((current) => current.filter((game) => game.id !== id))
  }, [])

  const restoreGames = useCallback((newGames) => {
    setGames(Array.isArray(newGames) ? newGames : [])
  }, [])

  const getGameById = useCallback(
    (id) => games.find((game) => game.id === id),
    [games]
  )

  const value = useMemo(
    () => ({
      games,
      theme,
      locale,
      palette,
      t,
      addGame,
      updateGame,
      removeGame,
      restoreGames,
      getGameById,
      setTheme: setThemeState,
      setLocale: setLocaleState,
      setPalette: setPaletteState,
    }),
    [games, theme, locale, palette, t, addGame, updateGame, removeGame, restoreGames, getGameById]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
