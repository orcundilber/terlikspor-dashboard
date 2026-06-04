import { NextResponse } from 'next/server'
import { scrapeMatches } from '@/lib/scraper'

export const revalidate = 300

export async function GET() {
  try {
    const matches = await scrapeMatches()
    return NextResponse.json({ success: true, data: matches, fetchedAt: new Date().toISOString() })
  } catch (err) {
    console.error('[matches]', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
