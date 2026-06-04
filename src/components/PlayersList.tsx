import type { Player } from '@/types'
import { Users } from 'lucide-react'

interface Props {
  players: Player[]
  loading: boolean
}

export default function PlayersList({ players, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-surfaceElevated/30 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!players.length) {
    return (
      <div className="text-center py-8 text-text-muted">
        Oyuncu verisi bulunamadı
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Başlık */}
      <div className="grid grid-cols-12 gap-3 px-4 py-3 rounded-xl bg-surfaceElevated/30 mb-2">
        <div className="col-span-5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
          Oyuncu Adı
        </div>
        <div className="col-span-3 text-[10px] font-semibold text-text-muted uppercase tracking-wider text-center">
          Maç
        </div>
        <div className="col-span-4 text-[10px] font-semibold text-text-muted uppercase tracking-wider text-center">
          Gol
        </div>
      </div>

      {/* Oyuncular */}
      {players.map((player) => (
        <a
          key={player.playerId}
          href={`https://www.legendscupofficial.com.tr/player/${player.playerId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-12 gap-3 p-4 rounded-xl border border-border/30 bg-surfaceElevated/30 hover:bg-surfaceElevated hover:border-border transition-all duration-200 group"
        >
          <div className="col-span-5 flex flex-col justify-center">
            <div className="text-sm font-medium text-neon-orange group-hover:text-neon-orangeLight transition-colors">
              {player.name}
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">
              {player.position}
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-center">
            <div className="text-lg font-mono font-bold text-neon-blue">
              {player.matches}
            </div>
          </div>

          <div className="col-span-4 flex items-center justify-center">
            <div className="text-lg font-mono font-bold text-neon-green">
              {player.goals}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
