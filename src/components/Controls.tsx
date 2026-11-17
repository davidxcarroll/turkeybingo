import { useState } from 'react'
import { useGame } from '../state/useGame'
import { Icon } from './Icon'

type ControlsProps = {
  variant?: 'play' | 'review' | 'paused'
}

function PillButton({
  label,
  onClick,
  active = false,
  filled = false,
  className = '',
}: {
  label: string
  onClick: () => void
  active?: boolean
  filled?: boolean
  className?: string
}) {
  const base =
    'sidebar-meta cursor-pointer rounded-full border px-3 py-2 uppercase tracking-wide'
  const look =
    filled || active
      ? 'border-[var(--bingo-control-border-muted)] bg-[var(--bingo-control)] text-white hover:bg-[#4a4a4a] hover:border-[var(--bingo-control-border)]'
      : 'border-[var(--bingo-control-border-muted)] bg-transparent text-[#b0b0b0] hover:border-white/20 hover:text-white'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${look} ${className}`}
      aria-pressed={active || undefined}
    >
      {label}
    </button>
  )
}

function ResetDividerRow({ confirming }: { confirming: boolean }) {
  return (
    <div className="flex h-5 w-full items-center justify-center" aria-live="polite">
      {confirming ? (
        <p className="sidebar-meta text-center text-[#8a8a8a]">Clear board & prize?</p>
      ) : (
        <div
          className="h-px w-full bg-[var(--bingo-control-border-muted)]"
          role="separator"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function PauseResetRow({
  confirming,
  onPause,
  onReset,
  onCancel,
  onConfirm,
}: {
  confirming: boolean
  onPause: () => void
  onReset: () => void
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <ResetDividerRow confirming={confirming} />
      {confirming ? (
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Confirm reset">
          <PillButton label="Cancel" onClick={onCancel} />
          <PillButton label="Confirm" filled onClick={onConfirm} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <PillButton label="Pause" onClick={onPause} />
          <PillButton label="Reset" onClick={onReset} />
        </div>
      )}
    </div>
  )
}

export function Controls({ variant = 'play' }: ControlsProps) {
  const { state, dispatch, resetGame } = useGame()
  const [draft, setDraft] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const prizeValue = draft ?? state.prizeText

  const commitPrize = (value: string) => {
    dispatch({ type: 'SET_PRIZE', prizeText: value })
    setDraft(null)
  }

  const clearPrize = () => {
    setDraft(null)
    dispatch({ type: 'CLEAR_PRIZE' })
  }

  const handleConfirmReset = () => {
    resetGame()
    setConfirmReset(false)
  }

  const hasPrizeText = prizeValue.trim() !== ''
  const hasPendingPrize = draft !== null && draft.trim() !== ''
  const iconBtnClass =
    'flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--bingo-control-border-muted)] text-[#b0b0b0] hover:border-white/40 hover:text-white'

  const isReviewish =
    variant === 'review' ||
    state.gameState === 'REVIEW' ||
    state.gameState === 'FALSE' ||
    state.gameState === 'WINNER'
  const showPrizeField = !isReviewish || variant === 'paused'

  const prizeField = showPrizeField ? (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-stretch gap-2">
        <input
          id="prize-input"
          aria-label="Prize"
          placeholder="Prize?"
          value={prizeValue}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commitPrize(draft ?? prizeValue)
              ;(e.target as HTMLInputElement).blur()
            }
          }}
          className="sidebar-meta min-w-0 flex-1 rounded-full border border-[var(--bingo-control-border-muted)] bg-transparent px-3 py-2 text-white/70 text-center uppercase outline-none placeholder:text-[#8a8a8a] focus:border-white/20"
        />
        {hasPendingPrize && (
          <button
            type="button"
            aria-label="Confirm prize"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (draft !== null) commitPrize(draft)
              document.getElementById('prize-input')?.blur()
            }}
            className={iconBtnClass}
          >
            <Icon name="check" />
          </button>
        )}
        {hasPrizeText && (
          <button
            type="button"
            aria-label="Clear prize"
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearPrize}
            className={iconBtnClass}
          >
            <Icon name="close" />
          </button>
        )}
      </div>
    </div>
  ) : null

  if (variant === 'paused') {
    return (
      <div className="flex w-full flex-col gap-[clamp(0.65rem,1.4vh,1.1rem)]">
        {prizeField}
        <div className="flex w-full flex-col gap-1.5">
          <ResetDividerRow confirming={confirmReset} />
          {confirmReset ? (
            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Confirm reset">
              <PillButton label="Cancel" onClick={() => setConfirmReset(false)} />
              <PillButton label="Confirm" filled onClick={handleConfirmReset} />
            </div>
          ) : (
            <div className="flex w-full gap-3">
              <PillButton
                label="Resume Play"
                className="flex-1"
                onClick={() => dispatch({ type: 'RESUME_PLAY' })}
              />
              <PillButton
                label="Reset"
                className="flex-1"
                onClick={() => setConfirmReset(true)}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-[clamp(0.65rem,1.4vh,1.1rem)]">
      {prizeField}

      {isReviewish ? (
        <>
          <PillButton
            label="Resume Play"
            className="w-full"
            onClick={() => {
              setConfirmReset(false)
              dispatch({ type: 'RESUME_PLAY' })
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <PillButton
              label="False"
              active={state.gameState === 'FALSE'}
              onClick={() => {
                setConfirmReset(false)
                dispatch({ type: 'FALSE_ALARM' })
              }}
            />
            <PillButton
              label="Winner"
              active={state.gameState === 'WINNER'}
              onClick={() => {
                setConfirmReset(false)
                dispatch({ type: 'WINNER' })
              }}
            />
          </div>
          <PauseResetRow
            confirming={confirmReset}
            onPause={() => {
              setConfirmReset(false)
              dispatch({ type: 'PAUSE' })
            }}
            onReset={() => setConfirmReset(true)}
            onCancel={() => setConfirmReset(false)}
            onConfirm={handleConfirmReset}
          />
        </>
      ) : (
        <>
          <PillButton
            label="Bingo!"
            className="w-full"
            onClick={() => {
              setConfirmReset(false)
              dispatch({ type: 'BINGO' })
            }}
          />
          <PauseResetRow
            confirming={confirmReset}
            onPause={() => {
              setConfirmReset(false)
              dispatch({ type: 'PAUSE' })
            }}
            onReset={() => setConfirmReset(true)}
            onCancel={() => setConfirmReset(false)}
            onConfirm={handleConfirmReset}
          />
        </>
      )}
    </div>
  )
}
