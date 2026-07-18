import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { company } from '@/config/company'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo/jsonld'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'О компании | Терминал Приморский',
  description: 'О компании Терминал Приморский: контейнерный терминал в Новороссийске, направления деятельности, реквизиты.',
  path: '/o-kompanii',
})

export default function OKompaniiPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О компании', url: '/o-kompanii' }]
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />

      <section className="relative overflow-hidden bg-brand-navy py-16">
        <Image
          src="/images/team-operations.jpg"
          alt=""
          fill
          quality={75}
          className="object-cover object-center opacity-30"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="container-site relative z-10">
          <Breadcrumbs items={[{ label: 'О компании' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">О компании</h1>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site max-w-3xl">
          <div className="prose prose-gray max-w-none">
            <h2>Терминал Приморский</h2>
            <p>
              Терминал Приморский — контейнерный терминал, расположенный в Новороссийске,{' '}
              {company.distanceToPort}. Специализируемся на хранении контейнеров и грузов,
              перетарке, затарке и растарке, погрузочно-разгрузочных операциях и контейнерных
              перевозках.
            </p>
            <p>
              Площадка вместимостью {company.capacity} оснащена терминальной техникой и позволяет
              выполнять полный комплекс операций с контейнерами и грузами на одной территории.
            </p>

            <h2>Направления деятельности</h2>
            <ul>
              <li>Хранение контейнеров (гружёных и порожних)</li>
              <li>Хранение грузов различных типов</li>
              <li>Перетарка и перегрузка</li>
              <li>Затарка и растарка контейнеров</li>
              <li>Погрузочно-разгрузочные работы</li>
              <li>Контейнерные перевозки</li>
              <li>Складские услуги</li>
            </ul>
          </div>

          {isDev && (
            <div className="mt-8 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              [DEV] Следующие данные необходимо подтвердить у заказчика перед публикацией:
              юридическое наименование, год основания, реквизиты, история компании, лицензии и сертификаты, фотографии команды.
              Заполните <code className="font-mono">config/company.ts</code> и <code className="font-mono">CONTENT_TODO.md</code>.
            </div>
          )}

          {/* Rekvizity placeholder */}
          <div className="mt-10 rounded-lg border border-surface-border bg-surface-gray p-6">
            <h2 className="mb-4 text-lg font-bold">Реквизиты</h2>
            <div className="space-y-2 text-sm text-text-secondary">
              <p><span className="font-medium text-text-primary">Юридическое наименование:</span>{' '}
                {company.legalName || <span className="text-amber-600">Не указано — подтвердить у заказчика</span>}
              </p>
              <p><span className="font-medium text-text-primary">Адрес:</span>{' '}
                {company.address || <span className="text-amber-600">Не указано — подтвердить у заказчика</span>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
