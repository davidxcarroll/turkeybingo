import { Sidebar } from './Sidebar'

export function PauseLayout() {
  return (
    <div className="flex h-full w-full flex-col gap-[clamp(0.5rem,0.8vw,0.75rem)] overflow-y-auto p-[clamp(0.25rem,0.8vw,0.5rem)] sm:flex-row sm:overflow-hidden">
      <div className="flex h-full min-h-[min(70dvh,36rem)] min-w-0 flex-1 flex-col justify-center rounded-[2.5rem] px-[clamp(1.5rem,3vw,3rem)] py-[clamp(1rem,3vh,2.5rem)] sm:min-h-0 bg-blue-800">
        <div className="flex flex-col gap-[clamp(0.65rem,2vh,3.5rem)] text-[clamp(1.5rem,3vh,3rem)] font-black italic leading-[1.05] text-[var(--bingo-accent)] sm:gap-[clamp(1.25rem,4vh,3.5rem)] sm:text-[clamp(1rem,5.5vh,4rem)]">
          <p className="text-center uppercase">
            {new Date().getFullYear()} Philomath
            <br />
            Middle School
          </p>
          <p className="text-center font-yellowtail text-[clamp(3rem,8vh,5rem)] leading-none sm:text-[clamp(2.5rem,15vh,10rem)]">Turkey <span className="emoji">🦃</span>Bingo</p>
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
