import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { Forklift, Truck, Cog } from 'lucide-react'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Техника терминала | Терминал Приморский',
  description: 'Парк техники Терминала Приморский: вилочные погрузчики, контейнеровозы, автокраны, погрузчики со спредером.',
  path: '/terminal/tehnika',
})

const equipment = [
  {
    icon: Forklift,
    name: 'Вилочные погрузчики',
    description: 'Применяются для работы с паллетированными грузами, загрузки и выгрузки крытых фургонов, перемещения груза по площадке.',
    usages: ['Загрузка/выгрузка автомобилей', 'Паллетирование и сортировка', 'Перемещение грузов по территории'],
  },
  {
    icon: Truck,
    name: 'Контейнеровозы',
    description: 'Специализированные машины для горизонтального перемещения контейнеров по площадке.',
    usages: ['Подача контейнеров под загрузку', 'Расстановка на хранение', 'Перемещение к воротам'],
  },
  {
    icon: Cog,
    name: 'Автокраны',
    description: 'Используются для подъёма тяжёлых контейнеров и негабаритных грузов.',
    usages: ['Подъём и перестановка контейнеров', 'Работа с тяжеловесными грузами', 'Операции в ограниченном пространстве'],
  },
  {
    icon: Forklift,
    name: 'Погрузчики со спредером',
    description: 'Техника с боковым захватом для точного позиционирования контейнеров при перегрузке и штабелировании.',
    usages: ['Штабелирование контейнеров', 'Точная подача при перетарке', 'Минимальные повреждения при захвате'],
  },
]

export default function TehnikaPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О терминале', url: '/terminal' }, { name: 'Техника', url: '/terminal/tehnika' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'О терминале', href: '/terminal' }, { label: 'Техника' }]} className="mb-4 text-white/50 [&_a]:text-white/60 [&_a:hover]:text-brand-accent" />
          <h1 className="text-white">Терминальная техника</h1>
          <p className="mt-3 text-lg text-white/70">Собственный парк оборудования для выполнения всех типов операций с контейнерами и грузами</p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2">
            {equipment.map((eq, i) => (
              <div key={i} className="card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="icon-circle">
                    <eq.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold">{eq.name}</h2>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">{eq.description}</p>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Сценарии применения</h3>
                <ul className="space-y-1.5">
                  {eq.usages.map((u, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
                      {u}
                    </li>
                  ))}
                </ul>

                {/* Image placeholder */}
                <div className="mt-4 aspect-video rounded-lg bg-surface-gray-medium flex items-center justify-center text-xs text-text-muted">
                  Фото техники
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Точные марки, модели и количество техники подтверждаются заказчиком перед публикацией. Приведённые типы — на основании общих данных о терминале.
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
