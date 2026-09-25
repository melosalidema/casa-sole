import { expect, test } from '@playwright/test'

test('homepage presents the brand and booking entry point', async ({ page, isMobile }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /find your own pace by the sea/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /check availability/i })).toBeVisible()
  if (!isMobile) {
    await expect(page.getByText(/eighteen rooms carved into the coast/i)).toBeVisible()
  }
})

test('guest can complete the direct booking journey', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Check in').fill('2030-04-10')
  await page.getByLabel('Check out').fill('2030-04-13')
  await page.getByRole('button', { name: /check availability/i }).click()

  const dialog = page.getByRole('dialog', { name: /request your room by the sea/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(/2030-04-10.*2030-04-13/)).toBeVisible()
  await dialog.getByLabel(/your name/i).fill('Alex Morgan')
  await dialog.getByLabel(/email address/i).fill('alex@example.com')
  await dialog.getByText(/I understand this is a concept demo/).click()
  await expect(dialog.getByRole('checkbox')).toBeChecked()
  await dialog.getByRole('button', { name: /send booking request/i }).click()

  await expect(dialog.getByText(/request received/i)).toBeVisible()
  await expect(dialog.getByText(/no real reservation/i)).toBeVisible()
})

test('all primary content routes load', async ({ page }) => {
  const routes = [
    ['/rooms', /your own corner of the coast/i],
    ['/experiences', /follow the light/i],
    ['/restaurant', /dinner by the last light/i],
    ['/story', /a house built around the light/i],
    ['/contact', /we’re here when you need us/i],
  ] as const

  for (const [route, heading] of routes) {
    await page.goto(route)
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()
  }
})

test('primary routes avoid horizontal overflow and broken imagery', async ({ page }) => {
  const routes = ['/', '/rooms', '/rooms/classic', '/experiences', '/restaurant', '/story', '/contact']
  for (const route of routes) {
    await page.goto(route)
    await page.waitForLoadState('networkidle')
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
    const brokenImages = await page.evaluate(() => Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src))
    expect(hasOverflow, `${route} has horizontal overflow`).toBe(false)
    expect(brokenImages, `${route} has broken images`).toEqual([])
  }
})

test('restaurant menu categories are interactive', async ({ page }) => {
  await page.goto('/restaurant')
  await page.getByRole('tab', { name: 'Dessert' }).click()
  await expect(page.getByRole('heading', { name: 'Tiramisu' })).toBeVisible()
  await expect(page.getByText(/blood orange/i)).toBeVisible()
})

test('mobile navigation exposes every destination', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation assertion')
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(menu.getByRole('link', { name: 'Stay', exact: true })).toBeVisible()
  await menu.getByRole('link', { name: 'Experiences' }).click()
  await expect(page).toHaveURL(/\/experiences/)
  await expect(page.getByRole('heading', { name: /follow the light/i })).toBeVisible()
})

test('unknown routes show the branded recovery page', async ({ page }) => {
  await page.goto('/somewhere-by-the-sea')
  await expect(page.getByRole('heading', { name: /this path leads back to the sea/i })).toBeVisible()
  await page.getByRole('link', { name: /return home/i }).click()
  await expect(page).toHaveURL('/')
})
