import { useState } from 'react'
import { BINGO_LETTERS, COLUMNS } from '../lib/bingo'
import type { GameState } from '../state/types'
import { useGame } from '../state/useGame'

function statusAccent(gameState: GameState): string {
  if (gameState === 'FALSE') return 'var(--bingo-false)'
  if (gameState === 'WINNER') return 'var(--bingo-winner)'
  return 'var(--bingo-accent)'
}

export function BingoBoard() {
  const { state, dispatch, lastCalled } = useGame()
  const [popping, setPopping] = useState<number | null>(null)
  const locked =
    state.gameState === 'REVIEW' ||
    state.gameState === 'FALSE' ||
    state.gameState === 'WINNER'
  const calledSet = new Set(state.calledStack)
  const cursorClass = locked ? 'cursor-not-allowed' : 'cursor-pointer'
  const accent = statusAccent(state.gameState)
  const lastOvalBg = locked ? accent : 'white'

  return (
    <div
      className="flex h-full w-full min-h-[min(70dvh,36rem)] min-w-0 flex-1 flex-col overflow-hidden rounded-[2.5rem] border-6 p-[clamp(0.75rem,1.4vw,1.25rem)] sm:min-h-0"
      style={{ borderColor: accent }}
    >
      <div className="grid h-full grid-cols-5">
        {BINGO_LETTERS.map((letter) => {
          const columnHasLast =
            lastCalled != null && COLUMNS[letter].includes(lastCalled)

          return (
            <div
              key={letter}
              className={`relative flex min-h-0 flex-col items-stretch ${columnHasLast ? 'z-10' : 'z-0'}`}
            >
              <div className="mb-[clamp(0.35rem,0.8vh,0.75rem)] flex shrink-0 items-center justify-center pb-[clamp(0.35rem,0.8vh,0.65rem)]">
                <span
                  className="font-monument-extended-italic text-[length:var(--bingo-letter-size)] leading-none"
                  style={{ color: accent }}
                >
                  {letter}
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                {COLUMNS[letter].map((n) => {
                  const isCalled = calledSet.has(n)
                  const isLast = lastCalled === n

                  let textClass = 'font-bold text-white/20'
                  let hoverClass = locked
                    ? cursorClass
                    : `${cursorClass} hover:text-white/45`
                  let ovalBg: string | undefined

                  if (isLast) {
                    textClass = 'font-monument-extended font-bold text-black'
                    hoverClass = cursorClass
                    ovalBg = lastOvalBg
                  } else if (isCalled) {
                    textClass = 'font-monument-extended font-bold text-black'
                    hoverClass = locked
                      ? cursorClass
                      : `group ${cursorClass}`
                    ovalBg = accent
                  }

                  return (
                    <button
                      key={n}
                      type="button"
                      aria-disabled={locked}
                      onClick={() => {
                        if (locked) return
                        if (!isCalled) setPopping(n)
                        dispatch({ type: 'TOGGLE_NUMBER', number: n })
                      }}
                      className={`relative flex min-h-0 flex-1 items-center justify-center overflow-visible leading-none ${isLast ? 'z-20' : 'z-0'} ${hoverClass} ${textClass}`}
                      style={{
                        fontSize: isCalled
                          ? 'var(--bingo-selected-size)'
                          : 'var(--bingo-number-size)',
                      }}
                      aria-pressed={isCalled}
                      aria-label={`Number ${n}${isCalled ? ', called' : ''}${isLast ? ', last called' : ''}`}
                    >
                      {isCalled ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: 'clamp(1.55em, 100%, calc(1.55em * 1.66))',
                            height: 'clamp(calc(1.12em * 1.1), 100%, calc(1.12em * 1.2))',
                          }}
                        >
                          <span
                            className={`block h-full w-full rounded-[50%] ${!locked && isCalled && !isLast ? 'group-hover:brightness-110' : ''} ${popping === n ? 'oval-pop' : ''}`}
                            style={{ backgroundColor: ovalBg }}
                            onAnimationEnd={() => {
                              if (popping === n) setPopping(null)
                            }}
                          />
                        </span>
                      ) : null}
                      <span className="relative z-10">{n}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
