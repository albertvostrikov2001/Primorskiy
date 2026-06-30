import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { company } from '@/config/company'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SkipLink } from '@/components/ui/SkipLink'
import AnalyticsProvider from '@/components/providers/AnalyticsProvider'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `Контейнерный терминал в Новороссийске — хранение и перетарка грузов | ${company.name}`,
    template: `%s | ${company.name}`,
  },
  description:
    'Терминал Приморский: хранение контейнеров и грузов, перетарка, обработка и перевозка рядом с портом Новороссийска. Отправьте параметры и получите расчёт.',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-surface-white font-sans text-text-primary antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
