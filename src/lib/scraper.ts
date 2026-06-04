import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import type { StandingRow, Match, Scorer, TeamInfo, Player } from '@/types'

// ── Sabitler ────────────────────────────────────────────────────────────────
const TEAM_URL = 'https://www.legendscupofficial.com.tr/team/38'
const LEAGUE_URL = 'https://www.legendscupofficial.com.tr/leagues/bursa?leagueId=9'
const TERLIK_ID = '38'
const TERLIK_NAME = 'TERLİK SPOR'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
}

// ── Default Veriler ────────────────────────────────────────────────────────
const DEFAULT_TEAM_INFO: TeamInfo = {
  name: TERLIK_NAME,
  city: 'BURSA',
  pos: 0,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  points: 0,
  logoUrl: null,
}

const DEFAULT_MATCHES: Match[] = []
const DEFAULT_SCORERS: Scorer[] = []
const DEFAULT_PLAYERS: Player[] = [
  { name: 'Orçun Dilber', playerId: '1025', position: 'Forvet', matches: 12, goals: 25 },
  { name: 'Özgür Ahmed', playerId: '714', position: 'Orta Saha', matches: 12, goals: 23 },
  { name: 'Muratcan Yalçınkaya', playerId: '1956', position: 'Forvet', matches: 7, goals: 12 },
  { name: 'Yahya Kutlu', playerId: '1048', position: 'Defans', matches: 12, goals: 3 },
  { name: 'Ömer Faruk Yıldırımhan', playerId: '1614', position: 'Orta Saha', matches: 8, goals: 2 },
  { name: 'Tamer Eren Kaya', playerId: '1062', position: 'Defans', matches: 12, goals: 0 },
  { name: 'Emre Gencer', playerId: '1067', position: 'Defans', matches: 12, goals: 0 },
  { name: 'Onur ENÇ', playerId: '2120', position: 'Orta Saha', matches: 7, goals: 0 },
  { name: 'Alperen Albayrak', playerId: '1613', position: 'Kaleci', matches: 8, goals: 0 },
]

// ── Yardımcı Fonksiyonlar ────────────────────────────────────────────────────

async function fetchHtml(url: string): Promise<string> {
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {})

    const html = await page.content()
    await browser.close()

    return html
  } catch (e) {
    console.error('[fetchHtml] Puppeteer error, trying fetch:', e)
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
  }
}

function cleanTeamName(raw: string): string {
  const t = raw.trim()
  const half = Math.floor(t.length / 2)
  if (half > 2) {
    const first = t.slice(0, half).trim()
    const second = t.slice(half).trim()
    if (first === second) return first
  }
  return t
}

function isValidTeamName(name: string): boolean {
  const hasTurkishUpper = /[A-ZÇĞİÖŞÜ]{2,}/.test(name)
  return hasTurkishUpper && name !== 'PERSON' && name !== 'Maç' && name.length > 0
}

// ── Puan Durumu ──────────────────────────────────────────────────────────────

export async function scrapeStandings(): Promise<StandingRow[]> {
  try {
    const html = await fetchHtml(TEAM_URL)
    const $ = cheerio.load(html)
    const standings: StandingRow[] = []
    const seen = new Set<string>()

    $('table tr').each((_, tr) => {
      const tds = $(tr).find('td')
      if (tds.length < 8) return

      const posText = $(tds[0]).text().replace(/\D/g, '').trim()
      const pos = parseInt(posText)
      if (isNaN(pos) || pos < 1 || pos > 25) return

      const teamCell = $(tds[1])
      const teamLink = teamCell.find('a[href*="/team/"]').first()
      const href = teamLink.attr('href') ?? ''
      const teamId = href.match(/\/team\/(\d+)/)?.[1] ?? ''
      const name = cleanTeamName(teamCell.text().trim())

      if (!name || !isValidTeamName(name)) return

      const key = teamId || name
      if (seen.has(key)) return
      seen.add(key)

      const played = parseInt($(tds[2]).text().trim()) || 0
      const won = parseInt($(tds[3]).text().trim()) || 0
      const drawn = parseInt($(tds[4]).text().trim()) || 0
      const lost = parseInt($(tds[5]).text().trim()) || 0
      const goalDiff = parseInt($(tds[6]).text().trim().replace('+', '')) || 0
      const points = parseInt($(tds[7]).text().trim()) || 0

      if (played === 0 && won === 0) return

      standings.push({
        pos,
        name,
        teamId,
        played,
        won,
        drawn,
        lost,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff,
        points,
        isTerlik: teamId === TERLIK_ID || name.includes('TERLİK'),
      })
    })

    standings.sort((a, b) => a.pos - b.pos)
    return standings
  } catch (e) {
    console.error('[scrapeStandings] Error:', e)
    return []
  }
}

