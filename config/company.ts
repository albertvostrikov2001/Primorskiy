/**
 * Централизованная конфигурация компании.
 * Все поля, помеченные // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА,
 * необходимо заполнить перед публикацией.
 *
 * Если поле пустое (null / '') — соответствующий элемент UI не отображается.
 */

export const company = {
  /** Торговое наименование */
  name: 'Терминал Приморский',

  /** Юридическое наименование организации */
  legalName: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /** Физический адрес */
  address: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /** Координаты для карты */
  coordinates: {
    lat: 0, // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА
    lng: 0, // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА
  },

  /** Основной телефон (кликабельный tel:) */
  phone: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА
  /** Телефон для tel:-ссылки (без пробелов, с кодом страны: +7XXXXXXXXXX) */
  phoneTel: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /** Email для связи */
  email: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /** Режим работы (текст для отображения) */
  workingHours: '', // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /**
   * WhatsApp: номер с кодом страны без + (например: 79001234567)
   * null — кнопка не отображается
   */
  whatsapp: null as string | null, // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /**
   * Telegram: username без @ (например: terminal_primorskiy) или null
   * null — кнопка не отображается
   */
  telegram: null as string | null, // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА

  /** Подтверждённые технические характеристики */
  capacity: 'до 3900 TEU',
  distanceToPort: 'около 10 км до морского порта Новороссийска',

  /** Город для SEO / LocalBusiness */
  city: 'Новороссийск',
  region: 'Краснодарский край',
  country: 'RU',

  /** ID счётчиков аналитики */
  analyticsYM: process.env.NEXT_PUBLIC_YM_ID ?? '', // TODO: ID Яндекс Метрики
  analyticsGA: process.env.NEXT_PUBLIC_GA_ID ?? '', // TODO: ID Google Analytics 4

  /** URL сайта */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://terminal-primorskiy.ru',

  /** Социальные профили */
  social: {
    vk: null as string | null,       // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА
    youtube: null as string | null,  // TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА
  },

  /** Максимальный размер загружаемого файла (байт) */
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '5242880', 10),

  /** Допустимые типы файлов для загрузки в форму */
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
  ],
  allowedFileExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
} as const

export type Company = typeof company
