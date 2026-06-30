import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Кейсы | Терминал Приморский',
  description: 'Примеры решённых задач: хранение контейнеров, перетарка грузов, комплексные терминальные услуги в Новороссийске.',
  path: '/kejsy',
})

export default function KejsyPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Кейсы', url: '/kejsy' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Кейсы' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Кейсы</h1>
          <p className="mt-3 text-lg text-white/70">Примеры задач, которые решает терминал</p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          {/* Neutral state without fictional cases */}
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-surface-border bg-surface-gray p-10 text-center">
            <div className="mb-4 flex justify-center">
              <div className="icon-circle h-16 w-16">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-3 text-xl font-bold">Подберём решение под вашу задачу</h2>
            <p className="mb-6 text-text-secondary">
              Реальные кейсы будут добавлены после согласования с заказчиком. Расскажите о своей задаче — предложим оптимальное решение.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/raschet-stoimosti" className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover">
                Получить расчёт стоимости
              </Link>
              <Link href="/kontakty" className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-gray-medium">
                Обсудить задачу
              </Link>
            </div>
          </div>

          {/* Case template structure note */}
          <div className="mt-10 rounded-md border border-surface-border bg-surface-gray p-5 text-sm text-text-secondary">
            <p className="font-semibold text-text-primary mb-2">Структура шаблона кейса:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Название задачи, отрасль, тип груза</li>
              <li>Исходная ситуация и ограничения</li>
              <li>Решение и выполненные операции</li>
              <li>Техника, срок, результат</li>
              <li>Фотографии, связанные услуги, CTA</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
