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

const services = [
  { icon: Container, title: 'Хранение контейнеров и грузов', description: 'Размещение гружёных и порожних контейнеров (до 3900 TEU), хранение паллетированных, тарно-штучных и генеральных грузов, в том числе с температурным режимом.', href: '/uslugi/hranenie-konteynerov' },
  { icon: RefreshCw, title: 'Перетарка, затарка и погрузо-разгрузочные работы', description: 'Перегрузка грузов между контейнерами и автомобилями, загрузка и выгрузка контейнеров, погрузо-разгрузочные работы с применением вилочных погрузчиков и ричстакера.', href: '/uslugi/peretarka-gruzov' },
  { icon: Truck, title: 'Перевозки и автодоставка', description: 'Доставка контейнеров из порта на терминал и до склада получателя, международные автоперевозки и автодоставка грузов по России собственным автопарком.', href: '/uslugi/konteynernye-perevozki' },
  { icon: Droplets, title: 'Наливные грузы и флексибаги', description: 'Приём наливного груза с автоцистерн, оборудование контейнеров флексибагами.', href: '/uslugi/nalivnye-gruzy' },
  { icon: Scale, title: 'Взвешивание груза и контейнеров', description: 'Взвешивание груза и контейнеров с выдачей документов.', href: '/uslugi/vzveshivanie' },
  { icon: Tag, title: 'Стикеровка и маркировка', description: 'Стикеровка, маркировка груза, сканирование QR-кода.', href: '/uslugi/stikerovka-markirovka' },
  { icon: Hand, title: 'Ручная и механизированная обработка', description: 'Ручная обработка груза и механизированная с ручной доработкой.', href: '/uslugi/ruchnaya-obrabotka' },
  { icon: Layers, title: 'Формирование грузовой единицы', description: 'Формирование грузовой единицы с предоставлением поддона и запаллетирование.', href: '/uslugi/formirovanie-gruzovoy-edinicy' },
  { icon: FileText, title: 'Экспедирование и таможенное оформление', description: 'Транспортно-экспедиционные услуги и таможенное оформление грузов.', href: '/uslugi/ekspedirovanie' },
  { icon: Warehouse, title: 'Складские услуги', description: 'Сортировка, паллетирование, маркировка, переупаковка грузов.', href: '/uslugi/skladskie-uslugi' },
  { icon: AlertTriangle, title: 'Нестандартные грузы', description: 'Обработка тяжеловесных и негабаритных грузов. Только по согласованию.', href: '/uslugi/nestandartnye-gruzy' },
]

export default function UslugiPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Услуги', url: '/uslugi' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs
            items={[{ label: 'Услуги' }]}
            className="mb-4 text-white"
          />
          <h1 className="text-white">Услуги контейнерного терминала</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            Полный спектр терминальных операций в Новороссийске: от хранения и перетарки до международных перевозок и таможенного оформления
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="card group flex flex-col p-5 transition-all hover:-translate-y-1"
              >
                <div className="icon-circle mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mb-2 text-base font-semibold">{s.title}</h2>
                <p className="mb-3 flex-1 text-sm text-text-secondary">{s.description}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-brand-accent">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
