import Link from 'next/link'
import { ClipboardList, MessageSquare, Calculator, Truck, Package, PackageCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Клиент отправляет параметры',
    description: 'Заполняете форму на сайте или звоните менеджеру. Указываете тип груза, объём, необходимые операции.',
    featured: true,
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Менеджер уточняет задачу',
    description: 'Уточняем детали: тип контейнера, срок хранения, способ доставки, конкретные операции.',
    featured: false,
  },
  {
    number: '03',
    icon: Calculator,
    title: 'Расчёт и согласование',
    description: 'Рассчитываем стоимость под вашу задачу и согласовываем состав операций и сроки.',
    featured: false,
  },
  {
    number: '04',
    icon: Truck,
    title: 'Груз поступает на терминал',
    description: 'Автомобиль или контейнер прибывает на площадку. Проводится приём, оформляются документы.',
    featured: false,
  },
  {
    number: '05',
    icon: Package,
    title: 'Хранение и обработка',
    description: 'Выполняются согласованные операции: хранение, перетарка, затарка, погрузка-разгрузка.',
    featured: false,
  },
  {
    number: '06',
    icon: PackageCheck,
    title: 'Передача груза',
    description: 'Груз или контейнер передаётся для отправки или выдаётся получателю с нужными документами.',
    featured: false,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section-py bg-slate-50" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
            Этапы работы
          </p>
          <h2 id="how-it-works-heading" className="text-3xl font-bold text-text-primary md:text-4xl">
            Как проходит работа
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon

            if (step.featured) {
              return (
                <div
                  key={i}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 lg:p-8"
                  style={{ background: 'linear-gradient(135deg, #0f1d3a 0%, #1a3a6e 100%)' }}
                >
                  {/* dot-grid pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                      backgroundSize: '22px 22px',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <span className="mb-6 block text-2xl font-bold text-white/20" aria-hidden="true">
                      {step.number}
                    </span>
                    {/* Icon with hover animation */}
                    <div className="mb-6 inline-flex rounded-xl bg-white/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-accent/25">
                      <Icon
                        className="h-7 w-7 text-brand-accent transition-transform duration-300 group-hover:rotate-6"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                    <p className="mb-7 text-sm leading-relaxed text-white/60">{step.description}</p>
                    <Link
                      href="/raschet-stoimosti"
                      className="inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-navy transition-all duration-200 hover:bg-brand-accent hover:text-white"
                    >
                      Получить расчёт
                    </Link>
                  </div>
                </div>
              )
            }

            return (
              <div
                key={i}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
              >
                <div className="mb-auto">
                  <span className="mb-6 block text-2xl font-bold text-slate-200" aria-hidden="true">
                    {step.number}
                  </span>
                  {/* Icon with hover animation */}
                  <div className="mb-6 inline-flex rounded-xl bg-slate-100 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-accent-light">
                    <Icon
                      className="h-7 w-7 text-slate-400 transition-all duration-300 group-hover:rotate-6 group-hover:text-brand-accent"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
