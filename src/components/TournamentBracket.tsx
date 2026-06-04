import type { Match } from '@/types'

interface Props {
  matches: Match[]
}

const TERLIK_ID = '38'

export default function TournamentBracket({ matches }: Props) {
  // Maçları hafta/round'a göre grupla
  const rounds = matches.reduce((acc, m) => {
    const week = m.week || 'Belirsiz'
    if (!acc[week]) acc[week] = []
    acc[week].push(m)
    return acc
  }, {} as Record<string, Match[]>)

  const roundKeys = Object.keys(rounds).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0')
    const numB = parseInt(b.match(/\d+/)?.[0] || '0')
    return numA - numB
  })

  if (roundKeys.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        Maç verisi bulunamadı
      </div>
    )
  }

  function getResult(m: Match) {
    if (!m.played || m.homeScore === null || m.awayScore === null) return null
    const isHome = m.homeTeamId === TERLIK_ID
    const our = isHome ? m.homeScore : m.awayScore
    const their = isHome ? m.awayScore : m.homeScore
    if (our > their) return 'W'
    if (our < their) return 'L'
    return 'D'
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-purple/60 flex items-center justify-center">
          <span className="text-lg">🏆</span>
        </div>
        <div>
          <h3 className="text-sm font-display font-semibold text-white">Turnuva Fikstürü</h3>
          <p className="text-[11px] text-text-muted">TerlikSpor Eşleşmeleri</p>
        </div>
      </div>

      <div className="space-y-8">
        {roundKeys.map((week) => {
          const roundMatches = rounds[week]
          return (
            <div key={week}>
              {/* Round Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1.5 rounded-lg bg-neon-orange/20 border border-neon-orange/30">
                  <span className="text-xs font-bold text-neon-orange uppercase">{week}</span>
                </div>
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-[10px] text-text-muted">{roundMatches.length} maç</span>
              </div>

              {/* Matches Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roundMatches.map((m) => {
                  const isHome = m.homeTeamId === TERLIK_ID
                  const opponent = isHome ? m.awayTeam : m.homeTeam
                  const terlikScore = m.homeScore !== null ? (isHome ? m.homeScore : m.awayScore) : null
                  const oppScore = m.homeScore !== null ? (isHome ? m.awayScore : m.homeScore) : null
                  const result = getResult(m)

                  return (
                    <a
                      key={m.id}
                      href={`https://www.legendscupofficial.com.tr/match/${m.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-3 rounded-xl border border-border/30 bg-surfaceElevated/40 hover:bg-surfaceElevated hover:border-border transition-all duration-200 group"
                    >
                      {/* Match Meta */}
                      <div className="text-[10px] text-text-muted mb-2 flex items-center justify-between">
                        <span>{m.date}</span>
                        {m.time && <span>{m.time}</span>}
                      </div>

                      {/* Team 1 - TerlikSpor */}
                      <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-neon-orange/10 mb-2">
                        <span className="text-xs font-bold text-neon-orange truncate flex-1">
                          TerlikSpor
                        </span>
                        <span className="text-[10px] text-text-muted">{isHome ? '(E)' : '(D)'}</span>
                      </div>

                      {/* Score */}
                      {m.played ? (
                        <div className="flex items-center justify-center gap-2 py-2 px-2 bg-surface/50 rounded-lg mb-2">
                          <span className={`text-sm font-mono font-bold ${result === 'W' ? 'text-neon-green' : result === 'L' ? 'text-neon-red' : 'text-neon-yellow'}`}>
                            {terlikScore}
                          </span>
                          <span className="text-text-muted text-xs">–</span>
                          <span className="text-sm font-mono font-bold text-white">{oppScore}</span>
                        </div>
                      ) : (
                        <div className="py-2 px-2 text-center text-[10px] text-neon-blue font-medium mb-2">
                          VS
                        </div>
                      )}

                      {/* Team 2 - Opponent */}
                      <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-surfaceElevated/50 border border-border/20">
                        <span className="text-xs font-medium text-text-secondary truncate flex-1 group-hover:text-white">
                          {opponent}
                        </span>
                        <span className="text-[10px] text-text-muted">{isHome ? '(D)' : '(E)'}</span>
                      </div>

                      {/* Result Badge */}
                      {m.played && result && (
                        <div className="mt-2 pt-2 border-t border-border/20 text-center">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${result === 'W' ? 'bg-neon-green/15 text-neon-green' : result === 'L' ? 'bg-neon-red/15 text-neon-red' : 'bg-neon-yellow/15 text-neon-yellow'}`}>
                            {result === 'W' ? '✓ GAL' : result === 'L' ? '✗ MAĞ' : '= BER'}
                          </span>
                        </div>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
