import type { Metadata } from 'next'
import { company } from '@/config/company'
import { organizationJsonLd, localBusinessJsonLd, faqJsonLd } from '@/lib/seo/jsonld'
import HeroSection from '@/components/sections/HeroSection'
import ScenariosSection from '@/components/sections/ScenariosSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import EquipmentSection from '@/components/sections/EquipmentSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import QuickForm from '@/components/forms/QuickForm'

export const metadata: Metadata = {
  title: `Контейнерный терминал в Новороссийске — хранение и перетарка грузов | ${company.name}`,
  description:
    'Терминал Приморский: хранение контейнеров и грузов, перетарка, обработка и перевозка рядом с портом Новороссийска. Отправьте параметры и получите расчёт.',
  alternates: {
    canonical: company.siteUrl,
  },
  openGraph: {
    title: `Контейнерный терминал в Новороссийске | ${company.name}`,
    description:
      'Хранение контейнеров, перетарка, погрузочно-разгрузочные работы рядом с портом Новороссийска.',
    url: company.siteUrl,
    siteName: company.name,
    locale: 'ru_RU',
    type: 'website',
  },
}

const homeFaqs = [
  {
    question: 'Какие контейнеры принимает терминал?',
    answer:
      'Терминал работает с 20-футовыми и 40-футовыми контейнерами стандартной высоты, а также 40-футовыми High Cube. Другие типоразмеры — по предварительному согласованию.',
  },
  {
    question: 'Возможна ли перетарка из контейнера в автомобиль?',
    answer:
      'Да, перетарка между контейнерами и автомобилями — одна из основных операций терминала. Можно организовать разгрузку из контейнера в фуру, а также обратный процесс — затарку груза в контейнер.',
  },
  {
    question: 'Как рассчитывается стоимость?',
    answer:
      'Стоимость формируется индивидуально: учитывается тип и объём груза, количество контейнеров, набор выполняемых операций и срок хранения. Для расчёта нужно заполнить форму или связаться с менеджером.',
  },
  {
    question: 'Можно ли заказать комплекс услуг?',
    answer:
      'Да, терминал оказывает услуги комплексно: хранение, перетарка, погрузочно-разгрузочные работы и складские операции могут быть выполнены в рамках одной заявки.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      {company.address && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      <HeroSection />
      <ScenariosSection />
      <ServicesSection />
      <WhyUsSection />
      <HowItWorksSection />
      <EquipmentSection />

      {/* Quick form */}
      <section className="section-py bg-surface-gray" aria-labelledby="quick-form-heading">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <h2
              id="quick-form-heading"
              className="mb-2 text-center text-2xl font-bold md:text-3xl"
            >
              Оставить заявку
            </h2>
            <p className="mb-8 text-center text-text-secondary">
              Укажите услугу и контактные данные — менеджер уточнит детали и рассчитает стоимость
            </p>
            <QuickForm />
          </div>
        </div>
      </section>

      <FaqSection faqs={homeFaqs} />
      <CtaSection />
    </>
  )
}
