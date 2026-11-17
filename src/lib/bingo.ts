export const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'] as const

export type BingoLetter = (typeof BINGO_LETTERS)[number]

export const COLUMNS: Record<BingoLetter, number[]> = {
  B: Array.from({ length: 15 }, (_, i) => i + 1),
  I: Array.from({ length: 15 }, (_, i) => i + 16),
  N: Array.from({ length: 15 }, (_, i) => i + 31),
  G: Array.from({ length: 15 }, (_, i) => i + 46),
  O: Array.from({ length: 15 }, (_, i) => i + 61),
}

export const PARTY_EMOJIS = ['🦃', '🎈', '🙌', '🏆', '🪎', '🎉', '🤩', '💫', '🪴', '💰', '☕️', '🍬', '✨'] as const

export function nextPartyEmojiIndex(current: number): number {
  return (current + 1) % PARTY_EMOJIS.length
}
