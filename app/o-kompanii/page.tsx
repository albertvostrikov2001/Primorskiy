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

const rekvizity = [
  { label: 'Полное наименование', value: 'Общество с ограниченной ответственностью «Терминал «Приморский»' },
  { label: 'Краткое наименование', value: company.legalName },
  { label: 'ИНН', value: company.inn },
  { label: 'КПП', value: company.kpp },
  { label: 'ОГРН', value: company.ogrn },
  { label: 'Юридический адрес', value: company.legalAddress },
  { label: 'Фактический адрес', value: company.address },
  { label: 'Генеральный директор', value: company.director },
  { label: 'Банк', value: company.bank },
  { label: 'Расчётный счёт', value: company.rs },
  { label: 'Корр. счёт', value: company.ks },
  { label: 'БИК', value: company.bik },
]

export default function OKompaniiPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О компании', url: '/o-kompanii' }]

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
          <Breadcrumbs items={[{ label: 'О компании' }]} className="mb-4 text-white" />
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
              перетарке, затарке и растарке, погрузочно-разгрузочных операциях, контейнерных
              и международных перевозках.
            </p>
            <p>
              Площадка вместимостью {company.capacity} оснащена терминальной техникой и позволяет
              выполнять полный комплекс операций с контейнерами и грузами на одной территории.
              Принимаем грузы на хранение в том числе с температурным режимом.
            </p>

            <h2>Направления деятельности</h2>
            <ul>
              <li>Хранение контейнеров (гружёных и порожних)</li>
              <li>Хранение грузов различных типов, в том числе с температурным режимом</li>
              <li>Перетарка и перегрузка</li>
              <li>Затарка и растарка контейнеров</li>
              <li>Погрузочно-разгрузочные работы</li>
              <li>Приём наливного груза с автоцистерн, оборудование контейнеров флексибагами</li>
              <li>Взвешивание груза и контейнеров</li>
              <li>Стикеровка, маркировка груза, сканирование QR-кода</li>
              <li>Ручная и механизированная обработка груза</li>
              <li>Формирование грузовой единицы с предоставлением поддона и запаллетирование</li>
              <li>Контейнерные перевозки, международные перевозки и автодоставка</li>
              <li>Экспедирование груза и таможенное оформление</li>
              <li>Складские услуги</li>
            </ul>
          </div>

          {/* Реквизиты */}
          <div className="mt-10 rounded-lg border border-surface-border bg-surface-gray p-6">
            <h2 className="mb-5 text-lg font-bold">Реквизиты</h2>
            <dl className="divide-y divide-surface-border">
              {rekvizity.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-2 gap-4 py-2.5 sm:grid-cols-3">
                  <dt className="text-sm font-medium text-text-secondary">{label}</dt>
                  <dd className="col-span-1 text-sm text-text-primary sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
