# Deployment — Документация

## Требования

- Node.js 20+
- npm 10+
- Переменные окружения из `.env.example`

---

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
# → http://localhost:3000

# Проверка TypeScript
npm run typecheck

# Линтинг
npm run lint

# Сборка для проверки
npm run build
```

---

## Production-сборка

```bash
npm run build
npm run start
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните значения.

**Обязательные перед деплоем:**

| Переменная | Описание |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Полный URL сайта (https://terminal-primorskiy.ru) |
| `FORM_ADAPTER` | `smtp`, `resend` или `webhook` |
| `SMTP_HOST` (или альтернатива) | Настройки отправки форм |
| `SMTP_TO` | Email для получения заявок |

**Опциональные:**

| Переменная | Описание |
|---|---|
| `NEXT_PUBLIC_YM_ID` | ID Яндекс Метрики |
| `NEXT_PUBLIC_GA_ID` | ID GA4 |
| `RATE_LIMIT_MAX` | Лимит форм с одного IP в час (по умолчанию: 10) |
| `MAX_FILE_SIZE` | Максимальный размер файла в байтах (по умолчанию: 5242880) |

---

## Деплой на Vercel

1. Подключить репозиторий в Vercel Dashboard
2. Указать `npm run build` как build command
3. Добавить переменные окружения в Settings → Environment Variables
4. Деплой происходит автоматически при пуше в main

---

## Деплой на VPS

```bash
# Сборка
npm run build

# Запуск через PM2
npm install -g pm2
pm2 start npm --name "terminal-primorskiy" -- start
pm2 save
pm2 startup

# Nginx reverse proxy (пример конфига)
# server {
#   listen 80;
#   server_name terminal-primorskiy.ru;
#   location / {
#     proxy_pass http://localhost:3000;
#     proxy_http_version 1.1;
#     proxy_set_header Upgrade $http_upgrade;
#     proxy_set_header Connection 'upgrade';
#     proxy_set_header Host $host;
#     proxy_cache_bypass $http_upgrade;
#   }
# }
```

---

## DNS и HTTPS

1. Настроить A-запись на IP сервера
2. Настроить CNAME для www → основного домена
3. Получить SSL-сертификат (Let's Encrypt через Certbot)
4. Убедиться, что HSTS заголовок работает (включён в middleware.ts)

---

## Чеклист перед публикацией

**Контент:**
- [ ] Все поля в `config/company.ts` заполнены
- [ ] Политика конфиденциальности согласована юристом
- [ ] Фотографии добавлены
- [ ] Аналитика настроена

**Техническое:**
- [ ] `npm run build` — без ошибок
- [ ] `npm run typecheck` — без ошибок
- [ ] `npm run lint` — без ошибок
- [ ] Формы протестированы (заявка приходит на email)
- [ ] Sitemap доступен: `https://domain.ru/sitemap.xml`
- [ ] Robots.txt: `https://domain.ru/robots.txt`
- [ ] SSL-сертификат установлен
- [ ] HTTP → HTTPS редирект работает
- [ ] OG-изображение для соцсетей добавлено

**SEO:**
- [ ] Сайт добавлен в Яндекс Вебмастер
- [ ] Сайт добавлен в Google Search Console
- [ ] Sitemap отправлен
- [ ] Яндекс Бизнес синхронизирован
- [ ] 2ГИС синхронизирован

---

## Мониторинг и резервное копирование

- Логи приложения: через PM2 (`pm2 logs`) или Vercel logs
- Мониторинг доступности: UptimeRobot, Betterstack или аналог
- Резервное копирование: автоматический бэкап через хостинг-провайдера
- Алерты форм: настроить уведомления при ошибках в email-адаптере

---

## Rollback

```bash
# Vercel: через UI → Deployments → предыдущий деплой → Redeploy

# VPS:
git checkout <previous-commit>
npm run build
pm2 restart terminal-primorskiy
```
