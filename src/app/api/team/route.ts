import { NextResponse } from 'next/server'
import { scrapeTeamInfo } from '@/lib/scraper'

export const revalidate = 300

export async function GET() {
  try {
    const team = await scrapeTeamInfo()
    return NextResponse.json({ success: true, data: team, fetchedAt: new Date().toISOString() })
  } catch (err) {
    console.error('[team]', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
