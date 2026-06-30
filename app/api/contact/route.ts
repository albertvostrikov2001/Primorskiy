import { NextRequest, NextResponse } from 'next/server'
import { quickFormSchema, fullFormSchema } from '@/lib/validation/contact'
import { sendEmail } from '@/lib/email/adapter'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX ?? '10', 10)
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return `contact:${ip}`
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitKey = getRateLimitKey(req)
  if (!checkRateLimit(rateLimitKey)) {
    return NextResponse.json(
      { error: 'Превышен лимит запросов. Попробуйте позже.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  // Detect form type
  const formType = typeof body === 'object' && body !== null && 'formType' in body
    ? (body as Record<string, unknown>).formType
    : 'quick'

  // Honeypot check
  if (typeof body === 'object' && body !== null && 'honeypot' in body) {
    const hp = (body as Record<string, unknown>).honeypot
    if (typeof hp === 'string' && hp.length > 0) {
      // Silent reject
      return NextResponse.json({ success: true })
    }
  }

  // Validate
  const schema = formType === 'full' ? fullFormSchema : quickFormSchema
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  // Send
  try {
    await sendEmail({
      formType: formType as 'quick' | 'full',
      data: parsed.data,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact form] send error:', err)
    return NextResponse.json(
      { error: 'Ошибка отправки. Попробуйте позже или свяжитесь по телефону.' },
      { status: 500 }
    )
  }
}
