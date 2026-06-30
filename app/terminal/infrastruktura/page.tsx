import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { company } from '@/config/company'
import { CheckCircle2 } from 'lucide-react'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Инфраструктура терминала | Терминал Приморский',
  description: `Инфраструктура контейнерного терминала: площадка ${company.capacity}, ${company.distanceToPort}. Открытая площадка, подъездные пути, зоны хранения.`,
  path: '/terminal/infrastruktura',
})

const features = [
  'Открытая контейнерная площадка',
  `Вместимость ${company.capacity}`,
  `${company.distanceToPort}`,
  'Удобные подъездные пути для автотранспорта',
  'Зоны хранения контейнеров и грузов',
  'Контрольно-пропускной пункт',
]

export default function InfrastrukturaPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О терминале', url: '/terminal' }, { name: 'Инфраструктура', url: '/terminal/infrastruktura' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'О терминале', href: '/terminal' }, { label: 'Инфраструктура' }]} className="mb-4 text-white/50 [&_a]:text-white/60 [&_a:hover]:text-brand-accent" />
          <h1 className="text-white">Инфраструктура терминала</h1>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold">Площадка и условия</h2>
              <p className="mb-6 text-text-secondary leading-relaxed">
                Контейнерная площадка Терминала Приморский расположена в Новороссийске, в {company.distanceToPort}.
                Площадка рассчитана на вместимость {company.capacity} и оснащена необходимой инфраструктурой для приёма,
                хранения и выдачи контейнеров и грузов.
              </p>
              <ul className="space-y-2">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Точные характеристики инфраструктуры (покрытие площадки, освещение, охрана, видеонаблюдение) подтверждаются заказчиком перед публикацией. Уточняйте у менеджера.
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-bold">Фотографии площадки</h2>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="aspect-video rounded-lg bg-surface-gray-medium flex items-center justify-center text-xs text-text-muted">
                    Фото {n}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-text-muted">Реальные фотографии будут добавлены после предоставления заказчиком.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
