import { scrapeTeamInfo, scrapeStandings, scrapeMatches, scrapeScorers, scrapeTeamPlayers } from '@/lib/scraper'
import HeroCard from '@/components/HeroCard'
import TabPanel from '@/components/TabPanel'
import RefreshButton from '@/components/RefreshButton'
import { Zap } from 'lucide-react'

export const revalidate = 120

export default async function DashboardPage() {
  const [team, standings, matches, scorers, players] = await Promise.all([
    scrapeTeamInfo(),
    scrapeStandings(),
    scrapeMatches(),
    scrapeScorers(),
    scrapeTeamPlayers(),
  ])

  const now = new Date()
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

  const wld = standings.find(r => r.isTerlik)

  return (
    <main className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-neon-orange animate-pulse" />
              <span className="text-xs text-text-muted font-medium">{dateStr}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              TerlikSpor
              <span className="ml-2 text-neon-orange text-glow">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border text-[11px] text-text-muted">
              <Zap size={12} className="text-neon-orange" />
              <span>Son güncelleme: {timeStr}</span>
            </div>
            <RefreshButton />
          </div>
        </div>

        {/* Hero Card */}
        <HeroCard team={team ?? wld ? {
          name: 'TERLİK SPOR',
          city: 'BURSA',
          pos: wld?.pos ?? 0,
          played: wld?.played ?? 0,
          won: wld?.won ?? 0,
          drawn: wld?.drawn ?? 0,
          lost: wld?.lost ?? 0,
          points: wld?.points ?? 0,
          logoUrl: team?.logoUrl ?? null,
        } : team} loading={false} />

        {/* Main Tab Panel */}
        <TabPanel
          standings={standings}
          matches={matches}
          scorers={scorers}
          players={players}
          loading={false}
        />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-text-muted">
            Veriler{' '}
            <a 
              href="https://www.legendscupofficial.com.tr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-neon-orange hover:underline"
            >
              legendscupofficial.com.tr
            </a>
            {' '}adresinden çekilmektedir · Her 2 dakikada bir güncellenir
          </p>
        </div>

      </div>
    </main>
  )
}