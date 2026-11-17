import { useEffect, useRef, useState } from 'react'
import { BingoBoard } from './components/BingoBoard'
import { ConfettiBurst } from './components/ConfettiBurst'
import { PauseLayout } from './components/PauseLayout'
import { Sidebar } from './components/Sidebar'
import { useBeforeUnload } from './hooks/useBeforeUnload'
import { useWakeLock } from './hooks/useWakeLock'
import { GameProvider } from './state/GameProvider'
import { useGame } from './state/useGame'

function AppShell() {
  const { state } = useGame()
  const prevGameState = useRef(state.gameState)
  const [confettiBurst, setConfettiBurst] = useState(0)

  useWakeLock()
  useBeforeUnload(
    state.calledStack.length > 0 || state.prizeText.trim() !== '',
  )

  useEffect(() => {
    if (
      state.gameState === 'WINNER' &&
      prevGameState.current !== 'WINNER'
    ) {
      setConfettiBurst((n) => n + 1)
    }
    prevGameState.current = state.gameState
  }, [state.gameState])

  return (
    <main className="h-[100dvh] w-[100dvw] overflow-hidden bg-[var(--bingo-bg)]">
      <ConfettiBurst burstId={confettiBurst} />
      {state.isPaused ? (
        <PauseLayout />
      ) : (
        <div className="flex h-full w-full gap-[clamp(0.5rem,0.8vw,0.75rem)] p-[clamp(0.25rem,0.8vw,0.5rem)]">
          <BingoBoard />
          <Sidebar />
        </div>
      )}
    </main>
  )
}

export default function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  )
}
