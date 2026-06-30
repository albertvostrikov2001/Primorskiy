import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, MapPin, Clock, Send } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { company } from '@/config/company'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd, localBusinessJsonLd } from '@/lib/seo/jsonld'
import QuickForm from '@/components/forms/QuickForm'

export const metadata: Metadata = buildMetadata({
  title: 'Контакты | Терминал Приморский — Новороссийск',
  description: 'Контакты Терминала Приморский: телефон, email, адрес в Новороссийске. Отправьте заявку или позвоните для расчёта стоимости.',
  path: '/kontakty',
})

const serviceAreas = [
  'Новороссийск',
  'Краснодарский край',
  'Южный федеральный округ',
  'Порт Новороссийска',
]

export default function KontaktyPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Контакты', url: '/kontakty' }]
  const isDev = process.env.NODE_ENV === 'development'
  const hasAnyContact = !!(company.phone || company.email || company.address)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />
      {company.address && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
      )}

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Контакты' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Контакты</h1>
          <p className="mt-3 text-lg text-white/70">
            Свяжитесь с нами, чтобы обсудить задачу или получить расчёт стоимости
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="mb-6 text-xl font-bold">Контактная информация</h2>

              {!hasAnyContact && isDev && (
                <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  [DEV] Контактные данные не подтверждены заказчиком. Заполните поля в{' '}
                  <code className="font-mono">config/company.ts</code>.
                </div>
              )}

              <div className="space-y-4">
                {company.phone && (
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="flex items-center gap-3 rounded-lg border border-surface-border p-4 transition-colors hover:border-brand-accent hover:bg-brand-accent-light"
                  >
                    <div className="icon-circle shrink-0">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Телефон</p>
                      <p className="font-semibold text-text-primary">{company.phone}</p>
                    </div>
                  </a>
                )}

                {company.email && (
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 rounded-lg border border-surface-border p-4 transition-colors hover:border-brand-accent hover:bg-brand-accent-light"
                  >
                    <div className="icon-circle shrink-0">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Email</p>
                      <p className="font-semibold text-text-primary">{company.email}</p>
                    </div>
                  </a>
                )}

                {company.whatsapp && (
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-surface-border p-4 transition-colors hover:border-brand-accent hover:bg-brand-accent-light"
                  >
                    <div className="icon-circle shrink-0">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">WhatsApp</p>
                      <p className="font-semibold text-text-primary">Написать в WhatsApp</p>
                    </div>
                  </a>
                )}

                {company.telegram && (
                  <a
                    href={`https://t.me/${company.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-surface-border p-4 transition-colors hover:border-brand-accent hover:bg-brand-accent-light"
                  >
                    <div className="icon-circle shrink-0">
                      <Send className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Telegram</p>
                      <p className="font-semibold text-text-primary">@{company.telegram}</p>
                    </div>
                  </a>
                )}

                {company.address && (
                  <div className="flex items-start gap-3 rounded-lg border border-surface-border p-4">
                    <div className="icon-circle shrink-0">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Адрес</p>
                      <p className="font-semibold text-text-primary">{company.address}</p>
                      {company.coordinates.lat !== 0 && (
                        <a
                          href={`https://yandex.ru/maps/?pt=${company.coordinates.lng},${company.coordinates.lat}&z=16`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-sm text-brand-accent hover:underline"
                        >
                          Построить маршрут →
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {company.workingHours && (
                  <div className="flex items-start gap-3 rounded-lg border border-surface-border p-4">
                    <div className="icon-circle shrink-0">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Режим работы</p>
                      <p className="font-semibold text-text-primary">{company.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Service areas */}
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
                  Зоны обслуживания
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span key={area} className="rounded-full border border-surface-border bg-surface-gray px-3 py-1.5 text-sm text-text-secondary">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              {company.address && (
                <div className="mt-6 overflow-hidden rounded-xl border border-surface-border bg-surface-gray" style={{ height: 300 }}>
                  <div className="flex h-full items-center justify-center text-sm text-text-muted">
                    Карта будет добавлена после подтверждения адреса заказчиком
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div>
              <h2 className="mb-6 text-xl font-bold">Оставить заявку</h2>
              <QuickForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
