/**
 * Email adapter with support for SMTP, Resend, and webhook.
 * Configure via environment variables (see .env.example).
 */

interface SendEmailParams {
  formType: 'quick' | 'full'
  data: Record<string, unknown>
}

function buildEmailHtml(formType: string, data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .filter(([k]) => !['honeypot', 'consent', 'formType'].includes(k) && data[k])
    .map(([key, val]) => {
      const label = fieldLabels[key] ?? key
      return `<tr><td style="padding:6px 12px;font-weight:600;background:#f3f4f6;border:1px solid #e5e7eb">${label}</td><td style="padding:6px 12px;border:1px solid #e5e7eb">${String(val)}</td></tr>`
    })
    .join('')

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <h2 style="background:#F59E0B;color:#ffffff;padding:16px 20px;margin:0">Новая заявка — ${formType === 'full' ? 'Расчёт стоимости' : 'Быстрая заявка'}</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">${rows}</table>
      <p style="color:#9ca3af;font-size:12px;margin-top:16px">Терминал Приморский — автоматическое уведомление с сайта</p>
    </div>
  `
}

function buildEmailText(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([k]) => !['honeypot', 'consent', 'formType'].includes(k) && data[k])
    .map(([key, val]) => `${fieldLabels[key] ?? key}: ${String(val)}`)
    .join('\n')
}

const fieldLabels: Record<string, string> = {
  service: 'Услуга',
  name: 'Имя',
  phone: 'Телефон',
  email: 'Email',
  company: 'Компания',
  comment: 'Комментарий',
  cargoType: 'Тип груза',
  weight: 'Масса (т)',
  volume: 'Объём (м³)',
  pieces: 'Количество мест',
  containerType: 'Тип контейнера',
  containerCount: 'Количество контейнеров',
  arrivalDate: 'Дата поступления',
  storagePeriod: 'Срок хранения',
  departureDatePlanned: 'Плановая дата вывоза',
  retarkaDirection: 'Направление перетарки',
  specialEquipment: 'Спецтехника',
  deliveryMethod: 'Способ доставки',
  utm_source: 'UTM Source',
  utm_medium: 'UTM Medium',
  utm_campaign: 'UTM Campaign',
}

async function sendSmtp(params: SendEmailParams) {
  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '465', 10),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    subject: `Заявка с сайта — ${params.formType === 'full' ? 'Расчёт стоимости' : 'Быстрая заявка'}`,
    text: buildEmailText(params.data),
    html: buildEmailHtml(params.formType, params.data),
  })
}

async function sendResend(params: SendEmailParams) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: [process.env.RESEND_TO],
      subject: `Заявка с сайта — ${params.formType === 'full' ? 'Расчёт стоимости' : 'Быстрая заявка'}`,
      text: buildEmailText(params.data),
      html: buildEmailHtml(params.formType, params.data),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
}

async function sendWebhook(params: SendEmailParams) {
  const secret = process.env.WEBHOOK_SECRET ?? ''
  const payload = JSON.stringify({ formType: params.formType, data: params.data })

  const res = await fetch(process.env.WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret && { 'X-Webhook-Secret': secret }),
    },
    body: payload,
  })

  if (!res.ok) {
    throw new Error(`Webhook error: ${res.status}`)
  }
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const adapter = process.env.FORM_ADAPTER ?? 'smtp'

  if (adapter === 'resend') {
    await sendResend(params)
  } else if (adapter === 'webhook') {
    await sendWebhook(params)
  } else {
    // Default: smtp
    if (!process.env.SMTP_HOST) {
      // Dev mode: log to console instead of failing
      console.log('[DEV] Form submission (no SMTP configured):', params.data)
      return
    }
    await sendSmtp(params)
  }
}
