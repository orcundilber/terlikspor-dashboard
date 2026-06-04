'use client'
import type { Match } from '@/types'
import { Clock, MapPin, Trophy } from 'lucide-react'

interface Props { matches: Match[]; loading: boolean }

const TERLIK_ID = '38'

function getResult(m: Match) {
  if (!m.played || m.homeScore === null || m.awayScore === null) return null
  const isHome = m.homeTeamId === TERLIK_ID
  const our   = isHome ? m.homeScore : m.awayScore
  const their = isHome ? m.awayScore : m.homeScore
  if (our > their) return 'W'
  if (our < their) return 'L'
  return 'D'
}

function ResultBadge({ result }: { result: string | null }) {
  if (!result) {
    return (
      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neon-blue/15 text-neon-blue text-[10px] font-medium border border-neon-blue/20">
        <Clock size={10} />
        Bekl.
      </span>
    )
  }
  
  const config: Record<string, { bg: string; text: string; border: string; label: string }> = {
    W: { bg: 'bg-neon-green/15', text: 'text-neon-green', border: 'border-neon-green/20', label: 'GAL' },
    D: { bg: 'bg-neon-yellow/15', text: 'text-neon-yellow', border: 'border-neon-yellow/20', label: 'BER' },
    L: { bg: 'bg-neon-red/15', text: 'text-neon-red', border: 'border-neon-red/20', label: 'MAĞ' },
  }
  
  const c = config[result]
  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${c.bg} ${c.text} ${c.border} border text-[10px] font-bold`}>
      {result === 'W' && <Trophy size={10} />}
      {c.label}
    </span>
  )
}

export default function MatchList({ matches, loading }: Props) {
  if (loading) return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl skeleton" />
      ))}
    </div>
  )

  if (!matches.length) return (
    <div className="text-center py-12 text-text-muted text-sm">
      Maç verisi bulunamadı.
    </div>
  )

  const played = matches.filter(m => m.played).reverse()
  const upcoming = matches.filter(m => !m.played)

  function MatchItem({ m }: { m: Match }) {
    const isHome = m.homeTeamId === TERLIK_ID
    const result = getResult(m)
    const opponent = isHome ? m.awayTeam : m.homeTeam
    const terlikScore = m.homeScore !== null ? (isHome ? m.homeScore : m.awayScore) : null
    const oppScore = m.homeScore !== null ? (isHome ? m.awayScore : m.homeScore) : null

    return (
      <a
        href={`https://www.legendscupofficial.com.tr/match/${m.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-surfaceElevated/30 hover:bg-surfaceElevated hover:border-border hover:translate-x-1 transition-all duration-200 group"
      >
        {/* Date/Time */}
        <div className="flex flex-col items-center w-16 flex-shrink-0">
          <span className="text-xs font-medium text-white">{m.date}</span>
          {m.time && <span className="text-[10px] text-text-muted mt-0.5">{m.time}</span>}
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-border/50" />

        {/* Teams */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${m.homeTeamId === TERLIK_ID || m.awayTeamId === TERLIK_ID ? 'text-neon-orange' : 'text-white'}`}>
              TerlikSpor
            </span>
            <span className="text-text-muted text-xs">{isHome ? '(E)' : '(D)'}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-text-muted text-xs">vs</span>
            <span className="text-sm text-text-secondary group-hover:text-white transition-colors truncate">
              {opponent || 'Bilinmiyor'}
            </span>
          </div>
          {m.week && (
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface border border-border text-text-muted">
                {m.week}
              </span>
              {m.venue && (
                <span className="text-[9px] text-text-muted flex items-center gap-0.5">
                  <MapPin size={8} />
                  {m.venue}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Score */}
        {m.played && terlikScore !== null && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xl font-mono font-bold ${result === 'W' ? 'text-neon-green' : result === 'L' ? 'text-neon-red' : 'text-neon-yellow'}`}>
              {terlikScore}
            </span>
            <span className="text-text-muted">–</span>
            <span className="text-xl font-mono font-bold text-white">
              {oppScore}
            </span>
          </div>
        )}

        <ResultBadge result={result} />
      </a>
    )
  }

  return (
    <div className="space-y-6">
      {upcoming.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Yaklaşan Maçlar</h4>
            <span className="text-[10px] text-text-muted bg-surfaceElevated px-2 py-0.5 rounded-full">{upcoming.length}</span>
          </div>
          <div className="space-y-2">
            {upcoming.map(m => <MatchItem key={m.id} m={m} />)}
          </div>
        </div>
      )}
      
      {played.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={12} className="text-neon-orange" />
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Oynanan Maçlar</h4>
            <span className="text-[10px] text-text-muted bg-surfaceElevated px-2 py-0.5 rounded-full">{played.length}</span>
          </div>
          <div className="space-y-2">
            {played.map(m => <MatchItem key={m.id} m={m} />)}
          </div>
        </div>
      )}
    </div>
  )
}