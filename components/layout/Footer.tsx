import Link from 'next/link'
import { Phone, Mail, MessageCircle, Container, Send } from 'lucide-react'
import { company } from '@/config/company'

const serviceLinks = [
  { label: 'Хранение контейнеров', href: '/uslugi/hranenie-konteynerov' },
  { label: 'Хранение грузов', href: '/uslugi/hranenie-gruzov' },
  { label: 'Перетарка грузов', href: '/uslugi/peretarka-gruzov' },
  { label: 'Затарка и растарка', href: '/uslugi/zatarka-i-rastarka' },
  { label: 'Погрузочно-разгрузочные работы', href: '/uslugi/pogruzochno-razgruzochnye-raboty' },
  { label: 'Контейнерные перевозки', href: '/uslugi/konteynernye-perevozki' },
  { label: 'Складские услуги', href: '/uslugi/skladskie-uslugi' },
  { label: 'Нестандартные грузы', href: '/uslugi/nestandartnye-gruzy' },
]

const companyLinks = [
  { label: 'О компании', href: '/o-kompanii' },
  { label: 'О терминале', href: '/terminal' },
  { label: 'Инфраструктура', href: '/terminal/infrastruktura' },
  { label: 'Техника', href: '/terminal/tehnika' },
  { label: 'Кейсы', href: '/kejsy' },
  { label: 'Блог', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Документы', href: '/dokumenty' },
  { label: 'Контакты', href: '/kontakty' },
]

const legalLinks = [
  { label: 'Политика конфиденциальности', href: '/politika-konfidencialnosti' },
  { label: 'Согласие на обработку ПДн', href: '/soglasie-na-obrabotku-personalnyh-dannyh' },
  { label: 'Документы', href: '/dokumenty' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const isDev = process.env.NODE_ENV === 'development'
  const hasContacts = !!(company.phone || company.email || company.address)

  return (
    <footer className="bg-brand-graphite text-text-light">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2" aria-label={`${company.name} — на главную`}>
              <Container className="h-8 w-8 text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-bold leading-tight">
                <span className="block text-white">Терминал</span>
                <span className="block text-brand-accent">Приморский</span>
              </span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-white/60">
              Контейнерный терминал в Новороссийске. Хранение контейнеров и грузов, перетарка,
              погрузочно-разгрузочные работы рядом с портом.
            </p>

            {/* Contacts */}
            <div className="space-y-2">
              {company.phone && (
                <a
                  href={`tel:${company.phoneTel}`}
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-brand-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                  {company.phone}
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-brand-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                  {company.email}
                </a>
              )}
              {company.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-brand-accent"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                  WhatsApp
                </a>
              )}
              {company.telegram && (
                <a
                  href={`https://t.me/${company.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-brand-accent"
                >
                  <Send className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                  Telegram
                </a>
              )}
              {company.address && (
                <p className="text-sm text-white/60">{company.address}</p>
              )}
              {company.workingHours && (
                <p className="text-sm text-white/60">{company.workingHours}</p>
              )}
            </div>

            {/* DEV warning */}
            {isDev && !hasContacts && (
              <p className="mt-2 text-xs text-amber-400">[DEV: данные не подтверждены]</p>
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">
              Услуги
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">
              Компания
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">
              Получить расчёт
            </h3>
            <p className="mb-4 text-sm text-white/60">
              Отправьте параметры груза или контейнера — рассчитаем стоимость и ответим на вопросы.
            </p>
            <Link
              href="/raschet-stoimosti"
              className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
            >
              Рассчитать стоимость
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/40">
            © {year} {company.legalName || company.name}. Все права защищены.
          </p>
          <nav aria-label="Юридические ссылки">
            <ul className="flex flex-wrap gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
