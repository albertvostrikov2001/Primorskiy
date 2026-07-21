import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { Forklift, Truck, Cog, Container } from 'lucide-react'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Техника терминала | Терминал Приморский',
  description: 'Парк техники Терминала Приморский: ричстакер, автокран, вилочные погрузчики, автопарк грузовой техники.',
  path: '/terminal/tehnika',
})

const equipment = [
  {
    icon: Container,
    name: 'Ричстакер',
    description: 'Специализированная машина для штабелирования контейнеров в несколько ярусов. Обеспечивает высокую плотность хранения и точное позиционирование.',
    usages: ['Штабелирование контейнеров', 'Точная подача при перетарке', 'Перестановка на площадке'],
  },
  {
    icon: Cog,
    name: 'Автокран',
    description: 'Используется для подъёма тяжёлых контейнеров, негабаритных грузов и работы в ограниченном пространстве.',
    usages: ['Подъём и перестановка контейнеров', 'Работа с тяжеловесными грузами', 'Операции в труднодоступных зонах'],
  },
  {
    icon: Forklift,
    name: 'Вилочные погрузчики',
    description: 'Применяются для работы с паллетированными грузами, загрузки и выгрузки фургонов, перемещения груза по площадке.',
    usages: ['Загрузка и выгрузка автомобилей', 'Паллетирование и сортировка', 'Перемещение грузов по территории'],
  },
  {
    icon: Truck,
    name: 'Автопарк грузовой техники',
    description: 'Собственный парк грузовых автомобилей для перевозки контейнеров и грузов — из порта на терминал, до склада получателя и в международном сообщении.',
    usages: ['Доставка контейнеров из порта', 'Автодоставка до склада получателя', 'Международные перевозки'],
  },
]

export default function TehnikaPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О терминале', url: '/terminal' }, { name: 'Техника', url: '/terminal/tehnika' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'О терминале', href: '/terminal' }, { label: 'Техника' }]} className="mb-4 text-white" />
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

                <div className="mt-4 aspect-video rounded-lg bg-surface-gray-medium flex items-center justify-center text-xs text-text-muted">
                  Фото техники
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
