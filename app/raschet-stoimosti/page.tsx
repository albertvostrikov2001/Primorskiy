import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import FullForm from '@/components/forms/FullForm'

export const metadata: Metadata = buildMetadata({
  title: 'Расчёт стоимости терминальных услуг | Терминал Приморский',
  description: 'Получите точный расчёт стоимости хранения, перетарки и других терминальных услуг. Заполните форму с параметрами груза.',
  path: '/raschet-stoimosti',
})

export default function RaschetStoimostiPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Расчёт стоимости', url: '/raschet-stoimosti' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Расчёт стоимости' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Расчёт стоимости</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            Заполните форму с параметрами груза или контейнера — менеджер рассчитает стоимость и ответит на вопросы
          </p>
        </div>
      </section>

      <section className="section-py bg-surface-gray">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <FullForm />
          </div>
        </div>
      </section>
    </>
  )
}
