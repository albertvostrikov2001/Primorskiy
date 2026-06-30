import { company } from '@/config/company'

export function organizationJsonLd() {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.siteUrl,
    logo: `${company.siteUrl}/logo.svg`,
    sameAs: [],
  }

  if (company.legalName) base.legalName = company.legalName
  if (company.email) base.email = company.email
  if (company.phone) {
    base.contactPoint = {
      '@type': 'ContactPoint',
      telephone: company.phoneTel,
      contactType: 'customer service',
      availableLanguage: 'Russian',
      areaServed: 'RU',
    }
  }

  return base
}

export function localBusinessJsonLd() {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    url: company.siteUrl,
    image: `${company.siteUrl}/og-default.png`,
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  }

  if (company.address) base.address = { '@type': 'PostalAddress', streetAddress: company.address, addressLocality: company.city, addressRegion: company.region, addressCountry: company.country }
  if (company.phone) base.telephone = company.phoneTel
  if (company.email) base.email = company.email
  if (company.workingHours) base.openingHours = company.workingHours
  if (company.coordinates.lat && company.coordinates.lng) {
    base.geo = { '@type': 'GeoCoordinates', latitude: company.coordinates.lat, longitude: company.coordinates.lng }
  }

  return base
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${company.siteUrl}${item.url}`,
    })),
  }
}

export function serviceJsonLd(params: {
  name: string
  description: string
  url: string
  areaServed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: `${company.siteUrl}${params.url}`,
    provider: {
      '@type': 'Organization',
      name: company.name,
      url: company.siteUrl,
    },
    areaServed: params.areaServed ?? `${company.city}, ${company.region}`,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${company.siteUrl}${params.url}`,
      servicePhone: company.phoneTel,
    },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
