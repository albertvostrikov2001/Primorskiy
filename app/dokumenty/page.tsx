import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { FileText, Download } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Документы | Терминал Приморский',
  description: 'Юридические документы, лицензии и сертификаты Терминала Приморский.',
  path: '/dokumenty',
})

const documentCategories = [
  {
    title: 'Юридические документы',
    items: [
      { name: 'Политика конфиденциальности', href: '/politika-konfidencialnosti', internal: true },
      { name: 'Согласие на обработку персональных данных', href: '/soglasie-na-obrabotku-personalnyh-dannyh', internal: true },
    ],
  },
  {
    title: 'Сертификаты и лицензии',
    items: [], // TODO: добавить после подтверждения заказчиком
  },
  {
    title: 'Реквизиты',
    items: [], // TODO: добавить после подтверждения заказчиком
  },
]

export default function DokumentyPage() {
  const crumbs = [{ name: 'Главная', url: '/' }, { name: 'Документы', url: '/dokumenty' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }} />

      <section className="bg-brand-dark py-12">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Документы' }]} className="mb-4 text-white/50 [&_a]:text-white/60" />
          <h1 className="text-white">Документы</h1>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site max-w-3xl">
          <div className="space-y-8">
            {documentCategories.map((cat) => (
              <div key={cat.title}>
                <h2 className="mb-4 text-lg font-bold">{cat.title}</h2>
                {cat.items.length > 0 ? (
                  <ul className="space-y-2">
                    {cat.items.map((doc) => (
                      <li key={doc.name}>
                        {doc.internal ? (
                          <a href={doc.href} className="flex items-center gap-3 rounded-md border border-surface-border p-3 transition-colors hover:border-brand-accent hover:bg-brand-accent-light">
                            <FileText className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
                            <span className="text-sm font-medium text-text-primary">{doc.name}</span>
                          </a>
                        ) : (
                          <a href={doc.href} download className="flex items-center gap-3 rounded-md border border-surface-border p-3 transition-colors hover:border-brand-accent hover:bg-brand-accent-light">
                            <Download className="h-5 w-5 shrink-0 text-brand-accent" aria-hidden="true" />
                            <span className="text-sm font-medium text-text-primary">{doc.name}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-text-muted italic">Документы будут добавлены после предоставления заказчиком.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
