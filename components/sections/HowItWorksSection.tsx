import { SectionTitle } from '@/components/ui/SectionTitle'

const steps = [
  {
    number: '01',
    title: 'Клиент отправляет параметры',
    description:
      'Заполняете форму на сайте или звоните менеджеру. Указываете тип груза, объём, необходимые операции.',
  },
  {
    number: '02',
    title: 'Менеджер уточняет задачу',
    description:
      'Мы уточняем детали: тип контейнера, срок хранения, способ доставки, конкретные операции.',
  },
  {
    number: '03',
    title: 'Расчёт и согласование',
    description:
      'Рассчитываем стоимость под вашу задачу и согласовываем состав операций и сроки.',
  },
  {
    number: '04',
    title: 'Груз поступает на терминал',
    description:
      'Автомобиль или контейнер прибывает на площадку. Проводится приём, оформляются документы.',
  },
  {
    number: '05',
    title: 'Хранение и обработка',
    description:
      'Выполняются согласованные операции: хранение, перетарка, затарка, погрузка-разгрузка.',
  },
  {
    number: '06',
    title: 'Передача груза',
    description:
      'Груз или контейнер передаётся для дальнейшей отправки или выдаётся получателю с нужными документами.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="section-py section-dark" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <SectionTitle
          id="how-it-works-heading"
          tag="h2"
          title="Как проходит работа"
          subtitle="От заявки до передачи груза — понятный процесс без неожиданных шагов"
          centered
          light
          className="mb-10"
        />

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span
                className="mb-3 block text-3xl font-bold text-brand-accent/30"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
