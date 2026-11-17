import { Controls } from './Controls'
import { StatusPanel } from './StatusPanel'

type SidebarProps = {
  paused?: boolean
}

export function Sidebar({ paused = false }: SidebarProps) {
  return (
    <aside className="flex h-auto w-full shrink-0 flex-col px-[clamp(0.75rem,1.2vw,1.25rem)] pb-[clamp(0.5rem,1vh,1rem)] pt-[clamp(0.75rem,1.5vh,1.25rem)] sm:h-full sm:w-[min(28vw,26rem)]">
      <header className="sidebar-meta shrink-0 text-center text-[#9a9a9a] space-y-2">
        {/* <p className="uppercase">
          2027 Turkey Bingo
        </p> */}
        {/* <p className="uppercase">
          Outdoor School
          <br />
          Fundraiser
        </p> */}
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center py-[clamp(0.75rem,2vh,1.5rem)] max-sm:hidden">
        {!paused && <StatusPanel />}
      </div>

      <div className="shrink-0">
        <Controls variant={paused ? 'paused' : 'play'} />
      </div>
    </aside>
  )
}
