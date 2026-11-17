import { useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { clearSnapshot, loadSnapshot, saveSnapshot } from '../lib/storage'
import { GameContext, type GameContextValue } from './GameContext'
import { gameReducer } from './gameReducer'
import { initialState, lastCalled, type GameSnapshot } from './types'

function createInitialState(): GameSnapshot {
  return loadSnapshot() ?? initialState
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  )

  useEffect(() => {
    saveSnapshot(state)
  }, [state])

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      dispatch,
      lastCalled: lastCalled(state.calledStack),
      resetGame: () => {
        clearSnapshot()
        dispatch({ type: 'RESET' })
      },
    }),
    [state],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
