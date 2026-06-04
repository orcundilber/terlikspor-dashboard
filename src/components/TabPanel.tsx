'use client'
import { useState } from 'react'
import type { StandingRow, Match, Scorer, Player } from '@/types'
import StandingsTable from './StandingsTable'
import ScorersList from './ScorersList'
import PlayersList from './PlayersList'
import Son16Bracket from './Son16Bracket'
import { Trophy, Star, Zap, Users } from 'lucide-react'

interface Props {
  standings: StandingRow[]
  matches: Match[]
  scorers: Scorer[]
  players: Player[]
  loading: boolean
}

const TABS = [
  { id: 'standings', label: 'Puan Durumu', icon: Trophy },
  { id: 'players', label: 'Oyuncular', icon: Users },
  { id: 'bracket', label: 'Son 16 Turu', icon: Zap },
  { id: 'scorers', label: 'Gol Krallığı', icon: Star },
] as const

type TabId = typeof TABS[number]['id']

export default function TabPanel({ standings, matches, scorers, players, loading }: Props) {
  const [active, setActive] = useState<TabId>('standings')

  return (
    <div className="space-y-4">
      {/* Modern tab bar with glassmorphism */}
      <div className="relative flex gap-1 p-1 rounded-2xl bg-surface/50 border border-border/50 backdrop-blur-sm">
        {/* Active indicator */}
        <div 
          className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-neon-orange to-neon-orangeLight transition-all duration-300 ease-out"
          style={{
            width: `calc(${100 / TABS.length}% - 8px)`,
            transform: `translateX(${TABS.findIndex(t => t.id === active) * 100}%)`,
          }}
        />
        
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 z-10 ${
                isActive 
                  ? 'text-background' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-background' : 'text-text-muted'} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Panels with fade animation */}
      <div className="relative min-h-[400px]">
        {active === 'standings' && (
          <div className="animate-fade-in">
            <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-orange to-neon-orangeLight flex items-center justify-center">
                    <Trophy size={16} className="text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-white">Puan Durumu</h3>
                    <p className="text-[11px] text-text-muted">Bursa 1. Ligi · 2025-2026</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-surfaceElevated border border-border text-text-secondary">
                  {standings.length} Takım
                </span>
              </div>
              <StandingsTable standings={standings} loading={loading} />
            </div>
          </div>
        )}

        {active === 'players' && (
          <div className="animate-fade-in">
            <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-purpleLight flex items-center justify-center">
                    <Users size={16} className="text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-white">Oyuncular</h3>
                    <p className="text-[11px] text-text-muted">TERLİK SPOR Kadrasu</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-surfaceElevated border border-border text-text-secondary">
                  {players.length} Oyuncu
                </span>
              </div>
              <PlayersList players={players} loading={loading} />
            </div>
          </div>
        )}

        {active === 'bracket' && (
          <div className="animate-fade-in">
            <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-orange to-neon-orangeLight flex items-center justify-center">
                    <Zap size={16} className="text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-white">Son 16 Eleme Turu</h3>
                    <p className="text-[11px] text-text-muted">Turnuva Eşleşmeleri</p>
                  </div>
                </div>
              </div>
              <Son16Bracket standings={standings} matches={matches} />
            </div>
          </div>
        )}

        {active === 'scorers' && (
          <div className="animate-fade-in">
            <div className="rounded-3xl bg-gradient-to-br from-surface to-surfaceElevated border border-border/50 p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-purpleLight flex items-center justify-center">
                    <Star size={16} className="text-background" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-white">Gol Krallığı</h3>
                    <p className="text-[11px] text-text-muted">Bursa 1. Ligi</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-surfaceElevated border border-border text-text-secondary">
                  {scorers.length} Oyuncu
                </span>
              </div>
              <ScorersList scorers={scorers} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}