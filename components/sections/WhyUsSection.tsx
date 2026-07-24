'use client'

import { useEffect, useRef } from 'react'
import { MapPin, Container, Cog, Package, Users, Calculator } from 'lucide-react'
import { company } from '@/config/company'

const advantages = [
  {
    icon: MapPin,
    stat: '~10',
    unit: 'км до порта',
    title: 'Близость к морскому порту Новороссийска',
    description:
      'Расстояние до морского порта сокращает транспортные плечи и упрощает логистику для экспортных и импортных грузов. Контейнер с корабля оказывается на терминале в течение дня.',
  },
  {
    icon: Container,
    stat: '3900',
    unit: 'TEU',
    title: `Вместимость площадки — ${company.capacity}`,
    description:
      'Терминал принимает гружёные и порожние контейнеры в значительных объёмах. Это позволяет работать с партиями любого размера без ограничений по количеству.',
  },
  {
    icon: Cog,
    stat: '4+',
    unit: 'типа операций',
    title: 'Полный комплекс операций на одной площадке',
    description:
      'Хранение, перетарка, затарка, растарка и погрузо-разгрузочные работы выполняются на одной площадке. Груз не перемещается между подрядчиками — это экономит время и снижает риски.',
  },
  {
    icon: Package,
    stat: null,
    unit: 'техника',
    title: 'Терминальная техника для любых задач',
    description:
      'Вилочные погрузчики, ричстакер, контейнеровозы и погрузчики с боковым спредером — собственный парк техники для работы с контейнерами и генеральными грузами.',
  },
  {
    icon: Users,
    stat: '1',
    unit: 'менеджер',
    title: 'Единая точка коммуникации',
    description:
      'Один менеджер сопровождает задачу от первого обращения до выдачи груза. Никаких переключений между отделами и подрядчиками — всё решается напрямую.',
  },
  {
    icon: Calculator,
    stat: null,
    unit: 'расчёт',
    title: 'Индивидуальный расчёт под задачу',
    description:
      'Стоимость рассчитывается под конкретный запрос: тип и объём груза, сроки хранения, набор операций. Стандартных прайсов нет — только цена под вашу задачу.',
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
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .why-row.from-left  { transform: translateX(-40px); }
        .why-row.from-right { transform: translateX(40px); }
        .why-row.in-view    { opacity: 1; transform: translateX(0); }
        .why-row:nth-child(2) { transition-delay: 0.05s; }
        .why-row:nth-child(3) { transition-delay: 0.05s; }
        .why-row:nth-child(4) { transition-delay: 0.05s; }
        .why-row:nth-child(5) { transition-delay: 0.05s; }
        .why-row:nth-child(6) { transition-delay: 0.05s; }
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

        {/* Alternating rows */}
        <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-surface-border">
          {advantages.map((adv, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                ref={(el) => { rowRefs.current[i] = el }}
                className={`why-row flex flex-col sm:flex-row ${isEven ? 'from-left' : 'from-right sm:flex-row-reverse'}`}
              >
                {/* Dark visual block */}
                <div
                  className="flex shrink-0 flex-col items-center justify-center gap-2 p-8 sm:w-52"
                  style={{
                    background: isEven
                      ? 'linear-gradient(135deg,#0f1d3a 0%,#1a3a6e 100%)'
                      : 'linear-gradient(135deg,#162d56 0%,#0f1d3a 100%)',
                  }}
                >
                  <adv.icon className="h-7 w-7 text-brand-accent" aria-hidden="true" />
                  {adv.stat && (
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-none text-white">
                        {adv.stat}
                      </div>
                      <div className="mt-1 text-xs text-white/40">{adv.unit}</div>
                    </div>
                  )}
                </div>

                {/* Text block */}
                <div className="flex flex-1 flex-col justify-center bg-white p-8">
                  <h3 className="mb-2 text-lg font-bold text-text-primary">{adv.title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
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
