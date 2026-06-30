import Link from 'next/link'
import {
  Container,
  Package,
  RefreshCw,
  PackageOpen,
  Forklift,
  Truck,
  Warehouse,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

const services = [
  {
    icon: Container,
    title: 'Хранение контейнеров',
    description:
      'Размещение гружёных и порожних 20- и 40-футовых контейнеров на открытой терминальной площадке.',
    benefit: 'Безопасное размещение рядом с портом Новороссийска.',
    href: '/uslugi/hranenie-konteynerov',
  },
  {
    icon: Package,
    title: 'Хранение грузов',
    description:
      'Временное хранение паллетированных и тарно-штучных грузов, промышленного оборудования и строительных материалов.',
    benefit: 'Контролируемая площадка, удобный доступ для автотранспорта.',
    href: '/uslugi/hranenie-gruzov',
  },
  {
    icon: RefreshCw,
    title: 'Перетарка грузов',
    description:
      'Перегрузка товаров из одного вида тары в другой: из контейнера в автомобиль, с поддонов в контейнер и другие варианты.',
    benefit: 'Оптимизация логистики без лишних операций.',
    href: '/uslugi/peretarka-gruzov',
  },
  {
    icon: PackageOpen,
    title: 'Затарка и растарка',
    description:
      'Загрузка груза в контейнер (затарка) и выгрузка из контейнера (растарка) с применением терминальной техники.',
    benefit: 'Полный цикл контейнерной обработки на одной площадке.',
    href: '/uslugi/zatarka-i-rastarka',
  },
  {
    icon: Forklift,
    title: 'Погрузочно-разгрузочные работы',
    description:
      'Погрузка и выгрузка грузов с использованием вилочных погрузчиков, контейнеровозов и другой терминальной техники.',
    benefit: 'Оперативное обслуживание транспорта на площадке.',
    href: '/uslugi/pogruzochno-razgruzochnye-raboty',
  },
  {
    icon: Truck,
    title: 'Контейнерные перевозки',
    description:
      'Организация доставки контейнеров в пределах региона. Перемещение между терминалом, портом и складом получателя.',
    benefit: 'Замкнутый логистический цикл без привлечения сторонних подрядчиков.',
    href: '/uslugi/konteynernye-perevozki',
  },
  {
    icon: Warehouse,
    title: 'Складские услуги',
    description:
      'Сортировка, пересчёт, маркировка, паллетирование грузов. Комплексное складское обслуживание.',
    benefit: 'Приведение груза к необходимому состоянию перед отправкой.',
    href: '/uslugi/skladskie-uslugi',
  },
  {
    icon: AlertTriangle,
    title: 'Нестандартные грузы',
    description:
      'Обработка тяжеловесных и негабаритных грузов по предварительному согласованию. Индивидуальный подбор техники.',
    benefit: 'Решение нестандартных задач с учётом конкретных ограничений.',
    href: '/uslugi/nestandartnye-gruzy',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-py bg-surface-gray" aria-labelledby="services-heading">
      <div className="container-site">
        <SectionTitle
          id="services-heading"
          tag="h2"
          title="Услуги терминала"
          subtitle="Полный спектр терминальных операций на одной площадке рядом с портом Новороссийска"
          centered
          className="mb-10"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="card group flex flex-col p-5 transition-all hover:-translate-y-1"
            >
              <div className="icon-circle mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-text-primary">{service.title}</h3>
              <p className="mb-3 flex-1 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-brand-accent">
                Подробнее
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