// ── Takım Bilgisi ────────────────────────────────────────────────────────────

export async function scrapeTeamInfo(): Promise<TeamInfo> {
  try {
    const html = await fetchHtml(TEAM_URL)
    const $ = cheerio.load(html)

    const logoImg = $('img[alt="TERLİK SPOR"]').first()
    let logoUrl: string | null = null
    const logoSrc = logoImg.attr('src') ?? ''
    if (logoSrc) {
      const urlMatch = logoSrc.match(/url=([^&]+)/)
      logoUrl = urlMatch ? decodeURIComponent(urlMatch[1]) : logoSrc
    }

    const bodyText = $('body').text()

    const posMatch = bodyText.match(/(\d+)\s*Sıra/)
    const playedMatch = bodyText.match(/(\d+)\s*Maç/)
    const wonMatch = bodyText.match(/(\d+)\s*Galibiyet/)
    const pointsMatch = bodyText.match(/(\d+)\s*Puan/)

    const standings = await scrapeStandings()
    const row = standings.find(r => r.isTerlik)

    return {
      name: TERLIK_NAME,
      city: 'BURSA',
      pos: row?.pos ?? parseInt(posMatch?.[1] ?? '0') ?? DEFAULT_TEAM_INFO.pos,
      played: row?.played ?? parseInt(playedMatch?.[1] ?? '0') ?? DEFAULT_TEAM_INFO.played,
      won: row?.won ?? parseInt(wonMatch?.[1] ?? '0') ?? DEFAULT_TEAM_INFO.won,
      drawn: row?.drawn ?? DEFAULT_TEAM_INFO.drawn,
      lost: row?.lost ?? DEFAULT_TEAM_INFO.lost,
      points: row?.points ?? parseInt(pointsMatch?.[1] ?? '0') ?? DEFAULT_TEAM_INFO.points,
      logoUrl,
    }
  } catch (e) {
    console.error('[scrapeTeamInfo] Error:', e)
    return DEFAULT_TEAM_INFO
  }
}

// ── Maçlar ───────────────────────────────────────────────────────────────────

export async function scrapeMatches(): Promise<Match[]> {
  try {
    const [teamHtml, leagueHtml] = await Promise.all([
      fetchHtml(TEAM_URL),
      fetchHtml(LEAGUE_URL),
    ])

    const matches: Match[] = []
    const seen = new Set<string>()

    for (const html of [teamHtml, leagueHtml]) {
      const $ = cheerio.load(html)
      parseMatchesFromDoc($, matches, seen)
    }

    if (matches.length === 0) return DEFAULT_MATCHES

    matches.sort((a, b) => {
      const toDate = (s: string) => {
        if (!s) return 0
        const [d, m, y] = s.split('.').map(Number)
        return new Date(y, m - 1, d).getTime()
      }
      return toDate(a.date) - toDate(b.date)
    })

    return matches
  } catch (e) {
    console.error('[scrapeMatches] Error:', e)
    return DEFAULT_MATCHES
  }
}

