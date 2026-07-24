'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Container, FileText, RefreshCw, AlertTriangle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

const scenarios = [
  {
    id: 'storage',
    num: '01',
    icon: Container,
    badge: 'Хранение',
    title: 'Хранение контейнеров и грузов',
    description:
      'Размещаем гружёные и порожние контейнеры на терминальной площадке (до 3900 TEU), а также паллетированные, тарно-штучные и генеральные грузы — в том числе с температурным режимом.',
    href: '/uslugi/hranenie-konteynerov',
    cta: 'Условия хранения',
  },
  {
    id: 'forwarding',
    num: '02',
    icon: FileText,
    badge: 'Логистика',
    title: 'Экспедирование и таможенное оформление',
    description:
      'Организуем транспортно-экспедиционное обслуживание и таможенное оформление грузов при экспорте и импорте через порт Новороссийска. Возможна комплексная услуга: хранение + перевозка + таможня.',
    href: '/uslugi/ekspedirovanie',
    cta: 'Узнать об экспедировании',
  },
  {
    id: 'retarka',
    num: '03',
    icon: RefreshCw,
    badge: 'Обработка',
    title: 'Перетарка и погрузо-разгрузочные работы',
    description:
      'Перегружаем груз из контейнера в автомобиль, между контейнерами или выполняем затарку и растарку. Для ПРР используем вилочные погрузчики и ричстакер.',
    href: '/uslugi/peretarka-gruzov',
    cta: 'Рассчитать стоимость',
  },
  {
    id: 'nonstandard',
    num: '04',
    icon: AlertTriangle,
    badge: 'Спецгрузы',
    title: 'Нестандартная обработка груза',
    description:
      'Работаем с тяжеловесными, негабаритными грузами и наливными грузами в флексибагах — по предварительному согласованию. Каждая задача разбирается индивидуально.',
    href: '/uslugi/nestandartnye-gruzy',
    cta: 'Оставить заявку',
  },
]

const INTERVAL_MS = 4000
const FADE_OUT_MS = 180

export default function ScenariosSection() {
  const [active, setActive] = useState<string>(scenarios[0].id)
  // `displayed` lags behind `active` — it only updates after the fade-out completes
  const [displayed, setDisplayed] = useState(scenarios[0])
  const [fading, setFading] = useState(false)
  const paused = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // When active changes: fade out → swap content → fade in
  useEffect(() => {
    setFading(true)
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => {
      setDisplayed(scenarios.find((s) => s.id === active) ?? scenarios[0])
      setFading(false)
    }, FADE_OUT_MS)
    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current) }
  }, [active])

  const advance = useCallback(() => {
    if (paused.current) return
    setActive((prev) => {
      const idx = scenarios.findIndex((s) => s.id === prev)
      return scenarios[(idx + 1) % scenarios.length].id
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(advance, INTERVAL_MS)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [advance])

  const handleSelect = (id: string) => {
    setActive(id)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(advance, INTERVAL_MS)
  }

  return (
    <section className="section-py bg-slate-50" aria-labelledby="scenarios-heading">
      <style>{`
        @keyframes scenario-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .scenario-panel {
          transition: opacity ${FADE_OUT_MS}ms ease, transform ${FADE_OUT_MS}ms ease;
        }
        .scenario-panel-out {
          opacity: 0;
          transform: translateY(6px);
        }
        .scenario-panel-in {
          opacity: 1;
          transform: translateY(0);
        }
        .scenario-progress {
          animation: scenario-progress ${INTERVAL_MS}ms linear forwards;
          transform-origin: left;
        }
        @media (prefers-reduced-motion: reduce) {
          .scenario-panel { transition: none; }
          .scenario-progress { animation: none; transform: scaleX(1); }
        }
      `}</style>

      <div className="container-site">
        <SectionTitle
          id="scenarios-heading"
          tag="h2"
          title="Какую задачу нужно решить?"
          subtitle="Выберите сценарий — расскажем, как терминал решает эту задачу"
          centered
          className="mb-10"
        />

        <div
          className="overflow-hidden rounded-2xl border border-surface-border shadow-sm"
          style={{ display: 'flex' }}
          onMouseEnter={() => { paused.current = true }}
          onMouseLeave={() => { paused.current = false }}
        >
          {/* Sidebar */}
          <div
            className="flex shrink-0 flex-col gap-1 border-r border-surface-border bg-surface-gray p-3"
            style={{ width: 260 }}
            role="tablist"
            aria-label="Сценарии задач"
          >
            {scenarios.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={active === s.id}
                aria-controls={`scenario-panel-${s.id}`}
                id={`scenario-tab-${s.id}`}
                onClick={() => handleSelect(s.id)}
                className={cn(
                  'relative flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5 text-left transition-all duration-200',
                  active === s.id ? 'bg-white shadow-sm' : 'hover:bg-white/60'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 shrink-0 text-sm font-bold tabular-nums',
                    active === s.id ? 'text-brand-accent' : 'text-text-muted'
                  )}
                >
                  {s.num}
                </span>
                <span
                  className={cn(
                    'text-sm leading-snug',
                    active === s.id ? 'font-semibold text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {s.title}
                </span>

                {/* Progress bar — only on active tab, resets on each switch via key */}
                {active === s.id && (
                  <span
                    key={active}
                    className="scenario-progress absolute bottom-0 left-0 h-[2px] w-full bg-brand-accent"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content panel — CSS transition, no remount */}
          <div
            role="tabpanel"
            id={`scenario-panel-${displayed.id}`}
            aria-labelledby={`scenario-tab-${displayed.id}`}
            className={`scenario-panel flex flex-1 flex-col justify-center bg-white p-8 md:p-10 ${fading ? 'scenario-panel-out' : 'scenario-panel-in'}`}
          >
            {/* Badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1">
              <displayed.icon className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                {displayed.badge}
              </span>
            </div>

            <h3 className="mb-3 text-2xl font-bold leading-snug text-text-primary">
              {displayed.title}
            </h3>
            <p className="mb-7 max-w-lg text-base leading-relaxed text-text-secondary">
              {displayed.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={displayed.href}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
              >
                {displayed.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/raschet-stoimosti"
                className="inline-flex items-center gap-2 rounded-lg border border-surface-border bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-gray"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: vertical stacked buttons */}
        <div className="mt-4 flex flex-col gap-2 lg:hidden">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all',
                active === s.id
                  ? 'border-brand-accent/30 bg-brand-accent/5 text-brand-accent'
                  : 'border-surface-border bg-white text-text-secondary hover:border-brand-accent/20'
              )}
            >
              <s.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
