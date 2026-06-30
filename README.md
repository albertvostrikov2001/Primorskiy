# Терминал Приморский — Корпоративный сайт

Production-ready B2B-сайт контейнерного терминала в Новороссийске.

## Аудит репозитория (2026-06-30)

**Статус:** Проект создан с нуля (greenfield). Репозиторий был пуст, существующего кода не было. Реализован полный стек на Next.js 15 App Router.

---

## Стек

| Слой | Технология |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript |
| Стили | Tailwind CSS 3 |
| Иконки | Lucide React |
| Формы | React Hook Form + Zod |
| Email | Nodemailer / Resend / Webhook |
| SEO | Next Metadata API, JSON-LD |
| Аналитика | Яндекс Метрика, GA4 (через конфиг) |
| Тесты | Playwright e2e |

---

## Структура

```
app/                    # Маршруты (App Router)
  uslugi/               # Страницы услуг
  terminal/             # Страницы терминала
  api/contact/          # API форм
  sitemap.ts            # Динамический sitemap.xml
  robots.ts             # robots.txt
components/
  layout/               # Header, Footer
  sections/             # Секции страниц
  forms/                # Формы
  ui/                   # Базовые компоненты
  providers/            # AnalyticsProvider
lib/
  analytics/            # Типизированные события
  email/                # Email-адаптер (SMTP/Resend/webhook)
  seo/                  # JSON-LD хелперы, buildMetadata
  validation/           # Zod-схемы форм
config/
  company.ts            # Централизованные данные компании
middleware.ts           # Security headers (CSP, HSTS, etc.)
styles/globals.css      # Глобальные стили
```

---

## Запуск

```bash
# 1. Установка зависимостей
npm install

# 2. Настройка переменных окружения
cp .env.example .env.local
# Заполните .env.local значениями

# 3. Запуск dev-сервера
npm run dev
```

---

## Переменные окружения

Все переменные описаны в `.env.example` с комментариями.

**Ключевые:**
```env
NEXT_PUBLIC_SITE_URL=https://terminal-primorskiy.ru
FORM_ADAPTER=smtp          # smtp | resend | webhook
SMTP_TO=manager@example.com
NEXT_PUBLIC_YM_ID=         # ID Яндекс Метрики (оставьте пустым для отключения)
NEXT_PUBLIC_GA_ID=         # ID GA4 (оставьте пустым для отключения)
```

---

## Данные компании

Все контактные данные и характеристики терминала — в `config/company.ts`.

Поля, требующие подтверждения, помечены `// TODO: ПОДТВЕРДИТЬ У ЗАКАЗЧИКА`.

Полный список см. в `CONTENT_TODO.md`.

---

## Управление контентом

### Изменение контактных данных
→ `config/company.ts`

### Изменение услуг
→ `app/uslugi/[slug]/page.tsx` — каждая услуга в отдельном файле

### Добавление статьи в блог
→ Создать `app/blog/[slug]/page.tsx`  
→ Добавить маршрут в `app/sitemap.ts`

### Добавление кейса
→ Создать `app/kejsy/[slug]/page.tsx`

### Изменение FAQ
→ `app/faq/page.tsx` — массив `faqs`  
→ Главная: `app/page.tsx` — массив `homeFaqs`

---

## Формы

Формы обрабатываются через `/api/contact/route.ts`.

Адаптеры: SMTP, Resend, Webhook — выбирается через `FORM_ADAPTER` в `.env`.

Если `SMTP_HOST` не задан в dev-режиме — данные выводятся в консоль (`console.log`).

Полная документация: `ANALYTICS.md`, `DEPLOYMENT.md`.

---

## Сборка

```bash
npm run build        # Production build
npm run typecheck    # Проверка TypeScript
npm run lint         # ESLint
npm run test:e2e     # Playwright тесты
```

---

## Деплой

Подробно в `DEPLOYMENT.md`.

**Быстрый старт (Vercel):**
1. Push в GitHub
2. Подключить репозиторий в Vercel
3. Добавить env-переменные
4. Деплой автоматический

---

## Документация

| Файл | Содержание |
|---|---|
| `CONTENT_TODO.md` | Что подтвердить у заказчика |
| `SEO.md` | SEO-архитектура, structured data, Search Console |
| `ANALYTICS.md` | События, цели, коллтрекинг |
| `DEPLOYMENT.md` | Деплой, DNS, мониторинг, rollback |
| `.env.example` | Все переменные окружения |

---

## Чеклист перед публикацией

- [ ] Все поля в `config/company.ts` заполнены
- [ ] `.env.local` настроен
- [ ] Формы протестированы
- [ ] `npm run build` — без ошибок
- [ ] Политика конфиденциальности согласована юристом
- [ ] Фотографии заменены реальными
- [ ] Аналитика подключена
- [ ] Сайт добавлен в Яндекс Вебмастер и GSC
