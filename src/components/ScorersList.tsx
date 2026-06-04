'use client'
import type { Scorer } from '@/types'
import { Trophy, Medal, Award } from 'lucide-react'

interface Props { scorers: Scorer[]; loading: boolean }

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-amber-400/30 blur-lg rounded-full" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <Trophy size={14} className="text-black" />
        </div>
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-slate-300/30 blur-lg rounded-full" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center">
          <Medal size={14} className="text-black" />
        </div>
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-orange-400/30 blur-lg rounded-full" />
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <Award size={14} className="text-black" />
        </div>
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-lg bg-surfaceElevated flex items-center justify-center">
      <span className="text-xs font-mono font-bold text-text-muted">{rank}</span>
    </div>
  )
}

export default function ScorersList({ scorers, loading }: Props) {
  if (loading) return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-14 rounded-xl skeleton" />
      ))}
    </div>
  )

  if (!scorers.length) return (
    <div className="text-center py-12 text-text-muted text-sm">
      Gol krallığı verisi bulunamadı.
    </div>
  )

  const max = Math.max(...scorers.map(s => s.goals), 1)
  const top3 = scorers.slice(0, 3)
  const rest = scorers.slice(3)

  return (
    <div className="space-y-4">
      {/* Top 3 with premium cards */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {top3.map((s) => (
            <a
              key={s.playerId}
              href={`https://www.legendscupofficial.com.tr/player/${s.playerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] card-hover ${
                s.isTerlik 
                  ? 'bg-gradient-to-br from-neon-orange/20 to-surface border-neon-orange/40 shadow-glow' 
                  : 'bg-surfaceElevated border-border hover:border-borderLight'
              }`}
            >
              {s.isTerlik && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon-orange rounded-full flex items-center justify-center">
                  <span className="text-[10px]">★</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-3">
                <RankIcon rank={s.rank} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${s.isTerlik ? 'text-neon-orange' : 'text-white'}`}>
                    {s.name}
                  </div>
                  <div className="text-[10px] text-text-muted">{s.team}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden mr-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${s.isTerlik ? 'bg-gradient-to-r from-neon-orange to-neon-orangeLight' : 'bg-gradient-to-r from-text-muted to-text-secondary'}`}
                    style={{ width: `${Math.round((s.goals / max) * 100)}%` }}
                  />
                </div>
                <span className={`text-xl font-mono font-bold ${s.isTerlik ? 'text-neon-orange' : 'text-white'}`}>
                  {s.goals}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Rest of the list */}
      {rest.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-text-muted px-1">
            Diğer Oyuncular
          </div>
          {rest.map((s) => (
            <a
              key={s.playerId}
              href={`https://www.legendscupofficial.com.tr/player/${s.playerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-surfaceElevated hover:border-border transition-all duration-200 group ${
                s.isTerlik ? 'bg-neon-orange/5' : ''
              }`}
            >
              <span className={`w-6 text-center text-xs font-mono font-medium ${s.rank <= 10 ? 'text-text-muted' : 'text-text-muted/50'}`}>
                {s.rank}
              </span>
              
              <div className="flex-1 min-w-0">
                <div className={`text-sm ${s.isTerlik ? 'text-neon-orange font-medium' : 'text-text-secondary group-hover:text-white'}`}>
                  {s.isTerlik && <span className="mr-1 text-[10px]">★</span>}
                  {s.name}
                </div>
                {s.team && (
                  <div className="text-[10px] text-text-muted">{s.team}</div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 bg-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${s.isTerlik ? 'bg-neon-orange' : 'bg-text-muted/30'}`}
                    style={{ width: `${Math.round((s.goals / max) * 100)}%` }}
                  />
                </div>
                <span className={`text-sm font-mono font-bold w-8 text-right ${s.isTerlik ? 'text-neon-orange' : 'text-white'}`}>
                  {s.goals}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}