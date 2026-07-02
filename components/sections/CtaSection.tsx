import Link from 'next/link'
import Image from 'next/image'
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
    <section className="relative overflow-hidden section-py" aria-label="Призыв к действию">
      {/* Background image */}
      <Image
        src="/images/about-terminal.jpg"
        alt=""
        fill
        quality={75}
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Indigo overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-dark/90 to-brand-graphite/80" aria-hidden="true" />

      <div className="container-site relative z-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-xl text-base text-white/80">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={primaryHref}>
            <Button size="lg">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref}>
              <Button variant="ghost-light" size="lg">
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
