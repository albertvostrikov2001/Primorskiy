'use client'

import { useState } from 'react'
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
    title: 'Нужно хранение контейнера или груза',
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
    title: 'Нужно экспедирование или таможня',
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
    title: 'Нужна перетарка или погрузо-разгрузочные работы',
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

export default function ScenariosSection() {
  const [active, setActive] = useState<string>(scenarios[0].id)
  const current = scenarios.find((s) => s.id === active) ?? scenarios[0]

  return (
    <section className="section-py bg-slate-50" aria-labelledby="scenarios-heading">
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
        >
          {/* Dark sidebar */}
          <div
            className="flex shrink-0 flex-col gap-1 p-3"
            style={{ background: 'linear-gradient(160deg,#0f1d3a 0%,#162d56 100%)', width: 220 }}
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
                onClick={() => setActive(s.id)}
                className={cn(
                  'flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-all duration-200',
                  active === s.id
                    ? 'bg-brand-accent/20'
                    : 'hover:bg-white/5'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 shrink-0 text-xs font-bold tabular-nums',
                    active === s.id ? 'text-brand-accent' : 'text-white/25'
                  )}
                >
                  {s.num}
                </span>
                <span
                  className={cn(
                    'text-xs leading-snug',
                    active === s.id ? 'font-semibold text-white' : 'text-white/50'
                  )}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div
            role="tabpanel"
            id={`scenario-panel-${current.id}`}
            aria-labelledby={`scenario-tab-${current.id}`}
            className="flex flex-1 flex-col justify-center bg-white p-8 md:p-10"
          >
            {/* Badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1">
              <current.icon className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                {current.badge}
              </span>
            </div>

            <h3 className="mb-3 text-xl font-bold leading-snug text-text-primary">
              {current.title}
            </h3>
            <p className="mb-7 max-w-lg leading-relaxed text-text-secondary">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={current.href}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
              >
                {current.cta}
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
              onClick={() => setActive(s.id)}
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
