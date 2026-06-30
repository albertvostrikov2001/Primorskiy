# Analytics — Документация

## Конфигурация

Аналитика настраивается через переменные окружения в `.env.local`:

```env
NEXT_PUBLIC_YM_ID=12345678     # ID счётчика Яндекс Метрики
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX # ID потока GA4
```

Если ID не заданы — аналитика **не инициализируется**. Ошибок нет, сайт работает нормально.

---

## Реализация

### Файлы
- `lib/analytics/index.ts` — типизированные события, UTM-утилиты
- `components/providers/AnalyticsProvider.tsx` — загрузка скриптов (стратегия `afterInteractive`)

### Инициализация
Компонент `AnalyticsProvider` подключён в `app/layout.tsx`. Скрипты загружаются после гидрации (`afterInteractive`), чтобы не блокировать LCP.

---

## Событийная модель

```typescript
import { trackEvent } from '@/lib/analytics'
```

| Событие | Описание | Где вызывается |
|---|---|---|
| `form_submit_quick` | Клик «Отправить» в быстрой форме | QuickForm.tsx |
| `form_submit_full` | Клик «Отправить» в полной форме | FullForm.tsx |
| `form_success` | Успешная отправка (до редиректа) | QuickForm.tsx, FullForm.tsx |
| `form_error` | Ошибка при отправке | QuickForm.tsx, FullForm.tsx |
| `click_phone` | Клик по номеру телефона | Header.tsx, Footer.tsx |
| `click_email` | Клик по email | - |
| `click_whatsapp` | Клик WhatsApp | Footer.tsx |
| `click_telegram` | Клик Telegram | Footer.tsx |
| `click_cta_hero` | Клик на CTA в Hero | Header.tsx |
| `click_cta_service` | Клик на CTA услуги | - |
| `click_route` | Клик «Построить маршрут» | Контакты |
| `page_view_service` | Просмотр страницы услуги | Страницы услуг |
| `document_download` | Скачивание документа | Документы |
| `form_expand_fields` | Раскрытие дополнительных полей | QuickForm.tsx |
| `request_kp` | Запрос КП | - |

### Пример использования
```typescript
trackEvent('click_phone')
trackEvent('page_view_service', { service: 'storage-containers' })
trackEvent('form_error', { field: 'phone' })
```

---

## UTM-параметры

UTM автоматически сохраняются в `sessionStorage` при первом визите (`persistUtmParams()`).  
При отправке формы UTM добавляются к данным заявки.

---

## Цели в Яндекс Метрике

После подключения настройте цели в интерфейсе Метрики:

| ID цели | Тип | Условие |
|---|---|---|
| `form_success` | JavaScript | `ym(id, 'reachGoal', 'form_success')` |
| `click_phone` | JavaScript | `ym(id, 'reachGoal', 'click_phone')` |
| `click_cta_hero` | JavaScript | `ym(id, 'reachGoal', 'click_cta_hero')` |

---

## Конверсионные страницы

| Страница | Событие |
|---|---|
| `/spasibo` | Фиксируется как конверсия (form_success до редиректа) |
| `/raschet-stoimosti` | Отслеживать через `form_submit_full` |

---

## Коллтрекинг

Для подключения коллтрекинга:
1. Подключить сервис (CallTouch, CoMagic, Roistat и т.д.)
2. Добавить скрипт через `next/script` в `AnalyticsProvider`
3. Использовать dynamic номер для отображения вместо `company.phone`

---

## Тестирование событий

### Яндекс Метрика
1. Включить «Отладочный режим» через расширение Яндекс Метрика
2. Выполнить целевое действие
3. Проверить в панели «Счётчики»

### GA4
1. Открыть GA4 → Reports → Realtime
2. Выполнить целевое действие
3. Проверить в Realtime Events

### Консоль
Для проверки без реального счётчика — добавьте `console.log` в `trackEvent()` при разработке.
