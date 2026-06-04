'use client'
import type { TeamInfo } from '@/types'

interface Props { team: TeamInfo | null; loading: boolean }

const TERLIK_ID = '38'

export default function HeroCard({ team, loading }: Props) {
  const stats = [
    { label: 'Sıra', value: team?.pos, icon: '🏆' },
    { label: 'Puan', value: team?.points, icon: '⚡' },
    { label: 'Maç', value: team?.played, icon: '🎯' },
    { label: 'G', value: team?.won, icon: '✅' },
    { label: 'B', value: team?.drawn, icon: '🔄' },
    { label: 'M', value: team?.lost, icon: '❌' },
  ]

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-surface border border-border p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl skeleton" />
          <div className="flex-1 space-y-3">
            <div className="h-7 w-48 skeleton rounded-lg" />
            <div className="h-4 w-64 skeleton rounded-lg" />
          </div>
          <div className="flex gap-4">
            {stats.map((_, i) => (
              <div key={i} className="w-16 h-16 skeleton rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-4 sm:p-6 mb-6 group card-hover">
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-orange/10 rounded-full blur-3xl group-hover:bg-neon-orange/20 transition-all duration-500" />
      
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Logo with neon ring */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-neon-orange/20 blur-xl animate-pulse-glow" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surfaceElevated border-2 border-neon-orange/50 flex items-center justify-center overflow-hidden">
            {team?.logoUrl ? (
              <img src={team.logoUrl} alt="TerlikSpor" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl sm:text-3xl font-display font-bold text-neon-orange">T</span>
            )}
          </div>
          {/* Neon ring animation */}
          <div className="absolute inset-0 rounded-2xl border-2 border-neon-orange/30 animate-ping opacity-50" />
        </div>

        {/* Team info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              TERLİK SPOR
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neon-orange/20 text-neon-orange border border-neon-orange/30">
              Bursa 1. Ligi
            </span>
          </div>
          <p className="text-sm text-text-secondary font-medium">
            Legends Cup · 2025-2026 Sezonu
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-1.5 sm:gap-3 w-full sm:w-auto overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className={`flex flex-col items-center justify-center min-w-[40px] w-10 sm:w-14 h-14 sm:h-16 rounded-xl border transition-all duration-300 flex-shrink-0 ${
                stat.label === 'Sıra' || stat.label === 'Puan'
                  ? 'bg-neon-orange/10 border-neon-orange/30'
                  : 'bg-surfaceElevated border-border'
              }`}
            >
              <span className={`text-base sm:text-lg font-mono font-bold ${
                stat.label === 'Sıra' || stat.label === 'Puan' 
                  ? 'text-neon-orange' 
                  : 'text-white'
              }`}>
                {stat.value ?? '—'}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-text-muted mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-orange/50 to-transparent" />
    </div>
  )
}