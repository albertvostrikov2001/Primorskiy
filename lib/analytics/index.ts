'use client'

import { company } from '@/config/company'

type EventName =
  | 'form_submit_quick'
  | 'form_submit_full'
  | 'form_success'
  | 'form_error'
  | 'click_phone'
  | 'click_email'
  | 'click_whatsapp'
  | 'click_telegram'
  | 'click_cta_hero'
  | 'click_cta_service'
  | 'click_route'
  | 'page_view_service'
  | 'document_download'
  | 'form_expand_fields'
  | 'request_kp'

interface EventParams {
  field?: string
  service?: string
  name?: string
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    ym?: (id: number, action: string, target?: string, params?: object) => void
    gtag?: (command: string, target: string, params?: object) => void
    dataLayer?: unknown[]
  }
}

function sendYM(event: EventName, params?: EventParams) {
  const ymId = company.analyticsYM
  if (!ymId || typeof window === 'undefined' || !window.ym) return
  try {
    window.ym(parseInt(ymId, 10), 'reachGoal', event, params)
  } catch {}
}

function sendGA(event: EventName, params?: EventParams) {
  const gaId = company.analyticsGA
  if (!gaId || typeof window === 'undefined' || !window.gtag) return
  try {
    window.gtag('event', event, params)
  } catch {}
}

export function trackEvent(event: EventName, params?: EventParams) {
  if (typeof window === 'undefined') return
  sendYM(event, params)
  sendGA(event, params)
}

/** Получить UTM-параметры из URL */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const url = new URL(window.location.href)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const params: Record<string, string> = {}
  utmKeys.forEach((key) => {
    const val = url.searchParams.get(key)
    if (val) params[key] = val
  })
  return params
}

/** Сохранить UTM-параметры в sessionStorage при первом визите */
export function persistUtmParams() {
  if (typeof window === 'undefined') return
  const utms = getUtmParams()
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('utmParams', JSON.stringify(utms))
  }
}

/** Получить сохранённые UTM-параметры */
export function getSavedUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem('utmParams')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
