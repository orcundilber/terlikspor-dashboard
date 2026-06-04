import type { Match } from '@/types'
import { Trophy } from 'lucide-react'

interface Props {
  matches: Match[]
}

const TERLIK_ID = '38'

export default function RecentMatchesCard({ matches }: Props) {
  const played = matches.filter(m => m.played).sort((a, b) => {
    const toDate = (s: string) => {
      if (!s) return 0
      const [d, m, y] = s.split('.').map(Number)
      return new Date(y, m - 1, d).getTime()
    }
    return toDate(b.date) - toDate(a.date)
  }).slice(0, 12)

  if (!played.length) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-5 text-center text-text-muted text-sm">
        Son oynanan maç bulunamadı
      </div>
    )
  }

  function getResult(m: Match) {
    if (!m.played || m.homeScore === null || m.awayScore === null) return null
    const isHome = m.homeTeamId === TERLIK_ID
    const our = isHome ? m.homeScore : m.awayScore
    const their = isHome ? m.awayScore : m.homeScore
    if (our > their) return { type: 'W', label: 'GAL', barClass: 'bg-neon-green', scoreClass: 'text-neon-green', badgeClass: 'bg-neon-green/15 text-neon-green border-neon-green/20' }
    if (our < their) return { type: 'L', label: 'MAĞ', barClass: 'bg-neon-red', scoreClass: 'text-neon-red', badgeClass: 'bg-neon-red/15 text-neon-red border-neon-red/20' }
    return { type: 'D', label: 'BER', barClass: 'bg-neon-yellow', scoreClass: 'text-neon-yellow', badgeClass: 'bg-neon-yellow/15 text-neon-yellow border-neon-yellow/20' }
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-5 overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-green/60 flex items-center justify-center">
          <Trophy size={16} className="text-background" />
        </div>
        <div>
          <h3 className="text-sm font-display font-semibold text-white">Son Oynanan Maçlar</h3>
          <p className="text-[11px] text-text-muted">TerlikSpor Sonuçları</p>
        </div>
      </div>

      <div className="space-y-2">
        {played.map((m) => {
          const isHome = m.homeTeamId === TERLIK_ID
          const opponent = isHome ? m.awayTeam : m.homeTeam
          const terlikScore = isHome ? m.homeScore : m.awayScore
          const oppScore = isHome ? m.awayScore : m.homeScore
          const result = getResult(m)

          return (
            <a
              key={m.id}
              href={`https://www.legendscupofficial.com.tr/match/${m.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-surfaceElevated/30 hover:bg-surfaceElevated hover:border-border transition-all duration-200 group"
            >
              {/* Result indicator */}
              <div
                className={`w-1 h-8 rounded-full ${result?.barClass} flex-shrink-0`}
              />

              {/* Match info */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-text-muted mb-1">{m.date}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neon-orange truncate">TerlikSpor</span>
                  <span className="text-xs text-text-muted">{isHome ? '(E)' : '(D)'}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-text-muted">vs</span>
                  <span className="text-xs text-text-secondary group-hover:text-white truncate">
                    {opponent}
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                  className={`text-lg font-mono font-bold ${result?.scoreClass}`}
                >
                  {terlikScore}
                </span>
                <span className="text-xs text-text-muted">–</span>
                <span className="text-lg font-mono font-bold text-white">
                  {oppScore}
                </span>
              </div>

              {/* Result badge */}
              <div className={`px-2 py-1 rounded-lg border ${result?.badgeClass} text-[10px] font-bold flex-shrink-0`}>
                {result?.label}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
