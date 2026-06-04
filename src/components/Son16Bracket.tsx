'use client'
import { useState, useEffect } from 'react'
import type { StandingRow } from '@/types'
import { Trophy, Users2 } from 'lucide-react'

interface Props {
  standings: StandingRow[]
  matches: any[]
}

export default function Son16Bracket({ standings: initialStandings }: Props) {
  const [standings, setStandings] = useState<StandingRow[]>(initialStandings)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/standings')
        const json = await res.json()
        if (json.success && json.data) {
          setStandings(json.data)
        }
      } catch (err) {
        console.error('Standings çekme hatası:', err)
      } finally {
        setLoading(false)
      }
    }

    const interval = setInterval(fetchStandings, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getTeamByPos = (pos: number) => standings.find(t => t.pos === pos)

  const matchups = [
    { pos1: 2, pos2: 17 },
    { pos1: 9, pos2: 10 },
    { pos1: 7, pos2: 12 },
    { pos1: 4, pos2: 15 },
    { pos1: 3, pos2: 16 },
    { pos1: 8, pos2: 11 },
    { pos1: 6, pos2: 13 },
    { pos1: 5, pos2: 14 },
  ]

  const TeamBox = ({ pos }: { pos: number }) => {
    const team = getTeamByPos(pos)
    return (
      <div className="px-3 py-3 rounded-xl bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 hover:border-green-400/50 transition-all shadow-md hover:shadow-lg hover:shadow-green-500/20">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-white bg-gradient-to-r from-yellow-500 to-orange-500 px-2.5 py-1 rounded-lg shadow-md">{pos}.</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-white uppercase tracking-wide truncate">{team?.name || 'Takım'}</div>
            <div className="text-[8px] text-green-300 font-semibold">{team?.points || 0} Puan</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-6 bg-gradient-to-b from-green-950/30 to-background rounded-3xl p-6 border border-green-900/40">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-green-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-display font-black text-white uppercase tracking-wider">SON 16 TURU</h3>
            <p className="text-[10px] text-green-300 font-bold">Eleme Müsabakası</p>
          </div>
        </div>
        {loading && <div className="text-[10px] text-yellow-400 font-bold animate-pulse">Güncelleniyor...</div>}
      </div>

      {/* 1. Takım - BYE */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 via-green-600/20 to-green-700/10 border-2 border-green-500/50 shadow-lg shadow-green-500/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
            <span className="text-sm font-black text-white">⭐</span>
          </div>
          <div>
            <div className="text-sm font-display font-black text-green-300 uppercase tracking-wide">1. Takım - Doğrudan Final</div>
            <div className="text-[10px] text-green-200 font-bold">{getTeamByPos(1)?.name || '—'}</div>
          </div>
        </div>
        <div className="text-[10px] text-green-200/70 font-semibold italic pl-11">
          Bu takım son 16 turuna katılmaksızın finalde yer alacaktır.
        </div>
      </div>

      {/* Matchups Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-black text-yellow-400 uppercase tracking-wider">
          <Users2 size={16} />
          <span>Eşleşmeler</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchups.map((match, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-green-900/30 to-green-800/10 border-2 border-green-600/40 hover:border-green-500/60 transition-all shadow-lg hover:shadow-green-500/30">
              <div className="text-[10px] font-display font-black text-yellow-400 uppercase mb-3 tracking-wider">
                Maç {idx + 1}
              </div>
              <div className="space-y-3">
                <TeamBox pos={match.pos1} />
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                  <span className="text-xs font-black text-green-400 px-2">VS</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                </div>
                <TeamBox pos={match.pos2} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-800/10 border-2 border-blue-600/40">
        <div className="font-display font-black text-blue-300 uppercase tracking-wider mb-3">Turnuva Yapısı</div>
        <div className="space-y-2 text-[10px] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-black">1.</span>
            <span className="text-white">SON 16 TURU</span>
            <span className="text-green-300">→ 16 takım</span>
            <span className="text-blue-300">8 kazanan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-black">2.</span>
            <span className="text-white">ÇEYREK FİNAL</span>
            <span className="text-green-300">→ 8 takım</span>
            <span className="text-blue-300">4 kazanan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-black">3.</span>
            <span className="text-white">YARI FİNAL</span>
            <span className="text-green-300">→ 4 takım</span>
            <span className="text-blue-300">2 kazanan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-black">4.</span>
            <span className="text-white">FİNAL</span>
            <span className="text-green-300">→ 2 takım + 1. Takım</span>
            <span className="text-orange-400 font-black">ŞAMPİYON</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-blue-600/30 text-[9px] text-blue-300/70 font-semibold">
          ↻ Her 2 dakikada bir otomatik güncelleniyor
        </div>
      </div>
    </div>
  )
}
