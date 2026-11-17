type IconProps = {
  name: 'check' | 'close'
  className?: string
}

export function Icon({ name, className = '' }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden>
      {name}
    </span>
  )
}
