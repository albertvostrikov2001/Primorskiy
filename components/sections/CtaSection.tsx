import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CtaSectionProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaSection({
  title = 'Получить расчёт стоимости хранения или перетарки',
  subtitle = 'Отправьте параметры груза или контейнера — рассчитаем стоимость под вашу задачу.',
  primaryLabel = 'Рассчитать стоимость',
  primaryHref = '/raschet-stoimosti',
  secondaryLabel = 'Связаться с менеджером',
  secondaryHref = '/kontakty',
}: CtaSectionProps) {
  return (
    <section className="section-py bg-brand-accent" aria-label="Призыв к действию">
      <div className="container-site text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-xl text-base text-white/80">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={primaryHref}>
            <Button
              variant="ghost-light"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-accent"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-sm font-semibold text-white/80 underline underline-offset-2 hover:text-white"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
