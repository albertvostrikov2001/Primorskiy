import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Container, MapPin, Cog } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { company } from '@/config/company'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'О терминале | Терминал Приморский — Новороссийск',
  description: `Контейнерный терминал в Новороссийске. Площадка вместимостью ${company.capacity}, около 10 км от порта. Инфраструктура, техника, условия работы.`,
  path: '/terminal',
})

const sections = [
  { icon: Container, title: 'Инфраструктура', description: 'Открытая площадка, подъездные пути, зоны хранения', href: '/terminal/infrastruktura' },
  { icon: Cog, title: 'Техника', description: 'Вилочные погрузчики, контейнеровозы, автокраны, спредеры', href: '/terminal/tehnika' },
]

export default function TerminalPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'О терминале', url: '/terminal' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'О терминале' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">О терминале</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">
            Терминал Приморский — контейнерная площадка в Новороссийске, расположенная вблизи морского порта
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          {/* Key facts */}
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Container, label: 'Вместимость', value: company.capacity },
              { icon: MapPin, label: 'Расположение', value: company.distanceToPort },
              { icon: Cog, label: 'Техника', value: 'Погрузчики, контейнеровозы, краны' },
            ].map((fact, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="icon-circle">
                    <fact.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{fact.label}</p>
                <p className="mt-1 text-lg font-bold text-text-primary">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none mb-10">
            <h2>Терминальная площадка</h2>
            <p>Терминал Приморский — специализированная площадка для работы с контейнерами и грузами, расположенная вблизи порта Новороссийска. Площадка рассчитана на вместимость до 3900 TEU и оснащена необходимой техникой для выполнения полного спектра терминальных операций.</p>
            <p>Близость к морскому порту обеспечивает короткое транспортное плечо при доставке контейнеров из порта на терминал и обратно, что делает площадку удобным логистическим узлом для импортных и экспортных грузов.</p>
            <h2>Направления работы</h2>
            <p>На площадке терминала выполняется хранение контейнеров и грузов, перетарка, затарка и растарка, погрузочно-разгрузочные операции, а также организуются контейнерные перевозки по региону. Комплекс услуг позволяет решать логистические задачи без привлечения нескольких подрядчиков.</p>
          </div>

          {/* Sub-sections navigation */}
          <div className="grid gap-5 sm:grid-cols-2">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="card group flex items-center gap-4 p-6 hover:-translate-y-0.5 transition-all">
                <div className="icon-circle shrink-0 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold">{s.title}</h2>
                  <p className="text-sm text-text-secondary">{s.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
