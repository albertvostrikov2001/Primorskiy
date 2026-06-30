import { z } from 'zod'

const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/

export const quickFormSchema = z.object({
  service: z.string().min(1, 'Выберите услугу'),
  name: z.string().min(2, 'Введите имя (минимум 2 символа)').max(100),
  phone: z
    .string()
    .min(10, 'Введите корректный номер телефона')
    .max(20, 'Слишком длинный номер')
    .regex(phoneRegex, 'Введите корректный номер телефона'),
  company: z.string().max(200).optional(),
  comment: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
  honeypot: z.string().max(0).optional(),
})

export type QuickFormValues = z.infer<typeof quickFormSchema>

export const fullFormSchema = z.object({
  service: z.string().min(1, 'Выберите услугу'),
  cargoType: z.string().max(200).optional(),
  weight: z.string().max(50).optional(),
  volume: z.string().max(50).optional(),
  pieces: z.string().max(50).optional(),
  containerType: z.string().max(100).optional(),
  containerCount: z.string().max(50).optional(),
  arrivalDate: z.string().optional(),
  storagePeriod: z.string().max(100).optional(),
  departureDatePlanned: z.string().optional(),
  retarkaDirection: z.string().max(200).optional(),
  specialEquipment: z.string().max(200).optional(),
  deliveryMethod: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  name: z.string().min(2, 'Введите имя (минимум 2 символа)').max(100),
  phone: z
    .string()
    .min(10, 'Введите корректный номер телефона')
    .max(20)
    .regex(phoneRegex, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email').max(200).optional().or(z.literal('')),
  comment: z.string().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие на обработку персональных данных' }),
  }),
  honeypot: z.string().max(0).optional(),
})

export type FullFormValues = z.infer<typeof fullFormSchema>

export const SERVICES = [
  { value: 'storage-containers', label: 'Хранение контейнеров' },
  { value: 'storage-cargo', label: 'Хранение грузов' },
  { value: 'retarka', label: 'Перетарка грузов' },
  { value: 'zatarka', label: 'Затарка и растарка' },
  { value: 'loading', label: 'Погрузочно-разгрузочные работы' },
  { value: 'transportation', label: 'Контейнерные перевозки' },
  { value: 'warehouse', label: 'Складские услуги' },
  { value: 'nonstandard', label: 'Нестандартные и тяжеловесные грузы' },
  { value: 'other', label: 'Другое / уточнить' },
] as const

export const CONTAINER_TYPES = [
  { value: '20dc', label: '20-футовый (20DC)' },
  { value: '40dc', label: '40-футовый (40DC)' },
  { value: '40hc', label: '40-футовый High Cube (40HC)' },
  { value: 'other', label: 'Другой / по согласованию' },
] as const
