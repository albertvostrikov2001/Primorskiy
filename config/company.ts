export const company = {
  name: 'Терминал Приморский',

  legalName: 'ООО «Терминал «Приморский»',

  /** Фактический адрес (для отображения на сайте) */
  address: 'Краснодарский край, г. Новороссийск, Кирилловская промзона, ул. 4-я Промышленная, 5',

  /** Юридический адрес */
  legalAddress: '353909, Краснодарский край, г. Новороссийск, ул. Мефодиевская д. 145, к. 1, офис 6/5',

  /** Почтовый адрес */
  postalAddress: '353991, Краснодарский край, г. Новороссийск, с. Гайдук, ул. Новороссийское шоссе, 11',

  coordinates: {
    lat: 44.7322,
    lng: 37.7938,
  },

  phone: '+7 (918) 080-43-43',
  phoneTel: '+79180804343',

  email: 'terminal-primorskiy@mail.ru',

  workingHours: '',

  whatsapp: null as string | null,
  telegram: null as string | null,

  capacity: 'до 3900 TEU',
  distanceToPort: 'около 10 км до морского порта Новороссийска',

  city: 'Новороссийск',
  region: 'Краснодарский край',
  country: 'RU',

  /** Реквизиты */
  inn: '2315231044',
  kpp: '231501001',
  ogrn: '1232300040774',
  bank: 'Филиал «Ростовский» АО «Альфа-Банк»',
  bik: '046015207',
  rs: '40702810326330000444',
  ks: '30101810500000000207',

  /** Руководство */
  director: 'Демченко Дмитрий Николаевич',

  analyticsYM: process.env.NEXT_PUBLIC_YM_ID ?? '',
  analyticsGA: process.env.NEXT_PUBLIC_GA_ID ?? '',

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://terminal-primorskiy.ru',

  social: {
    vk: null as string | null,
    youtube: null as string | null,
  },

  maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '5242880', 10),

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
