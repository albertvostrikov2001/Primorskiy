import type { Metadata } from 'next'
import { company } from '@/config/company'

interface PageMetaOptions {
  title: string
  description: string
  path: string
  ogImage?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: PageMetaOptions): Metadata {
  const url = `${company.siteUrl}${path}`
  const image = ogImage ?? `${company.siteUrl}/og-default.png`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      locale: 'ru_RU',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function buildServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  path: string
): Metadata {
  return buildMetadata({
    title: `${serviceName} в Новороссийске | ${company.name}`,
    description: serviceDescription,
    path,
  })
}
