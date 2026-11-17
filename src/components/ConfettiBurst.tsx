import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  rot: number
  vr: number
  color: string
}

const COLORS = [
  '#ffd400',
  '#34c759',
  '#ffffff',
  '#ff9f0a',
  '#ff3b30',
  '#64d2ff',
]

const RAIN_MS = 1000

type ConfettiBurstProps = {
  /** Increment/change to fire another burst */
  burstId: number
}

function spawnParticle(width: number): Particle {
  return {
    x: Math.random() * width,
    y: -12 - Math.random() * 40,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 3.2 + Math.random() * 2.8,
    w: 10 + Math.random() * 14,
    h: 6 + Math.random() * 10,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.22,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
  }
}

export function ConfettiBurst({ burstId }: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (burstId === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let alive = true
    const particles: Particle[] = []
    const startedAt = performance.now()
    let lastSpawn = startedAt

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Seed a first wave so rain appears immediately and evenly
    const cols = Math.max(18, Math.floor(canvas.width / 36))
    for (let i = 0; i < cols; i++) {
      const p = spawnParticle(canvas.width)
      p.x = ((i + 0.5) / cols) * canvas.width + (Math.random() - 0.5) * 16
      p.y = -8 - Math.random() * canvas.height * 0.15
      particles.push(p)
    }

    const frame = (now: number) => {
      if (!alive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const raining = now - startedAt < RAIN_MS
      if (raining) {
        // Spawn steadily across the width for 1s
        const spawnGap = 28
        while (lastSpawn + spawnGap <= now) {
          lastSpawn += spawnGap
          const batch = Math.max(2, Math.floor(canvas.width / 220))
          for (let i = 0; i < batch; i++) {
            particles.push(spawnParticle(canvas.width))
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr

        if (p.y > canvas.height + 24) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (raining || particles.length > 0) {
        raf = requestAnimationFrame(frame)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    raf = requestAnimationFrame(frame)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [burstId])

  if (burstId === 0) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  )
}
