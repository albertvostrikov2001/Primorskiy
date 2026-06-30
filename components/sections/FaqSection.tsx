'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { cn } from '@/lib/utils'

export interface FaqItem {
  question: string
  answer: string
}

const homeFaqs: FaqItem[] = [
  {
    question: 'Какие контейнеры принимает терминал?',
    answer:
      'Терминал работает с 20-футовыми и 40-футовыми контейнерами стандартной высоты, а также 40-футовыми High Cube. Другие типоразмеры — по предварительному согласованию.',
  },
  {
    question: 'Можно ли разместить гружёный контейнер?',
    answer:
      'Да, терминал принимает как гружёные, так и порожние контейнеры для хранения. Условия размещения и стоимость рассчитываются индивидуально в зависимости от типа контейнера и срока хранения.',
  },
  {
    question: 'Возможна ли перетарка из контейнера в автомобиль?',
    answer:
      'Да, перетарка между контейнерами и автомобилями — одна из основных операций терминала. Можно организовать разгрузку из контейнера в фуру, а также обратный процесс — затарку груза в контейнер с автомобиля.',
  },
  {
    question: 'Как рассчитывается стоимость?',
    answer:
      'Стоимость формируется индивидуально: учитывается тип и объём груза, количество контейнеров, набор выполняемых операций и срок хранения. Для расчёта нужно заполнить форму или связаться с менеджером.',
  },
  {
    question: 'Какие данные нужны для расчёта?',
    answer:
      'Для точного расчёта нужны: тип контейнера или груза, объём или количество единиц, планируемый срок хранения, перечень необходимых операций (хранение, перетарка, затарка и т.д.), дата поступления.',
  },
  {
    question: 'Можно ли заказать комплекс услуг?',
    answer:
      'Да, терминал оказывает услуги комплексно: хранение, перетарка, погрузочно-разгрузочные работы и складские операции могут быть выполнены в рамках одной заявки.',
  },
  {
    question: 'Как организован доступ транспорта?',
    answer:
      'Доступ автотранспорта на территорию терминала организован через контрольно-пропускной пункт. Порядок въезда, необходимые документы и временные ограничения уточняются при согласовании заявки.',
  },
  {
    question: 'Какие документы нужны для приёма груза?',
    answer:
      'Перечень документов для приёма груза зависит от типа операции и характеристик груза. Менеджер предоставит точный список при оформлении заявки.',
  },
  {
    question: 'Как построить маршрут до терминала?',
    answer:
      'Актуальный адрес и координаты терминала уточняются у менеджера или на странице контактов. После подтверждения адреса заказчиком маршрут можно построить через Яндекс Карты или Google Maps.',
  },
]

interface FaqSectionProps {
  faqs?: FaqItem[]
  title?: string
  subtitle?: string
  light?: boolean
  className?: string
}

export default function FaqSection({
  faqs = homeFaqs,
  title = 'Часто задаваемые вопросы',
  subtitle,
  light = false,
  className,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      className={cn('section-py', light ? 'section-dark' : 'bg-white', className)}
      aria-labelledby="faq-heading"
    >
      <div className="container-site">
        <SectionTitle
          id="faq-heading"
          tag="h2"
          title={title}
          subtitle={subtitle}
          centered
          light={light}
          className="mb-10"
        />

        <div className="mx-auto max-w-3xl divide-y divide-surface-border" role="list">
          {faqs.map((faq, i) => (
            <div key={i} role="listitem">
              <button
                id={`faq-btn-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                className={cn(
                  'flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold transition-colors hover:text-brand-accent md:text-base',
                  light ? 'text-white' : 'text-text-primary',
                  open === i && 'text-brand-accent'
                )}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.question}
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-brand-accent transition-transform',
                    open === i && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              {open === i && (
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    'animate-fade-in pb-4 text-sm leading-relaxed',
                    light ? 'text-white/70' : 'text-text-secondary'
                  )}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
