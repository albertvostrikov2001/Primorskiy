import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { company } from '@/config/company'

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden bg-brand-navy md:min-h-[680px] lg:min-h-[720px]"
      aria-label="Главный баннер"
    >
      {/* Background image */}
      <Image
        src="/images/hero-terminal.jpg"
        alt="Контейнерный терминал Приморский в Новороссийске"
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Deep indigo gradient overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 indigo-pattern opacity-30" aria-hidden="true" />

      {/* Accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-brand-accent" aria-hidden="true" />

      <div className="container-site relative z-10 py-16 md:py-20">
        <div className="max-w-3xl">
          {/* Geo badge */}
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80">
            <MapPin className="h-4 w-4 text-brand-accent" aria-hidden="true" />
            Новороссийск · {company.distanceToPort}
          </div>

          <h1 className="mb-5 text-white">
            Контейнерный терминал и складские услуги в Новороссийске
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Размещаем гружёные и порожние контейнеры, выполняем хранение, перетарку и
            погрузочно-разгрузочные операции на терминальной площадке рядом с портом Новороссийска.
          </p>

          {/* Stats row */}
          <div className="mb-8 flex flex-wrap gap-4">
            {[
              { icon: Package, text: `Вместимость ${company.capacity}` },
              { icon: MapPin, text: company.distanceToPort },
              { icon: ArrowRight, text: 'Комплекс операций на одной площадке' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80"
              >
                <stat.icon className="h-4 w-4 text-brand-accent shrink-0" aria-hidden="true" />
                {stat.text}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href="/raschet-stoimosti">
              <Button size="lg" className="shadow-cta">
                Получить расчёт стоимости
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/kontakty">
              <Button variant="ghost-light" size="lg">
                Обсудить задачу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
