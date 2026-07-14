import { STATUS_OPTIONS } from './constants'

export function buildBackupContent(games) {
  return JSON.stringify({ games }, null, 2)
}

export function downloadBackupFile(games) {
  const content = buildBackupContent(games)
  const blob = new Blob([content], { type: 'application/json' })
  const fileName = `gamevault-backup-${new Date().toISOString().slice(0, 10)}.json`
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function parseBackupData(text) {
  const parsed = JSON.parse(text)

  if (Array.isArray(parsed)) {
    return { games: parsed }
  }

  if (parsed && typeof parsed === 'object' && Array.isArray(parsed.games)) {
    return parsed
  }

  throw new Error('Backup file must be a JSON array or an object with a games array.')
}

export function validateBackupData(content) {
  const { games } = parseBackupData(content)

  if (!Array.isArray(games)) {
    throw new Error('Backup file must contain a games array.')
  }

  games.forEach((game, index) => {
    if (!game || typeof game !== 'object') {
      throw new Error(`Game at index ${index} is invalid.`)
    }

    const { id, title, cover, genre, rating, status, year, description } = game

    if (typeof id !== 'string' || !id.trim()) {
      throw new Error(`Game at index ${index} is missing a valid id.`)
    }
    if (typeof title !== 'string' || !title.trim()) {
      throw new Error(`Game at index ${index} is missing a valid title.`)
    }
    if (typeof cover !== 'string' || !cover.trim()) {
      throw new Error(`Game at index ${index} is missing a valid cover URL.`)
    }
    if (typeof genre !== 'string' || !genre.trim()) {
      throw new Error(`Game at index ${index} is missing a valid genre.`)
    }
    if (typeof status !== 'string' || !STATUS_OPTIONS.includes(status)) {
      throw new Error(`Game at index ${index} has an invalid status.`)
    }
    if (typeof rating !== 'number' || Number.isNaN(rating) || rating < 0 || rating > 10) {
      throw new Error(`Game at index ${index} has an invalid rating.`)
    }
    if (typeof year !== 'number' || Number.isNaN(year) || year < 1900 || year > 2100) {
      throw new Error(`Game at index ${index} has an invalid release year.`)
    }
    if (description != null && typeof description !== 'string') {
      throw new Error(`Game at index ${index} has an invalid description.`)
    }
  })

  return games
}
