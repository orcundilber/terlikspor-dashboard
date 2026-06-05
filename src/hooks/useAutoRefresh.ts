import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAutoRefresh(intervalMs: number = 120000) {
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await Promise.allSettled([
          fetch('/api/standings', { cache: 'no-store' }),
          fetch('/api/matches', { cache: 'no-store' }),
          fetch('/api/scorers', { cache: 'no-store' }),
          fetch('/api/team', { cache: 'no-store' }),
        ])
        router.refresh()
      } catch (error) {
        console.error('Auto-refresh failed:', error)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }, [router, intervalMs])
}
