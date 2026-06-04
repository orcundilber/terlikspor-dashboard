import { NextResponse } from 'next/server'
import { scrapeStandings } from '@/lib/scraper'

export const revalidate = 120 // 2 dakika cache

export async function GET() {
  try {
    const standings = await scrapeStandings()
    return NextResponse.json({
      success: standings.length > 0,
      data: standings,
      fetchedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[standings]', err)
    return NextResponse.json(
      { success: false, data: [], error: String(err) },
      { status: 500 }
    )
  }
}
