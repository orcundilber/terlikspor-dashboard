'use client'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RefreshButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    await Promise.allSettled([
      fetch('/api/standings', { cache: 'no-store' }),
      fetch('/api/matches', { cache: 'no-store' }),
      fetch('/api/scorers', { cache: 'no-store' }),
      fetch('/api/team', { cache: 'no-store' }),
    ])
    router.refresh()
    setTimeout(() => setLoading(false), 800)
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="group relative flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface/50 backdrop-blur-sm text-sm font-medium text-text-secondary hover:text-white hover:bg-surfaceElevated hover:border-borderLight transition-all duration-200 disabled:opacity-50 cursor-pointer overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <RefreshCw 
        size={14} 
        className={`relative z-10 transition-transform duration-500 ${loading ? 'spin' : 'group-hover:rotate-180'}`} 
      />
      <span className="relative z-10">
        {loading ? 'Güncelleniyor...' : 'Yenile'}
      </span>
      
      {/* Loading indicator */}
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-orange to-neon-blue animate-shimmer" />
      )}
    </button>
  )
}