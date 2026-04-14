import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sheets } from '@googleapis/sheets'
import { GoogleAuth } from 'google-auth-library'

interface FeedbackBody {
  page_url: string
  rating: 'yes' | 'no'
  reason?: string
  timestamp?: string
}

function stripHtml(text: string): string {
  let prev = text
  while (true) {
    const next = prev.replace(/<[^>]*>/g, '')
    if (next === prev) return next
    prev = next
  }
}

function sanitize(text: string): string {
  return stripHtml(text)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/@/g, '@\u200B')
    .replace(/#(\d)/g, '#\u200B$1')
    .slice(0, 1000)
    .trim()
}

function isValidPageUrl(url: string): boolean {
  if (url.startsWith('/')) return /^\/[\w\-./]*$/.test(url)
  try {
    const parsed = new URL(url)
    return parsed.origin === 'https://docs.metamask.io'
  } catch {
    return false
  }
}

function getDeviceType(ua: string): 'mobile' | 'desktop' {
  return /Mobile|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop'
}

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SHEETS_CREDENTIALS!, 'base64').toString()
)

const auth = new GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheetsClient = sheets({ version: 'v4', auth })

async function appendToSheet(row: string[]) {
  await sheetsClient.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Sheet1!A:E',
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { page_url: pageUrl, rating, reason, timestamp } = req.body as FeedbackBody

  if (!pageUrl || !rating || !['yes', 'no'].includes(rating)) {
    return res.status(400).json({ error: 'page_url and rating (yes/no) are required' })
  }

  if (!isValidPageUrl(pageUrl)) {
    return res.status(400).json({ error: 'invalid page_url' })
  }

  const cleanReason = reason ? sanitize(reason) : ''

  if (rating === 'no' && !cleanReason) {
    return res.status(400).json({ error: 'reason is required for negative feedback' })
  }

  const ts = timestamp ?? new Date().toISOString()

  try {
    await appendToSheet([
      ts,
      pageUrl,
      rating,
      cleanReason,
      getDeviceType((req.headers['user-agent'] as string) ?? ''),
    ])
  } catch (err) {
    console.error('Google Sheets append failed:', err)
  }

  return res.status(200).json({ ok: true })
}
