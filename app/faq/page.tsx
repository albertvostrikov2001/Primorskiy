import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/jsonld'
import FaqSection, { type FaqItem } from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Часто задаваемые вопросы | Терминал Приморский',
  description: 'Ответы на часто задаваемые вопросы о терминальных услугах: хранение контейнеров, перетарка, погрузка, документы, стоимость.',
  path: '/faq',
})

const faqs: FaqItem[] = [
  { question: 'Какие контейнеры принимает терминал?', answer: 'Терминал принимает 20DC, 40DC, 40HC. Другие типоразмеры рассматриваются по предварительному согласованию.' },
  { question: 'Можно ли разместить гружёный контейнер?', answer: 'Да, терминал принимает как гружёные, так и порожние контейнеры для хранения.' },
  { question: 'Возможна ли перетарка из контейнера в автомобиль?', answer: 'Да, это одна из основных операций терминала. Груз выгружается из контейнера и загружается на автомобиль или наоборот.' },
  { question: 'Как рассчитывается стоимость?', answer: 'Стоимость рассчитывается индивидуально: тип и объём груза, набор операций, срок хранения. Для расчёта отправьте параметры через форму.' },
  { question: 'Какие данные нужны для расчёта?', answer: 'Тип контейнера или груза, объём или количество единиц, планируемый срок хранения, перечень операций, дата поступления.' },
  { question: 'Можно ли заказать комплекс услуг?', answer: 'Да, хранение, перетарка, погрузочно-разгрузочные работы и складские операции могут быть выполнены в рамках одной заявки.' },
  { question: 'Как организован доступ транспорта?', answer: 'Въезд через КПП. Порядок въезда, необходимые документы уточняются при согласовании заявки.' },
  { question: 'Какие документы нужны для приёма груза?', answer: 'Перечень зависит от типа операции. Менеджер предоставит точный список при оформлении заявки.' },
  { question: 'Работаете ли с опасными грузами?', answer: 'Работа с опасными грузами не подтверждена и не предлагается на сайте. Уточняйте у менеджера в индивидуальном порядке.' },
  { question: 'Есть ли рефрижераторное хранение?', answer: 'Наличие рефрижераторного хранения не подтверждено. Уточняйте у менеджера при согласовании задачи.' },
  { question: 'Как построить маршрут до терминала?', answer: 'Актуальный адрес уточняется у менеджера или на странице контактов. После подтверждения адреса — маршрут через Яндекс или Google Maps.' },
  { question: 'Можно ли посмотреть терминал перед подписанием договора?', answer: 'Возможность посещения терминала уточняется при согласовании. Обратитесь к менеджеру.' },
]

export default function FaqPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'FAQ', url: '/faq' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'FAQ' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Часто задаваемые вопросы</h1>
          <p className="mt-3 text-lg text-white/70">Ответы на популярные вопросы о работе терминала и услугах</p>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Вопросы и ответы" className="section-py" />
      <CtaSection />
    </>
  )
}
