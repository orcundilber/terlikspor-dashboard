export interface StandingRow {
  pos: number
  name: string
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  isTerlik: boolean
}

export interface Match {
  id: string
  date: string
  time: string
  week: string
  homeTeam: string
  homeTeamId: string
  awayTeam: string
  awayTeamId: string
  homeScore: number | null
  awayScore: number | null
  played: boolean
  venue: string
}

export interface Scorer {
  rank: number
  name: string
  playerId: string
  team: string
  goals: number
  isTerlik: boolean
}

export interface Player {
  name: string
  playerId: string
  position: string
  matches: number
  goals: number
}

export interface TeamInfo {
  name: string
  city: string
  pos: number
  played: number
  won: number
  drawn: number
  lost: number
  points: number
  logoUrl: string | null
}

export interface DashboardData {
  team: TeamInfo
  standings: StandingRow[]
  matches: Match[]
  scorers: Scorer[]
  fetchedAt: string
}
