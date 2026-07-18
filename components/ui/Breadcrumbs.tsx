import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навигационная цепочка" className={cn('breadcrumb', className)}>
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-brand-accent"
        aria-label="Главная"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Главная</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="hover:text-brand-accent">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
