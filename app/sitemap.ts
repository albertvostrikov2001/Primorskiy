import type { MetadataRoute } from 'next'
import { company } from '@/config/company'

export const dynamic = 'force-static'

const BASE = company.siteUrl

const routes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/uslugi', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/uslugi/hranenie-konteynerov', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/uslugi/hranenie-gruzov', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/uslugi/peretarka-gruzov', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/uslugi/zatarka-i-rastarka', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/pogruzochno-razgruzochnye-raboty', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/konteynernye-perevozki', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/nalivnye-gruzy', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/vzveshivanie', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/uslugi/stikerovka-markirovka', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/uslugi/ruchnaya-obrabotka', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/uslugi/formirovanie-gruzovoy-edinicy', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/uslugi/ekspedirovanie', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/mezhdunarodnye-perevozki', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/skladskie-uslugi', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/uslugi/nestandartnye-gruzy', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/terminal', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/terminal/infrastruktura', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/terminal/tehnika', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/o-kompanii', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/kejsy', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { url: '/dokumenty', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/kontakty', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/raschet-stoimosti', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/politika-konfidencialnosti', priority: 0.3, changeFrequency: 'yearly' },
  { url: '/soglasie-na-obrabotku-personalnyh-dannyh', priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
