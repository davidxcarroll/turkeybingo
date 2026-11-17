import { createContext } from 'react'
import type { GameAction, GameSnapshot } from './types'

export type GameContextValue = {
  state: GameSnapshot
  dispatch: (action: GameAction) => void
  lastCalled: number | null
  resetGame: () => void
}

export const GameContext = createContext<GameContextValue | null>(null)
