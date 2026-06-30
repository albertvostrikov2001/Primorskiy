import Link from 'next/link'
import { Forklift, Truck, Container, ArrowRight, Wrench } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'

const equipment = [
  {
    icon: Forklift,
    name: 'Вилочные погрузчики',
    scenarios: [
      'Работа с паллетированными грузами',
      'Загрузка и выгрузка крытых фургонов',
      'Перемещение груза по складской территории',
    ],
  },
  {
    icon: Container,
    name: 'Контейнеровозы',
    scenarios: [
      'Горизонтальное перемещение контейнеров',
      'Расстановка контейнеров на площадке',
      'Подача контейнеров под загрузку',
    ],
  },
  {
    icon: Wrench,
    name: 'Автокраны',
    scenarios: [
      'Подъём и перестановка тяжёлых контейнеров',
      'Работа с негабаритными грузами',
      'Операции при ограниченном пространстве',
    ],
  },
  {
    icon: Truck,
    name: 'Погрузчики со спредером',
    scenarios: [
      'Захват контейнеров без повреждений',
      'Штабелирование контейнеров в несколько ярусов',
      'Точное позиционирование при перетарке',
    ],
  },
]

export default function EquipmentSection() {
  return (
    <section className="section-py bg-surface-gray" aria-labelledby="equipment-heading">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            id="equipment-heading"
            tag="h2"
            title="Терминальная техника"
            subtitle="Собственный парк оборудования для выполнения полного цикла операций с контейнерами и грузами"
          />
          <Link
            href="/terminal/tehnika"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand-accent hover:underline"
          >
            Подробнее о технике
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {equipment.map((eq, i) => (
            <div key={i} className="card p-5">
              <div className="icon-circle mb-4">
                <eq.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-base font-semibold">{eq.name}</h3>
              <ul className="space-y-1.5">
                {eq.scenarios.map((s, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Image placeholder */}
        <div
          className="mt-8 overflow-hidden rounded-xl bg-brand-dark"
          style={{ aspectRatio: '16/5' }}
        >
          <div className="flex h-full w-full items-center justify-center text-white/20">
            {/* Replace with next/image once real photos are available */}
            <p className="text-sm font-medium">
              Фотографии техники — {' '}
              <Link href="/terminal/tehnika" className="text-brand-accent hover:underline">
                перейти в раздел «Техника»
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
