'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Container, RefreshCw, Package, Truck, AlertTriangle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

const scenarios = [
  {
    id: 'storage-container',
    icon: Container,
    title: 'Нужно хранение контейнера',
    description:
      'Временное или длительное размещение гружёного или порожнего контейнера на терминальной площадке.',
    href: '/uslugi/hranenie-konteynerov',
    cta: 'Узнать об условиях хранения',
  },
  {
    id: 'retarka',
    icon: RefreshCw,
    title: 'Нужна перетарка',
    description:
      'Перегрузка груза из контейнера в автомобиль или наоборот. Смена вида тары без транспортировки на другой склад.',
    href: '/uslugi/peretarka-gruzov',
    cta: 'Рассчитать стоимость перетарки',
  },
  {
    id: 'storage-cargo',
    icon: Package,
    title: 'Нужно хранение груза',
    description:
      'Временное хранение паллетированного, тарно-штучного или генерального груза на терминале.',
    href: '/uslugi/hranenie-gruzov',
    cta: 'Получить условия хранения',
  },
  {
    id: 'transportation',
    icon: Truck,
    title: 'Нужен вывоз или перевозка',
    description:
      'Доставка контейнера из порта на терминал или от терминала до склада получателя в регионе.',
    href: '/uslugi/konteynernye-perevozki',
    cta: 'Обсудить логистику',
  },
  {
    id: 'nonstandard',
    icon: AlertTriangle,
    title: 'Нестандартная обработка',
    description:
      'Работа с тяжеловесными или негабаритными грузами по предварительному согласованию.',
    href: '/uslugi/nestandartnye-gruzy',
    cta: 'Оставить заявку на согласование',
  },
]

export default function ScenariosSection() {
  const [active, setActive] = useState<string>(scenarios[0].id)
  const current = scenarios.find((s) => s.id === active) ?? scenarios[0]

  return (
    <section className="section-py bg-white" aria-labelledby="scenarios-heading">
      <div className="container-site">
        <SectionTitle
          id="scenarios-heading"
          tag="h2"
          title="Какую задачу нужно решить?"
          subtitle="Выберите сценарий — расскажем, как работает терминал для этой задачи"
          centered
          className="mb-10"
        />

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Tabs */}
          <div className="flex shrink-0 flex-col gap-1 lg:w-72" role="tablist" aria-label="Сценарии задач">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                role="tab"
                aria-selected={active === scenario.id}
                aria-controls={`scenario-panel-${scenario.id}`}
                id={`scenario-tab-${scenario.id}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3.5 text-left text-sm font-medium transition-all',
                  active === scenario.id
                    ? 'bg-brand-dark text-white shadow-indigo-glow'
                    : 'text-text-secondary hover:bg-surface-gray hover:text-brand-dark'
                )}
                onClick={() => setActive(scenario.id)}
              >
                <scenario.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`scenario-panel-${current.id}`}
            aria-labelledby={`scenario-tab-${current.id}`}
            className="flex-1 rounded-xl border border-surface-border bg-gradient-to-br from-surface-gray to-white p-6 md:p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-accent/10">
              <current.icon className="h-7 w-7 text-brand-accent" aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{current.title}</h3>
            <p className="mb-6 leading-relaxed text-text-secondary">{current.description}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={current.href}
                className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
              >
                {current.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/raschet-stoimosti"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-white px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-gray-medium"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
