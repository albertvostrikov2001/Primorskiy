import Link from 'next/link'
import { ArrowRight, MapPin, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { company } from '@/config/company'

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[560px] items-center bg-brand-dark md:min-h-[640px]"
      aria-label="Главный баннер"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

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
