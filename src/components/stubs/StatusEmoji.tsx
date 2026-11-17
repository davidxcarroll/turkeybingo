type StatusEmojiProps = {
  emoji: string
  className?: string
  label?: string
}

/** Force text presentation so browsers use Noto Emoji instead of system color emoji. */
function asTextEmoji(emoji: string): string {
  return [...emoji]
    .filter((char) => {
      const cp = char.codePointAt(0)!
      return cp !== 0xfe0f && cp !== 0xfe0e
    })
    .map((char) => `${char}\uFE0E`)
    .join('')
}

/** Swap-ready stub for future Lottie/SVG sequences */
export function StatusEmoji({
  emoji,
  className = '',
  label,
}: StatusEmojiProps) {
  return (
    <div
      className={`emoji flex items-center justify-center text-[clamp(4rem,8vw,7rem)] leading-none ${className}`}
      role="img"
      aria-label={label ?? emoji}
    >
      {asTextEmoji(emoji)}
    </div>
  )
}
