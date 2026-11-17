import type { GameSnapshot } from '../state/types'

export const STORAGE_KEY = 'philomath-bingo-v1'

export function loadSnapshot(): GameSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GameSnapshot>
    if (!Array.isArray(parsed.calledStack)) return null
    return {
      calledStack: parsed.calledStack.filter(
        (n): n is number => typeof n === 'number' && n >= 1 && n <= 75,
      ),
      gameState:
        parsed.gameState === 'REVIEW' ||
        parsed.gameState === 'FALSE' ||
        parsed.gameState === 'WINNER' ||
        parsed.gameState === 'PLAY'
          ? parsed.gameState
          : 'PLAY',
      isPaused: Boolean(parsed.isPaused),
      prizeText: typeof parsed.prizeText === 'string' ? parsed.prizeText : '',
      partyEmojiIndex:
        typeof parsed.partyEmojiIndex === 'number' ? parsed.partyEmojiIndex : 0,
    }
  } catch {
    return null
  }
}

export function saveSnapshot(snapshot: GameSnapshot): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Private mode / quota -- fail soft
  }
}

export function clearSnapshot(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // fail soft
  }
}
