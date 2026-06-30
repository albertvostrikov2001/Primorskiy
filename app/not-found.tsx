import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-surface-gray">
      <div className="container-site py-16 text-center">
        <p className="mb-2 text-6xl font-bold text-brand-accent">404</p>
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Страница не найдена</h1>
        <p className="mb-8 text-text-secondary">
          Запрошенная страница не существует или была перемещена.
        </p>
        <nav aria-label="Навигация при ошибке 404">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              На главную
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-gray-medium"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Все услуги
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-sm text-text-muted">Популярные страницы:</p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              {[
                { label: 'Хранение контейнеров', href: '/uslugi/hranenie-konteynerov' },
                { label: 'Перетарка грузов', href: '/uslugi/peretarka-gruzov' },
                { label: 'Контакты', href: '/kontakty' },
                { label: 'Расчёт стоимости', href: '/raschet-stoimosti' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-surface-border bg-white px-3 py-1.5 text-text-secondary hover:border-brand-accent hover:text-brand-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}
