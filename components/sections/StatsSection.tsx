import { Container, MapPin, Cog, CheckCircle2 } from 'lucide-react'

const stats = [
  {
    icon: Container,
    value: 'до 3 900',
    unit: 'TEU',
    label: 'Вместимость площадки',
  },
  {
    icon: MapPin,
    value: '~10',
    unit: 'км',
    label: 'до морского порта Новороссийска',
  },
  {
    icon: Cog,
    value: '4+',
    unit: '',
    label: 'Типа терминальной техники',
  },
  {
    icon: CheckCircle2,
    value: '8',
    unit: '',
    label: 'Направлений терминальных услуг',
  },
]

export default function StatsSection() {
  return (
    <section className="section-indigo section-py" aria-label="Ключевые показатели терминала">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mb-1 flex items-baseline justify-center gap-1">
                <span className="stat-number">{stat.value}</span>
                {stat.unit && (
                  <span className="text-lg font-semibold text-brand-accent">{stat.unit}</span>
                )}
              </div>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-white/30">
          * Характеристики указаны на основании подтверждённых данных. Актуальная информация — по запросу.
        </p>
      </div>
    </section>
  )
}
