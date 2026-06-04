'use client'
import type { StandingRow } from '@/types'

interface Props { standings: StandingRow[]; loading: boolean }

const RANK_COLORS: Record<number, string> = {
  1: 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30',
  2: 'bg-gradient-to-br from-slate-300 to-slate-500 text-black shadow-lg shadow-slate-400/30',
  3: 'bg-gradient-to-br from-orange-400 to-orange-600 text-black shadow-lg shadow-orange-500/30',
}

const RANK_GLOW: Record<number, string> = {
  1: 'ring-2 ring-amber-400/50',
  2: 'ring-2 ring-slate-300/50',
  3: 'ring-2 ring-orange-400/50',
}

export default function StandingsTable({ standings, loading }: Props) {
  if (loading) return (
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-14 rounded-xl skeleton" />
      ))}
    </div>
  )

  if (!standings.length) return (
    <div className="text-center py-12 text-text-muted text-sm">
      Puan durumu yüklenemedi.
    </div>
  )

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-text-muted border-b border-border/50">
            <th className="py-3 px-3 text-left w-10">#</th>
            <th className="py-3 px-3 text-left">Takım</th>
            <th className="py-3 px-3 text-center w-12">O</th>
            <th className="py-3 px-3 text-center w-10">G</th>
            <th className="py-3 px-3 text-center w-10">B</th>
            <th className="py-3 px-3 text-center w-10">M</th>
            <th className="py-3 px-3 text-center w-14">Av.</th>
            <th className="py-3 px-3 text-center w-14 font-bold text-text-secondary">P</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => {
            const isTop3 = row.pos <= 3
            const rankStyle = RANK_COLORS[row.pos]
            const rankGlow = RANK_GLOW[row.pos]
            
            return (
              <tr
                key={row.pos}
                className={`group border-b border-border/30 transition-all duration-200 hover:bg-surfaceElevated/50 ${
                  row.isTerlik ? 'bg-neon-orange/5' : ''
                }`}
              >
                <td className="py-3 px-3">
                  <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono ${rankStyle} ${rankGlow ?? ''}`}>
                    {row.pos}
                  </div>
                </td>
                <td className="py-3 px-3">
                  <a
                    href={`https://www.legendscupofficial.com.tr/team/${row.teamId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 hover:translate-x-1 transition-transform ${
                      row.isTerlik 
                        ? 'font-semibold text-neon-orange' 
                        : 'text-white group-hover:text-white'
                    }`}
                  >
                    {row.isTerlik && (
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-pulse" />
                    )}
                    <span className="truncate max-w-[180px]">{row.name}</span>
                  </a>
                </td>
                <td className="py-3 px-3 text-center font-mono text-text-secondary">{row.played}</td>
                <td className="py-3 px-3 text-center font-mono text-neon-green">{row.won}</td>
                <td className="py-3 px-3 text-center font-mono text-neon-yellow">{row.drawn}</td>
                <td className="py-3 px-3 text-center font-mono text-neon-red">{row.lost}</td>
                <td className="py-3 px-3 text-center font-mono">
                  <span className={`text-xs ${row.goalDiff > 0 ? 'text-neon-green' : row.goalDiff < 0 ? 'text-neon-red' : 'text-text-muted'}`}>
                    {row.goalDiff > 0 ? '+' : ''}{row.goalDiff || '0'}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-flex items-center justify-center w-10 h-7 rounded-lg font-mono font-bold ${
                    row.isTerlik 
                      ? 'bg-neon-orange/20 text-neon-orange' 
                      : 'bg-surfaceElevated text-white'
                  }`}>
                    {row.points}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}