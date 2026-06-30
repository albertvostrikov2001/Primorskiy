import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Заявка отправлена — Спасибо | Терминал Приморский',
  description: 'Ваша заявка получена. Менеджер свяжется с вами в ближайшее время.',
  path: '/spasibo',
  noIndex: true,
})

export default function SpasiboPage() {
  return (
    <section className="section-py flex min-h-[60vh] items-center bg-surface-gray">
      <div className="container-site">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
            </div>
          </div>
          <h1 className="mb-3 text-2xl font-bold md:text-3xl">Заявка отправлена!</h1>
          <p className="mb-8 text-lg text-text-secondary">
            Менеджер свяжется с вами в ближайшее время для уточнения деталей и расчёта стоимости.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
            >
              На главную
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-gray-medium"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
