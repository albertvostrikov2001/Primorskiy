'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, AlertCircle, Upload } from 'lucide-react'
import { fullFormSchema, type FullFormValues, SERVICES, CONTAINER_TYPES } from '@/lib/validation/contact'
import { Button } from '@/components/ui/Button'
import { trackEvent, getSavedUtmParams } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { company } from '@/config/company'

export default function FullForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FullFormValues>({
    resolver: zodResolver(fullFormSchema),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileError(null)
    setFileName(null)
    if (!file) return

    if (!(company.allowedFileTypes as readonly string[]).includes(file.type)) {
      setFileError(`Недопустимый тип файла. Разрешены: ${company.allowedFileExtensions.join(', ')}`)
      e.target.value = ''
      return
    }
    if (file.size > company.maxFileSize) {
      setFileError(`Файл слишком большой. Максимум ${Math.round(company.maxFileSize / 1024 / 1024)} МБ`)
      e.target.value = ''
      return
    }
    setFileName(file.name)
  }

  async function onSubmit(data: FullFormValues) {
    setServerError(null)
    trackEvent('form_submit_full')

    try {
      const utms = getSavedUtmParams()
      const payload = { ...data, ...utms, formType: 'full' }

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

  const fieldClass = (err?: { message?: string }) =>
    cn('form-input', err && 'border-red-500')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-surface-border bg-white p-6 shadow-card"
      noValidate
    >
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register('honeypot')} aria-hidden="true" />

      <h2 className="text-xl font-bold">Заявка на расчёт стоимости</h2>

      {/* Service */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">Услуга</legend>
        <div>
          <label className="form-label" htmlFor="service">
            Выберите услугу <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select id="service" className={cn(fieldClass(errors.service), 'appearance-none pr-8')}
              aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-err' : undefined}
              {...register('service')}>
              <option value="">Выберите услугу</option>
              {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-text-muted" aria-hidden="true" />
          </div>
          {errors.service && <p id="service-err" className="form-error" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.service.message}</p>}
        </div>
      </fieldset>

      {/* Cargo parameters */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">Параметры груза</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="form-label" htmlFor="cargoType">Тип груза</label>
            <input id="cargoType" type="text" placeholder="Паллеты, оборудование..." className={fieldClass()} {...register('cargoType')} />
          </div>
          <div>
            <label className="form-label" htmlFor="weight">Масса, т</label>
            <input id="weight" type="text" inputMode="decimal" placeholder="5.5" className={fieldClass()} {...register('weight')} />
          </div>
          <div>
            <label className="form-label" htmlFor="volume">Объём, м³</label>
            <input id="volume" type="text" inputMode="decimal" placeholder="12" className={fieldClass()} {...register('volume')} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="pieces">Количество мест</label>
            <input id="pieces" type="text" inputMode="numeric" placeholder="10" className={fieldClass()} {...register('pieces')} />
          </div>
          <div>
            <label className="form-label" htmlFor="containerType">Тип контейнера</label>
            <div className="relative">
              <select id="containerType" className={cn(fieldClass(), 'appearance-none pr-8')} {...register('containerType')}>
                <option value="">Выберите тип</option>
                {CONTAINER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-text-muted" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="containerCount">Количество контейнеров</label>
            <input id="containerCount" type="text" inputMode="numeric" placeholder="1" className={fieldClass()} {...register('containerCount')} />
          </div>
          <div>
            <label className="form-label" htmlFor="retarkaDirection">Направление перетарки</label>
            <input id="retarkaDirection" type="text" placeholder="Из контейнера в фуру" className={fieldClass()} {...register('retarkaDirection')} />
          </div>
        </div>
      </fieldset>

      {/* Dates */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">Сроки</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="form-label" htmlFor="arrivalDate">Дата поступления</label>
            <input id="arrivalDate" type="date" className={fieldClass()} {...register('arrivalDate')} />
          </div>
          <div>
            <label className="form-label" htmlFor="storagePeriod">Срок хранения</label>
            <input id="storagePeriod" type="text" placeholder="2 недели" className={fieldClass()} {...register('storagePeriod')} />
          </div>
          <div>
            <label className="form-label" htmlFor="departureDatePlanned">Дата вывоза</label>
            <input id="departureDatePlanned" type="date" className={fieldClass()} {...register('departureDatePlanned')} />
          </div>
        </div>
      </fieldset>

      {/* Logistics */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">Логистика</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="specialEquipment">Необходимость спецтехники</label>
            <input id="specialEquipment" type="text" placeholder="Автокран, спредер..." className={fieldClass()} {...register('specialEquipment')} />
          </div>
          <div>
            <label className="form-label" htmlFor="deliveryMethod">Способ доставки</label>
            <input id="deliveryMethod" type="text" placeholder="Авто, ж/д, море..." className={fieldClass()} {...register('deliveryMethod')} />
          </div>
        </div>
      </fieldset>

      {/* Contact info */}
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">Контактная информация</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="full-name">
              Имя <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input id="full-name" type="text" autoComplete="name" placeholder="Иван Иванов"
              className={fieldClass(errors.name)} aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-err' : undefined} {...register('name')} />
            {errors.name && <p id="name-err" className="form-error" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="full-company">Компания</label>
            <input id="full-company" type="text" autoComplete="organization" placeholder="ООО «Компания»" className={fieldClass()} {...register('company')} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="full-phone">
              Телефон <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input id="full-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (900) 000-00-00"
              className={fieldClass(errors.phone)} aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-err' : undefined} {...register('phone')} />
            {errors.phone && <p id="phone-err" className="form-error" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.phone.message}</p>}
          </div>
          <div>
            <label className="form-label" htmlFor="full-email">Email</label>
            <input id="full-email" type="email" autoComplete="email" placeholder="email@company.ru" className={fieldClass(errors.email)}
              aria-invalid={!!errors.email} {...register('email')} />
            {errors.email && <p className="form-error" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.email.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Comment */}
      <div>
        <label className="form-label" htmlFor="full-comment">Комментарий / дополнительные требования</label>
        <textarea id="full-comment" rows={4} placeholder="Опишите задачу подробнее..." className="form-input resize-none" {...register('comment')} />
      </div>

      {/* File upload */}
      <div>
        <label className="form-label" htmlFor="file-upload">Загрузить ТЗ или документ (необязательно)</label>
        <label
          htmlFor="file-upload"
          className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-surface-border p-4 transition-colors hover:border-brand-accent hover:bg-brand-accent-light"
        >
          <Upload className="h-5 w-5 shrink-0 text-text-muted" aria-hidden="true" />
          <span className="text-sm text-text-secondary">
            {fileName ? (
              <span className="font-medium text-brand-accent">{fileName}</span>
            ) : (
              <>Нажмите или перетащите файл<br />
                <span className="text-xs text-text-muted">PDF, DOC, XLS, JPG, PNG — до {Math.round(company.maxFileSize / 1024 / 1024)} МБ</span></>
            )}
          </span>
          <input id="file-upload" type="file" className="sr-only" accept={company.allowedFileExtensions.join(',')} onChange={handleFileChange} />
        </label>
        {fileError && <p className="form-error mt-1" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{fileError}</p>}
      </div>

      {/* Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input id="full-consent" type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-surface-border accent-brand-accent"
            aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-err' : undefined}
            {...register('consent')} />
          <label htmlFor="full-consent" className="cursor-pointer text-xs leading-relaxed text-text-secondary">
            Я согласен(а) на обработку персональных данных в соответствии с{' '}
            <Link href="/politika-konfidencialnosti" target="_blank" className="text-brand-accent hover:underline">Политикой конфиденциальности</Link>{' '}
            и <Link href="/soglasie-na-obrabotku-personalnyh-dannyh" target="_blank" className="text-brand-accent hover:underline">Согласием на обработку ПДн</Link>
          </label>
        </div>
        {errors.consent && <p id="consent-err" className="form-error mt-1" role="alert"><AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />{errors.consent.message}</p>}
      </div>

      {serverError && (
        <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert" aria-live="assertive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {serverError}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
        Отправить заявку на расчёт
      </Button>

      <p className="text-center text-xs text-text-muted">
        Менеджер свяжется с вами для уточнения деталей и предоставления расчёта
      </p>
    </form>
  )
}