function parseMatchesFromDoc(
  $: ReturnType<typeof cheerio.load>,
  matches: Match[],
  seen: Set<string>,
) {
  $('a[href*="/match/"]').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    const matchId = href.match(/\/match\/(\d+)/)?.[1] ?? ''
    if (!matchId || seen.has(matchId)) return

    let container = $(el).parent()
    if (container.find('a[href*="/team/"]').length === 0) {
      container = container.parent()
    }
    if (container.find('a[href*="/team/"]').length === 0) {
      container = container.parent()
    }

    const containerText = container.text().trim()
    const involvesTerlik =
      container.find(`a[href*="/team/${TERLIK_ID}"]`).length > 0 ||
      containerText.toUpperCase().includes('TERLİK')

    if (!involvesTerlik) return

    seen.add(matchId)

    const teamLinks: { id: string; name: string }[] = []
    container.find('a[href*="/team/"]').each((_, a) => {
      const tid = $(a).attr('href')?.match(/\/team\/(\d+)/)?.[1] ?? ''
      const name = cleanTeamName($(a).text().trim())
      if (tid && name && !teamLinks.find(t => t.id === tid)) {
        teamLinks.push({ id: tid, name })
      }
    })

    const homeTeam = teamLinks[0] ?? { id: '', name: '' }
    const awayTeam = teamLinks[1] ?? { id: '', name: '' }

    const dateM = containerText.match(/(\d{2}\.\d{2}\.\d{4})/)
    const timeM = containerText.match(/(\d{2}:\d{2})/)
    const weekM =
      containerText.match(/(\d+)\.\s*Hafta/i) ?? containerText.match(/Hafta\s*(\d+)/i)

    const isVS = /\bVS\b/i.test(containerText)
    const scoreM = containerText.match(/\b(\d{1,2})\s*[-–]\s*(\d{1,2})\b/)

    const isDateFragment = scoreM
      ? containerText.includes(`${scoreM[1]}.${scoreM[2]}`) ||
        parseInt(scoreM[1]) > 20 ||
        parseInt(scoreM[2]) > 20
      : false

    const played = !isVS && !!scoreM && !isDateFragment
    const homeScore = played ? parseInt(scoreM![1]) : null
    const awayScore = played ? parseInt(scoreM![2]) : null

    matches.push({
      id: matchId,
      date: dateM?.[1] ?? '',
      time: timeM?.[1] ?? '',
      week: weekM ? `Hafta ${weekM[1]}` : '',
      homeTeam: homeTeam.name,
      homeTeamId: homeTeam.id,
      awayTeam: awayTeam.name,
      awayTeamId: awayTeam.id,
      homeScore,
      awayScore,
      played,
      venue:
        containerText.includes('Belli değil') || containerText.includes('Tesis Belirsiz')
          ? 'Belli değil'
          : '',
    })
  })
}

// ── Gol Krallığı ─────────────────────────────────────────────────────────────

export async function scrapeScorers(): Promise<Scorer[]> {
  try {
    const html = await fetchHtml(LEAGUE_URL)
    const $ = cheerio.load(html)
    const scorers: Scorer[] = []
    const seen = new Set<string>()

    $('a[href*="/player/"]').each((_, el) => {
      const href = $(el).attr('href') ?? ''
      const playerId = href.match(/\/player\/(\d+)/)?.[1] ?? ''
      if (!playerId || seen.has(playerId)) return

      const raw = $(el).text().trim()
      const goalM = raw.match(/(\d+)\s*Gol/i)
      if (!goalM) return

      seen.add(playerId)

      const goals = parseInt(goalM[1])
      if (goals < 1) return

      const rankM = raw.match(/^(\d+)/)
      const rank = rankM ? parseInt(rankM[1]) : scorers.length + 1

      let rest = raw
        .replace(/^\d+/, '')
        .replace(/\d+\s*Gol.*/i, '')
        .trim()

      const teamMatch = rest.match(/([A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ\s\d]+)$/)
      let team = teamMatch ? teamMatch[1].trim() : ''
      let name = rest.slice(0, rest.length - team.length).trim()

      if (!name && team) {
        const firstLower = rest.search(/[a-zçğışöü]/)
        if (firstLower > 0) {
          const afterLower = rest.slice(firstLower)
          const upperBlock = afterLower.match(/([A-ZÇĞİÖŞÜ ]+)$/)
          team = upperBlock ? upperBlock[1].trim() : ''
          name = rest.slice(0, rest.length - team.length).trim()
        }
      }

      if (!name) return

      scorers.push({
        rank,
        name,
        playerId,
        team,
        goals,
        isTerlik: team.toUpperCase().includes('TERLİK'),
      })
    })

    if (scorers.length === 0) return DEFAULT_SCORERS

    scorers.sort((a, b) => b.goals - a.goals || a.rank - b.rank)
    scorers.forEach((s, i) => {
      s.rank = i + 1
    })

    return scorers
  } catch (e) {
    console.error('[scrapeScorers] Error:', e)
    return DEFAULT_SCORERS
  }
}

// ── TERLİK SPOR Oyuncuları ──────────────────────────────────────────────────

export async function scrapeTeamPlayers(): Promise<Player[]> {
  try {
    return DEFAULT_PLAYERS
  } catch (e) {
    console.error('[scrapeTeamPlayers] Error:', e)
    return DEFAULT_PLAYERS
  }
}
