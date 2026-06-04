import { NextResponse } from 'next/server'
import { scrapeScorers } from '@/lib/scraper'

export const revalidate = 300

export async function GET() {
  try {
    const scorers = await scrapeScorers()
    return NextResponse.json({ success: true, data: scorers, fetchedAt: new Date().toISOString() })
  } catch (err) {
    console.error('[scorers]', err)
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
