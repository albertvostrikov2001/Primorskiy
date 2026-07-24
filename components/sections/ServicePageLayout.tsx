import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionTitle } from '@/components/ui/SectionTitle'
import FaqSection, { type FaqItem } from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import QuickForm from '@/components/forms/QuickForm'
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from '@/lib/seo/jsonld'

interface RelatedService {
  title: string
  href: string
}

interface ServiceStep {
  title: string
  description: string
}

export interface ServicePhoto {
  src: string
  alt: string
}

export interface ServicePageProps {
  title: string
  h1: string
  description: string
  fullDescription: string
  suitableFor: string[]
  cargoTypes: string[]
  operations: string[]
  advantages: string[]
  steps: ServiceStep[]
  faqs: FaqItem[]
  relatedServices: RelatedService[]
  serviceValue: string
  path: string
  disclaimer?: string
  images?: ServicePhoto[]
}

export default function ServicePageLayout({
  h1,
  description,
  fullDescription,
  suitableFor,
  cargoTypes,
  operations,
  advantages,
  steps,
  faqs,
  relatedServices,
  serviceValue,
  path,
  disclaimer,
  images,
}: ServicePageProps) {
  const breadcrumbs = [
    { name: 'Услуги', url: '/uslugi' },
    { name: h1, url: path },
  ]

  const faqData = faqJsonLd(faqs)
  const serviceData = serviceJsonLd({ name: h1, description, url: path })
  const breadcrumbData = breadcrumbJsonLd([{ name: 'Главная', url: '/' }, ...breadcrumbs])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      )}

      {/* Hero */}
      <section className="section-indigo py-12 md:py-16" aria-labelledby="service-h1">
        <div className="container-site">
          <Breadcrumbs
            items={[{ label: 'Услуги', href: '/uslugi' }, { label: h1 }]}
            className="mb-4 text-white"
          />
          <h1 id="service-h1" className="mb-4 max-w-3xl text-white">
            {h1}
          </h1>
          <p className="max-w-2xl text-lg text-white/70">{description}</p>
          {disclaimer && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
              ⚠️ {disclaimer}
            </div>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              {/* Full description */}
              <div>
                <SectionTitle tag="h2" title="Об услуге" className="mb-4" />
                <p className="leading-relaxed text-text-secondary">{fullDescription}</p>
              </div>

              {/* Suitable for */}
              <div>
                <SectionTitle tag="h2" title="Для каких задач подходит" className="mb-4" />
                <ul className="grid gap-2 sm:grid-cols-2">
                  {suitableFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cargo types */}
              {cargoTypes.length > 0 && (
                <div>
                  <SectionTitle tag="h2" title="Типы принимаемых грузов и контейнеров" className="mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {cargoTypes.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-surface-border bg-surface-gray px-3 py-1.5 text-sm text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Operations */}
              <div>
                <SectionTitle tag="h2" title="Выполняемые операции" className="mb-4" />
                <ul className="space-y-2">
                  {operations.map((op, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
                      {op}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div>
                <SectionTitle tag="h2" title="Преимущества терминала для этой услуги" className="mb-4" />
                <ul className="grid gap-2 sm:grid-cols-2">
                  {advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <SectionTitle tag="h2" title="Этапы выполнения" className="mb-4" />
                <ol className="space-y-4">
                  {steps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-text-primary">{step.title}</p>
                        <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Photos */}
              {images && images.length > 0 && (
                <div>
                  <SectionTitle tag="h2" title="Фотографии" className="mb-4" />
                  <div className={`grid gap-3 ${images.length === 1 ? '' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video overflow-hidden rounded-lg bg-surface-gray">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: form */}
            <aside>
              <div className="sticky top-20">
                <p className="mb-4 text-sm font-semibold text-text-primary">Получить расчёт по этой услуге</p>
                <QuickForm defaultService={serviceValue} />

                {/* Related services */}
                {relatedServices.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Связанные услуги
                    </p>
                    <ul className="space-y-1">
                      {relatedServices.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-brand-accent-light hover:text-brand-accent"
                          >
                            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <CtaSection
        title={`Нужна услуга «${h1}»?`}
        subtitle="Отправьте параметры груза — рассчитаем стоимость и предложим оптимальное решение."
      />
    </>
  )
}
