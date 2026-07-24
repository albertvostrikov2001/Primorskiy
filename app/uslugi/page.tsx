import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Container, RefreshCw, Truck, Warehouse, AlertTriangle, Droplets, Scale, FileText, Tag, Hand, Layers } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = buildMetadata({
  title: 'Услуги контейнерного терминала в Новороссийске | Терминал Приморский',
  description: 'Полный перечень услуг Терминала Приморский: хранение контейнеров и грузов, перетарка, затарка, погрузка, международные перевозки, экспедирование, таможенное оформление.',
  path: '/uslugi',
})

const categories = [
  {
    label: 'Логистика и документы',
    color: 'teal' as const,
    services: [
      { icon: Truck,     title: 'Перевозки и автодоставка',              href: '/uslugi/konteynernye-perevozki' },
      { icon: FileText,  title: 'Экспедирование и таможенное оформление', href: '/uslugi/ekspedirovanie' },
    ],
  },
  {
    label: 'Хранение',
    color: 'amber' as const,
    services: [
      { icon: Container, title: 'Хранение контейнеров и грузов', href: '/uslugi/hranenie-konteynerov' },
      { icon: Warehouse, title: 'Складские услуги',               href: '/uslugi/skladskie-uslugi' },
    ],
  },
  {
    label: 'Обработка грузов',
    color: 'blue' as const,
    services: [
      { icon: RefreshCw, title: 'Перетарка, затарка и погрузо-разгрузочные работы', href: '/uslugi/peretarka-gruzov' },
      { icon: Scale,     title: 'Взвешивание груза и контейнеров',                  href: '/uslugi/vzveshivanie' },
      { icon: Tag,       title: 'Стикеровка и маркировка',                          href: '/uslugi/stikerovka-markirovka' },
      { icon: Hand,      title: 'Ручная и механизированная обработка',              href: '/uslugi/ruchnaya-obrabotka' },
      { icon: Layers,    title: 'Формирование грузовой единицы',                    href: '/uslugi/formirovanie-gruzovoy-edinicy' },
    ],
  },
  {
    label: 'Специальные грузы',
    color: 'orange' as const,
    services: [
      { icon: Droplets,      title: 'Наливные грузы и флексибаги', href: '/uslugi/nalivnye-gruzy' },
      { icon: AlertTriangle, title: 'Нестандартные грузы',          href: '/uslugi/nestandartnye-gruzy' },
    ],
  },
]

const badgeStyles = {
  amber:  'bg-amber-50  text-amber-800  border-amber-200',
  blue:   'bg-blue-50   text-blue-800   border-blue-200',
  teal:   'bg-teal-50   text-teal-800   border-teal-200',
  orange: 'bg-orange-50 text-orange-800 border-orange-200',
}

const dotStyles = {
  amber:  'bg-amber-400',
  blue:   'bg-blue-400',
  teal:   'bg-teal-400',
  orange: 'bg-orange-400',
}

export default function UslugiPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Услуги', url: '/uslugi' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Услуги' }]} className="mb-4 text-white" />
          <h1 className="text-white">Услуги контейнерного терминала</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            Полный спектр терминальных операций в Новороссийске: от хранения и перетарки до международных перевозок и таможенного оформления
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="flex flex-col gap-7">
            {categories.map((cat) => (
              <div key={cat.label}>
                {/* Category header */}
                <div className="mb-3 flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badgeStyles[cat.color]}`}>
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotStyles[cat.color]}`} aria-hidden="true" />
                    {cat.label}
                  </span>
                  <div className="h-px flex-1 bg-surface-border" />
                </div>

                {/* Cards — 3 columns */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group flex items-center gap-3 rounded-lg border border-surface-border bg-white px-4 py-3 transition-all hover:border-brand-accent/50 hover:bg-amber-50/50 hover:shadow-sm"
                    >
                      <div className="icon-circle shrink-0 transition-colors group-hover:bg-brand-accent group-hover:text-white">
                        <s.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span className="flex-1 text-sm font-medium leading-snug text-text-primary">
                        {s.title}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand-accent" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
