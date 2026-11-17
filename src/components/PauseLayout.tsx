import { Sidebar } from './Sidebar'

export function PauseLayout() {
  return (
    <div className="flex h-full w-full gap-[clamp(0.5rem,0.8vw,0.75rem)] p-[clamp(0.25rem,0.8vw,0.5rem)]">
      <div className="flex h-full min-w-0 flex-1 flex-col justify-center rounded-[2.5rem] border-6 border-[var(--bingo-accent)] px-[clamp(1.5rem,3vw,3rem)] py-[clamp(1rem,3vh,2.5rem)]">
        <div className="flex flex-col gap-[clamp(1.25rem,4vh,3.5rem)] text-[clamp(2rem,5.5vh,4rem)] font-black italic leading-[1.05] text-[var(--bingo-accent)]">
          <p className="text-center uppercase">
            {new Date().getFullYear()} Philomath
            <br />
            Middle School
          </p>
          <p className="text-center font-yellowtail text-[clamp(5rem,15vh,10rem)] leading-none">Turkey <span className="emoji">🦃</span>Bingo</p>
          <p className="text-center uppercase">
            Outdoor School
            <br />
            Fundraiser
          </p>
        </div>
      </div>
      <Sidebar paused />
    </div>
  )
}
