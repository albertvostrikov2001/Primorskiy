import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    title: 'Хранение контейнеров и грузов',
    img: '/images/hero-terminal.jpg',
    href: '/uslugi/hranenie-konteynerov',
  },
  {
    title: 'Перетарка, затарка и погрузо-разгрузочные работы',
    img: '/images/cargo-repack.jpg',
    href: '/uslugi/peretarka-gruzov',
  },
  {
    title: 'Перевозки и автодоставка',
    img: '/images/trucking-transport.jpg',
    href: '/uslugi/konteynernye-perevozki',
  },
  {
    title: 'Наливные грузы и флексибаги',
    img: '/images/about-terminal.jpg',
    href: '/uslugi/nalivnye-gruzy',
  },
  {
    title: 'Экспедирование и таможенное оформление',
    img: '/images/customs-clearance.jpg',
    href: '/uslugi/ekspedirovanie',
  },
  {
    title: 'Складские услуги',
    img: '/images/storage-warehouse.jpg',
    href: '/uslugi/skladskie-uslugi',
  },
  {
    title: 'Стикеровка и маркировка',
    img: '/images/team-operations.jpg',
    href: '/uslugi/stikerovka-markirovka',
  },
  {
    title: 'Нестандартные грузы',
    img: '/images/equipment-forklift.jpg',
    href: '/uslugi/nestandartnye-gruzy',
  },
]

export default function ServicesSection() {
  return (
    <section aria-labelledby="services-heading">
      {/* Section header */}
      <div className="container-site py-14 md:py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
              Терминал Приморский
            </p>
            <h2 id="services-heading" className="text-3xl font-bold md:text-4xl">
              Услуги терминала
            </h2>
          </div>
          <Link
            href="/uslugi"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand-accent transition-opacity hover:opacity-70 sm:flex"
          >
            Все услуги
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Full-width grid */}
      <div className="grid grid-cols-2 gap-px bg-surface-border lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative block aspect-[4/3] overflow-hidden bg-brand-navy"
          >
            {/* Background image */}
            <Image
              src={s.img}
              alt={s.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
            />

            {/* Dark overlay — lightens on hover */}
            <div className="absolute inset-0 bg-brand-navy/68 transition-colors duration-500 group-hover:bg-brand-navy/45" />

            {/* Card content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
              {/* Arrow — top right */}
              <div className="flex justify-end">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent">
                  <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
                </div>
              </div>

              {/* Title + accent line — bottom left */}
              <div>
                <h3 className="text-sm font-bold uppercase leading-snug tracking-widest text-white drop-shadow-sm md:text-[0.8rem]">
                  {s.title}
                </h3>
                {/* Gold underline animates in on hover */}
                <div className="mt-2.5 h-[2px] w-0 rounded-full bg-brand-accent transition-[width] duration-500 ease-out group-hover:w-10" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile "all services" link */}
      <div className="container-site py-5 sm:hidden">
        <Link
          href="/uslugi"
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-accent"
        >
          Все услуги
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
