import { cn } from '@/lib/utils'

interface SectionTitleProps {
  tag?: 'h1' | 'h2' | 'h3'
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
  id?: string
}

export function SectionTitle({
  tag: Tag = 'h2',
  title,
  subtitle,
  centered = false,
  light = false,
  className,
  id,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <Tag
        id={id}
        className={cn(
          'text-balance',
          light ? 'text-text-light' : 'text-text-primary'
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            'mt-3 text-lg leading-relaxed',
            light ? 'text-white/70' : 'text-text-secondary',
            centered && 'mx-auto max-w-2xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
