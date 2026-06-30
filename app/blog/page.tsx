import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'

export const metadata: Metadata = buildMetadata({
  title: 'Блог | Терминал Приморский',
  description: 'Статьи о контейнерной логистике, хранении грузов, перетарке и терминальных услугах в Новороссийске.',
  path: '/blog',
})

const categories = [
  'Хранение контейнеров',
  'Перетарка',
  'Терминальные операции',
  'Контейнерные перевозки',
  'Импорт и экспорт',
  'Документы',
  'Складская логистика',
  'Новости терминала',
]

const plannedPosts = [
  'Как рассчитывается стоимость хранения контейнера',
  'Когда нужна перетарка из контейнера в автомобиль',
  'Какие данные подготовить для расчёта терминальных услуг',
  'Как сократить простой контейнера',
  'Чем отличается затарка от растарки',
  'Как выбрать площадку для хранения гружёных контейнеров',
  'Какие операции можно выполнить на контейнерном терминале',
  'Как организовать вывоз контейнера из порта Новороссийска',
]

export default function BlogPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Блог', url: '/blog' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Блог' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Блог</h1>
          <p className="mt-3 text-lg text-white/70">Статьи о контейнерной логистике и терминальных услугах</p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          {/* Categories */}
          <div className="mb-10">
            <h2 className="mb-4 text-lg font-bold">Категории</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span key={cat} className="rounded-full border border-surface-border bg-surface-gray px-3 py-1.5 text-sm text-text-secondary">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Empty state */}
          <div className="rounded-xl border border-dashed border-surface-border bg-surface-gray p-10 text-center">
            <p className="mb-2 text-lg font-semibold text-text-primary">Статьи скоро появятся</p>
            <p className="mb-6 text-text-secondary">
              Публикации в блоге будут добавлены после согласования с заказчиком. Демо-материалы помечены тегом [DEMO].
            </p>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">
              Планируемые темы
            </h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              {plannedPosts.map((post) => (
                <li key={post}>• {post}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <Link href="/kontakty" className="inline-flex items-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover">
              Задать вопрос менеджеру
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
