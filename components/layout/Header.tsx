'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, ChevronDown, Container } from 'lucide-react'
import { company } from '@/config/company'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

const services = [
  { label: 'Все услуги', href: '/uslugi', emoji: '📋' },
  { label: 'Хранение контейнеров', href: '/uslugi/hranenie-konteynerov', emoji: '📦' },
  { label: 'Хранение грузов', href: '/uslugi/hranenie-gruzov', emoji: '🗃️' },
  { label: 'Перетарка грузов', href: '/uslugi/peretarka-gruzov', emoji: '🔄' },
  { label: 'Затарка и растарка', href: '/uslugi/zatarka-i-rastarka', emoji: '📥' },
  { label: 'Погрузочно-разгрузочные работы', href: '/uslugi/pogruzochno-razgruzochnye-raboty', emoji: '🏗️' },
  { label: 'Контейнерные перевозки', href: '/uslugi/konteynernye-perevozki', emoji: '🚛' },
  { label: 'Складские услуги', href: '/uslugi/skladskie-uslugi', emoji: '🏭' },
  { label: 'Нестандартные грузы', href: '/uslugi/nestandartnye-gruzy', emoji: '⚙️' },
]

const navLinks = [
  { label: 'Терминал', href: '/terminal' },
  { label: 'О компании', href: '/o-kompanii' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/kontakty' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setServicesOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-200',
        isScrolled
          ? 'border-surface-dark-border bg-brand-dark/95 shadow-indigo-glow backdrop-blur-sm'
          : 'border-white/10 bg-brand-navy'
      )}
    >
      <div className="container-site">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label={`${company.name} — на главную`}
          >
            <Container className="h-8 w-8 text-brand-accent" aria-hidden="true" />
            <span className="hidden text-sm font-bold leading-tight sm:block">
              <span className="block text-white/90">Терминал</span>
              <span className="block text-brand-accent">Приморский</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Основная навигация" className="hidden lg:flex lg:items-center lg:gap-1">
            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                className={cn(
                  'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                  servicesOpen && 'bg-white/10 text-white'
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
              >
                Услуги
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>

              {servicesOpen && (
                <div
                  id="services-menu"
                  role="menu"
                  className="animate-slide-down absolute left-0 top-full mt-1 min-w-64 rounded-lg border border-surface-dark-border bg-brand-graphite p-1 shadow-card-hover"
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      role="menuitem"
                      className={cn(
                        'group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                        s.href === '/uslugi' && 'font-semibold text-brand-accent'
                      )}
                      onClick={() => setServicesOpen(false)}
                    >
                      <span className="shrink-0 text-base leading-none">{s.emoji}</span>
                      <span className="relative">
                        {s.label}
                        <span className="absolute bottom-0 left-0 h-px w-0 rounded-full bg-brand-accent transition-[width] duration-300 ease-out group-hover:w-full" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: phone + CTA */}
          <div className="flex items-center gap-3">
            {company.phone && (
              <a
                href={`tel:${company.phoneTel}`}
                className="hidden items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white md:flex"
                aria-label={`Позвонить: ${company.phone}`}
                onClick={() => trackEvent('click_phone')}
              >
                <Phone className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                {company.phone}
              </a>
            )}
            {/* DEV warning if contacts not confirmed */}
            {process.env.NODE_ENV === 'development' && !company.phone && (
              <span className="hidden text-xs text-amber-600 md:block">[DEV: данные не подтверждены]</span>
            )}

            <Link href="/raschet-stoimosti" className="hidden md:block">
              <Button size="sm" onClick={() => trackEvent('click_cta_hero')}>
                Получить расчёт
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in border-t border-white/10 bg-brand-dark lg:hidden"
        >
          <nav aria-label="Мобильная навигация" className="container-site py-4">
            <div className="flex flex-col gap-1">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/40">
                Услуги
              </p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                    s.href === '/uslugi' && 'font-semibold text-brand-accent'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="shrink-0 text-base leading-none">{s.emoji}</span>
                  {s.label}
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-white/10" />

              <div className="flex flex-col gap-2 px-3 py-2">
                {company.phone && (
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="flex items-center gap-2 text-sm font-semibold text-white/90"
                    onClick={() => trackEvent('click_phone')}
                  >
                    <Phone className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                    {company.phone}
                  </a>
                )}
                <Link href="/raschet-stoimosti" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" onClick={() => trackEvent('click_cta_hero')}>
                    Получить расчёт
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
