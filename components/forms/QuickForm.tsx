'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { quickFormSchema, type QuickFormValues, SERVICES, CONTAINER_TYPES } from '@/lib/validation/contact'
import { Button } from '@/components/ui/Button'
import { trackEvent, getSavedUtmParams } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface QuickFormProps {
  defaultService?: string
  className?: string
}

export default function QuickForm({ defaultService, className }: QuickFormProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickFormValues>({
    resolver: zodResolver(quickFormSchema),
    defaultValues: {
      service: defaultService ?? '',
    },
  })

  async function onSubmit(data: QuickFormValues) {
    setServerError(null)
    trackEvent('form_submit_quick')

    try {
      const utms = getSavedUtmParams()
      const payload = { ...data, ...utms, formType: 'quick' }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok) {
        setServerError(json.error ?? 'Произошла ошибка. Попробуйте ещё раз.')
        trackEvent('form_error', { field: 'server' })
        return
      }

      trackEvent('form_success')
      router.push('/spasibo')
    } catch {
      setServerError('Ошибка соединения. Проверьте интернет и попробуйте снова.')
      trackEvent('form_error', { field: 'network' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-4 rounded-xl border border-surface-border bg-white p-6 shadow-card', className)}
      noValidate
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      {/* Service */}
      <div>
        <label className="form-label" htmlFor="service">
          Услуга <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="service"
            className={cn('form-input appearance-none pr-8', errors.service && 'border-red-500')}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
            {...register('service')}
          >
            <option value="">Выберите услугу</option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-text-muted" aria-hidden="true" />
        </div>
        {errors.service && (
          <p id="service-error" className="form-error" role="alert">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Name + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="name">
            Имя <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Иван Иванов"
            className={cn('form-input', errors.name && 'border-red-500')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="form-error" role="alert">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="phone">
            Телефон <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 (900) 000-00-00"
            inputMode="tel"
            className={cn('form-input', errors.phone && 'border-red-500')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className="form-error" role="alert">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="form-label" htmlFor="company">
          Компания
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder="ООО «Ваша Компания»"
          className="form-input"
          {...register('company')}
        />
      </div>

      {/* Comment */}
      <div>
        <label className="form-label" htmlFor="comment">
          Комментарий
        </label>
        <textarea
          id="comment"
          rows={3}
          placeholder="Опишите вашу задачу..."
          className="form-input resize-none"
          {...register('comment')}
        />
      </div>

      {/* Expandable fields */}
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border border-surface-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-gray-medium"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((v) => !v)
            if (!expanded) trackEvent('form_expand_fields')
          }}
        >
          Добавить параметры груза (необязательно)
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        {expanded && (
          <div className="mt-3 space-y-4 rounded-md border border-surface-border bg-surface-gray p-4">
            {/* Cargo type + weight + volume */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="form-label" htmlFor="cargoType">Тип груза</label>
                <input id="cargoType" type="text" placeholder="Паллеты, оборудование..." className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="weight">Масса, тонн</label>
                <input id="weight" type="text" inputMode="decimal" placeholder="5.5" className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="volume">Объём, м³</label>
                <input id="volume" type="text" inputMode="decimal" placeholder="12" className="form-input" />
              </div>
            </div>
            {/* Container type + count */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="form-label" htmlFor="containerType">Тип контейнера</label>
                <div className="relative">
                  <select id="containerType" className="form-input appearance-none pr-8">
                    <option value="">Выберите тип</option>
                    {CONTAINER_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-text-muted" aria-hidden="true" />
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="containerCount">Количество контейнеров</label>
                <input id="containerCount" type="text" inputMode="numeric" placeholder="1" className="form-input" />
              </div>
            </div>
            {/* Dates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="form-label" htmlFor="arrivalDate">Дата поступления</label>
                <input id="arrivalDate" type="date" className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="departureDatePlanned">Дата вывоза</label>
                <input id="departureDatePlanned" type="date" className="form-input" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-surface-border accent-brand-accent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent')}
          />
          <label htmlFor="consent" className="cursor-pointer text-xs leading-relaxed text-text-secondary">
            Я согласен(а) на обработку персональных данных в соответствии с{' '}
            <Link
              href="/politika-konfidencialnosti"
              target="_blank"
              className="text-brand-accent hover:underline"
            >
              Политикой конфиденциальности
            </Link>{' '}
            и{' '}
            <Link
              href="/soglasie-na-obrabotku-personalnyh-dannyh"
              target="_blank"
              className="text-brand-accent hover:underline"
            >
              Согласием на обработку ПДн
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="form-error mt-1" role="alert">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div
          className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </div>
      )}

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Отправить заявку
      </Button>

      <p className="text-center text-xs text-text-muted">
        Ответим на все вопросы и рассчитаем стоимость под вашу задачу
      </p>
    </form>
  )
}
