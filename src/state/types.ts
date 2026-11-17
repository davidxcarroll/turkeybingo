export type GameState = 'PLAY' | 'REVIEW' | 'FALSE' | 'WINNER'

export type GameSnapshot = {
  calledStack: number[]
  gameState: GameState
  isPaused: boolean
  prizeText: string
  partyEmojiIndex: number
}

export type GameAction =
  | { type: 'TOGGLE_NUMBER'; number: number }
  | { type: 'SET_PRIZE'; prizeText: string }
  | { type: 'CLEAR_PRIZE' }
  | { type: 'BINGO' }
  | { type: 'FALSE_ALARM' }
  | { type: 'WINNER' }
  | { type: 'RESUME_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'UNPAUSE' }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; snapshot: GameSnapshot }

export const initialState: GameSnapshot = {
  calledStack: [],
  gameState: 'PLAY',
  isPaused: false,
  prizeText: '',
  partyEmojiIndex: 0,
}

export function lastCalled(stack: number[]): number | null {
  return stack.length > 0 ? stack[stack.length - 1]! : null
}
