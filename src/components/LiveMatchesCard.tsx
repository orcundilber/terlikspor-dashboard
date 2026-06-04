import type { Match } from '@/types'
import { Clock, AlertCircle } from 'lucide-react'

interface Props {
  matches: Match[]
}

const TERLIK_ID = '38'

export default function LiveMatchesCard({ matches }: Props) {
  const today = new Date()
  const todayStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`

  // Bugünün maçları (oynanmış ve oynanmamış)
  const todayMatches = matches
    .filter(m => m.date === todayStr)
    .sort((a, b) => {
      const timeToMin = (t: string) => {
        if (!t) return 999999
        const [h, min] = t.split(':').map(Number)
        return h * 60 + min
      }
      return timeToMin(a.time) - timeToMin(b.time)
    })

  if (!todayMatches.length) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-5 text-center text-text-muted text-sm">
        Bugün maç yok
      </div>
    )
  }

  const upcoming = todayMatches.filter(m => !m.played)
  const live = todayMatches.filter(m => m.played)

  function MatchRow({ m }: { m: Match }) {
    const isHome = m.homeTeamId === TERLIK_ID
    const opponent = isHome ? m.awayTeam : m.homeTeam
    const terlikScore = m.homeScore !== null ? (isHome ? m.homeScore : m.awayScore) : null
    const oppScore = m.homeScore !== null ? (isHome ? m.awayScore : m.homeScore) : null

    return (
      <a
        key={m.id}
        href={`https://www.legendscupofficial.com.tr/match/${m.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-surfaceElevated/30 hover:bg-surfaceElevated hover:border-border transition-all duration-200 group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-neon-orange">TerlikSpor</span>
            <span className="text-xs text-text-muted">{isHome ? '(E)' : '(D)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">vs</span>
            <span className="text-xs text-text-secondary truncate">{opponent}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {m.played ? (
            <>
              <span className={`text-lg font-mono font-bold ${terlikScore! > oppScore! ? 'text-neon-green' : terlikScore! < oppScore! ? 'text-neon-red' : 'text-neon-yellow'}`}>
                {terlikScore}
              </span>
              <span className="text-text-muted">–</span>
              <span className="text-lg font-mono font-bold text-white">{oppScore}</span>
            </>
          ) : (
            <span className="text-xs text-neon-blue font-medium flex items-center gap-1">
              <Clock size={12} />
              {m.time || '—'}
            </span>
          )}
        </div>
      </a>
    )
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-5 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-orange to-neon-orange/60 flex items-center justify-center animate-pulse">
          <AlertCircle size={16} className="text-background" />
        </div>
        <div>
          <h3 className="text-sm font-display font-semibold text-white">Anlık Eşleşmeler</h3>
          <p className="text-[11px] text-text-muted">Bugünün maçları</p>
        </div>
      </div>

      <div className="space-y-3">
        {live.length > 0 && (
          <div>
            <div className="text-[10px] font-semibold text-neon-green uppercase tracking-wider mb-2">
              ⚽ Oynanıyor
            </div>
            <div className="space-y-2">
              {live.map(m => <MatchRow m={m} />)}
            </div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            {live.length > 0 && <div className="h-px bg-border my-3" />}
            <div className="text-[10px] font-semibold text-neon-blue uppercase tracking-wider mb-2">
              ⏱ Yaklaşan
            </div>
            <div className="space-y-2">
              {upcoming.map(m => <MatchRow m={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
