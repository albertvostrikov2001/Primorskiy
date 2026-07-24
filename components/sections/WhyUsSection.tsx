'use client'

import { useEffect, useRef } from 'react'
import { MapPin, Container, Cog, Package, Calculator } from 'lucide-react'
import { company } from '@/config/company'

const advantages = [
  {
    icon: MapPin,
    stat: '~10 км',
    unit: 'до порта',
    title: 'Близость к морскому порту Новороссийска',
    description: 'Контейнер с корабля оказывается на терминале в течение дня.',
  },
  {
    icon: Container,
    stat: '3900 TEU',
    unit: 'вместимость',
    title: `Вместимость площадки — ${company.capacity}`,
    description: 'Работаем с партиями любого объёма без ограничений по количеству.',
  },
  {
    icon: Cog,
    stat: '4+',
    unit: 'типа операций',
    title: 'Полный комплекс операций на одной площадке',
    description: 'Хранение, перетарка и ПРР — без перемещения между подрядчиками.',
  },
  {
    icon: Package,
    stat: null,
    unit: 'техника',
    title: 'Терминальная техника для любых задач',
    description: 'Погрузчики, ричстакер, контейнеровозы — собственный парк.',
  },
  {
    icon: Calculator,
    stat: null,
    unit: 'расчёт',
    title: 'Индивидуальный расчёт под задачу',
    description: 'Цена формируется под тип груза, объём и набор операций.',
  },
]

export default function WhyUsSection() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    rowRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view')
            obs.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="section-py bg-white" aria-labelledby="why-us-heading">
      <style>{`
        .why-row {
          opacity: 0;
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .why-row.from-left  { transform: translateX(-32px); }
        .why-row.from-right { transform: translateX(32px); }
        .why-row.in-view    { opacity: 1; transform: translateX(0); }
        .why-row:nth-child(2) { transition-delay: 0.06s; }
        .why-row:nth-child(3) { transition-delay: 0.12s; }
        .why-row:nth-child(4) { transition-delay: 0.18s; }
        .why-row:nth-child(5) { transition-delay: 0.24s; }
        @media (prefers-reduced-motion: reduce) {
          .why-row { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="container-site">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
            Терминал Приморский
          </p>
          <h2
            id="why-us-heading"
            className="text-3xl font-bold text-text-primary md:text-4xl"
          >
            Почему выбирают нас
          </h2>
        </div>

        {/* Compact alternating rows */}
        <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-surface-border bg-surface-border">
          {advantages.map((adv, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                ref={(el) => { rowRefs.current[i] = el }}
                className={`why-row flex min-h-[72px] flex-col sm:flex-row ${isEven ? 'from-left' : 'from-right sm:flex-row-reverse'}`}
              >
                {/* Dark visual block */}
                <div
                  className="flex shrink-0 flex-row items-center justify-center gap-3 px-5 py-4 sm:w-[100px] sm:flex-col sm:gap-1.5 sm:px-0"
                  style={{
                    background: isEven
                      ? 'linear-gradient(135deg,#0f1d3a 0%,#1a3a6e 100%)'
                      : 'linear-gradient(135deg,#162d56 0%,#0f1d3a 100%)',
                  }}
                >
                  <adv.icon className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
                  {adv.stat && (
                    <div className="text-center">
                      <div className="text-sm font-bold leading-none text-white">{adv.stat}</div>
                      <div className="mt-0.5 text-[10px] leading-tight text-white/40">{adv.unit}</div>
                    </div>
                  )}
                  {!adv.stat && (
                    <div className="text-[10px] leading-tight text-white/40">{adv.unit}</div>
                  )}
                </div>

                {/* Text block */}
                <div className="flex flex-1 flex-col justify-center bg-white px-6 py-4">
                  <h3 className="mb-0.5 text-sm font-bold leading-snug text-text-primary">
                    {adv.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {adv.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
