import { useEffect, useRef } from 'react'

export function useWakeLock(): void {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    let cancelled = false

    async function requestLock() {
      if (!('wakeLock' in navigator)) return
      try {
        const lock = await navigator.wakeLock.request('screen')
        if (cancelled) {
          await lock.release()
          return
        }
        wakeLockRef.current = lock
        lock.addEventListener('release', () => {
          if (wakeLockRef.current === lock) {
            wakeLockRef.current = null
          }
        })
      } catch {
        // Unsupported / denied -- fail soft
      }
    }

    void requestLock()

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        void requestLock()
      }
    }

    const onFirstGesture = () => {
      void requestLock()
    }

    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('pointerdown', onFirstGesture, { once: true })

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('pointerdown', onFirstGesture)
      void wakeLockRef.current?.release()
      wakeLockRef.current = null
    }
  }, [])
}
