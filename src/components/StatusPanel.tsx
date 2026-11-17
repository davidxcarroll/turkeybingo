import { PARTY_EMOJIS } from '../lib/bingo'
import { useGame } from '../state/useGame'
import { StatusEmoji } from './stubs/StatusEmoji'

export function StatusPanel() {
  const { state } = useGame()
  const prize = state.prizeText.trim()

  if (state.gameState === 'REVIEW') {
    return (
      <div className="flex w-full flex-col items-center text-center text-[var(--bingo-accent)]">
        <p className="font-monument-narrow-italic text-[length:var(--bingo-selected-size)] leading-none uppercase">
          “BINGO!”
        </p>
        <StatusEmoji
          emoji="⏳"
          label="Under review"
          className="emoji-spin my-[clamp(0.75rem,2vh,1.5rem)]"
        />
        <p className="mt-[clamp(0.75rem,1.5vh,1.25rem)] text-[clamp(1rem,2vh,1.5rem)] leading-tight">
          Under review...<br />Don't clear your boards yet
        </p>
      </div>
    )
  }

  if (state.gameState === 'FALSE') {
    return (
      <div className="flex w-full flex-col items-center text-center text-[var(--bingo-false)]">
        <p className="font-monument-narrow-italic text-[length:var(--bingo-selected-size)] leading-none uppercase">
          False
        </p>
        <StatusEmoji
          emoji="🚫"
          label="False alarm"
          className="emoji-false my-[clamp(0.75rem,2vh,1.5rem)]"
        />
        <p className="font-monument-narrow-italic text-[length:var(--bingo-selected-size)] leading-none uppercase">
          Bingo!
        </p>
      </div>
    )
  }

  if (state.gameState === 'WINNER') {
    return (
      <div className="flex w-full flex-col items-center text-center text-[var(--bingo-winner)]">
        <p className="font-monument-narrow-italic text-[length:var(--bingo-selected-size)] leading-none uppercase">
          Bingo
        </p>
        <StatusEmoji
          emoji="👏"
          label="Winner confirmed"
          className="emoji-winner my-[clamp(0.75rem,2vh,1.5rem)]"
        />
        <p className="font-monument-narrow-italic text-[length:var(--bingo-selected-size)] leading-none uppercase">
          Winner!
        </p>
      </div>
    )
  }

  if (prize) {
    return (
      <div className="flex w-full flex-col items-center text-center">
        <p className="font-yellowtail text-[clamp(1.5rem,3vh,2.25rem)] leading-none text-[var(--bingo-accent)]">
          Playing for
        </p>
        <p className="font-monument-narrow-italic mt-[clamp(0.5rem,1vh,0.85rem)] text-[length:var(--bingo-selected-size)] leading-none uppercase text-white text-balance">
          {prize}
        </p>
      </div>
    )
  }

  return (
    <StatusEmoji
      emoji={PARTY_EMOJIS[state.partyEmojiIndex % PARTY_EMOJIS.length]!}
      label="Party"
    />
  )
}
