import { useEffect } from 'react'

export function useBeforeUnload(shouldWarn: boolean): void {
  useEffect(() => {
    if (!shouldWarn) return

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [shouldWarn])
}
