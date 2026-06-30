import { test, expect } from '@playwright/test'

test.describe('Главная страница', () => {
  test('H1 отображается', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('Новороссийске')
  })

  test('Нет горизонтального скролла', async ({ page }) => {
    await page.goto('/')
    const hasHorizontalScroll = await page.evaluate(
      () => document.body.scrollWidth > document.body.clientWidth
    )
    expect(hasHorizontalScroll).toBe(false)
  })

  test('Skip link присутствует', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('.skip-link')
    await expect(skipLink).toBeAttached()
  })
})

test.describe('Навигация', () => {
  test('Главное меню содержит ссылку на услуги', async ({ page }) => {
    await page.goto('/')
    const servicesLink = page.locator('header').getByRole('button', { name: /услуги/i })
    await expect(servicesLink).toBeVisible()
  })

  test('Мобильное меню открывается и закрывается', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const burger = page.locator('button[aria-controls="mobile-menu"]')
    await burger.click()

    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toBeVisible()

    await burger.click()
    await expect(mobileMenu).not.toBeVisible()
  })
})

test.describe('Страницы услуг', () => {
  test('Хранение контейнеров — breadcrumbs отображаются', async ({ page }) => {
    await page.goto('/uslugi/hranenie-konteynerov')
    const breadcrumb = page.locator('nav[aria-label*="цепочка"]')
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb).toContainText('Услуги')
  })

  test('Страница услуги содержит H1', async ({ page }) => {
    await page.goto('/uslugi/peretarka-gruzov')
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('перетарка', { ignoreCase: true })
  })
})

test.describe('Формы', () => {
  test('Быстрая форма — невалидные данные показывают ошибки', async ({ page }) => {
    await page.goto('/')

    // Scroll to form
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))

    const submitBtn = page.locator('form').filter({ hasText: 'Отправить заявку' }).first().locator('button[type="submit"]')
    await submitBtn.click()

    // Expect validation error
    await expect(page.locator('[role="alert"]').first()).toBeVisible()
  })

  test('Форма расчёта — невалидные данные показывают ошибки', async ({ page }) => {
    await page.goto('/raschet-stoimosti')
    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()
    await expect(page.locator('[role="alert"]').first()).toBeVisible()
  })
})

test.describe('Ссылки и контакты', () => {
  test('404 страница отображается', async ({ page }) => {
    await page.goto('/несуществующая-страница-xyz')
    await expect(page.locator('text=404')).toBeVisible()
  })
})

test.describe('SEO', () => {
  test('Sitemap.xml доступен', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
  })

  test('Robots.txt доступен', async ({ page }) => {
    const response = await page.request.get('/robots.txt')
    expect(response.status()).toBe(200)
  })

  test('Страница FAQ содержит JSON-LD FAQPage', async ({ page }) => {
    await page.goto('/faq')
    const jsonLd = await page.locator('script[type="application/ld+json"]').all()
    const hasSchema = await Promise.all(
      jsonLd.map(async (el) => {
        const content = await el.textContent()
        return content?.includes('FAQPage')
      })
    )
    expect(hasSchema.some(Boolean)).toBe(true)
  })
})

test.describe('Доступность', () => {
  test('Все изображения имеют alt', async ({ page }) => {
    await page.goto('/')
    const imagesWithoutAlt = await page.locator('img:not([alt])').count()
    expect(imagesWithoutAlt).toBe(0)
  })
})
