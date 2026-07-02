import { MapPin, Container, Cog, Users, Calculator, Package } from 'lucide-react'
import { company } from '@/config/company'
import { SectionTitle } from '@/components/ui/SectionTitle'

const advantages = [
  {
    icon: MapPin,
    title: `${company.distanceToPort}`,
    description:
      'Близость к порту сокращает транспортные плечи и упрощает логистику для экспортных и импортных грузов.',
  },
  {
    icon: Container,
    title: `Вместимость ${company.capacity}`,
    description:
      'Площадка вмещает значительный парк контейнеров, что позволяет работать с партиями любого объёма.',
  },
  {
    icon: Cog,
    title: 'Полный комплекс операций',
    description:
      'Хранение, перетарка, затарка, растарка, погрузка и разгрузка выполняются на одной площадке без лишних перемещений груза.',
  },
  {
    icon: Package,
    title: 'Терминальная техника',
    description:
      'Вилочные погрузчики, контейнеровозы, погрузчики с боковым спредером и другая техника для работы с контейнерами и грузами.',
  },
  {
    icon: Users,
    title: 'Единая точка коммуникации',
    description:
      'Один менеджер сопровождает задачу от согласования до выдачи груза. Без переключений между подрядчиками.',
  },
  {
    icon: Calculator,
    title: 'Индивидуальный расчёт',
    description:
      'Стоимость рассчитывается под конкретную задачу: тип и объём груза, сроки хранения, набор операций.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="section-py bg-white" aria-labelledby="why-us-heading">
      <div className="container-site">
        <SectionTitle
          id="why-us-heading"
          tag="h2"
          title="Почему выбирают Терминал Приморский"
          subtitle="Конкретные особенности, которые влияют на выбор площадки для хранения и обработки грузов"
          centered
          className="mb-10"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10 text-brand-dark">
                <adv.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-1 text-base font-semibold text-text-primary">{adv.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{adv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
