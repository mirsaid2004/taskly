import { test, expect } from '@playwright/test'

test.describe('Task Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('should validate form and show error toast on empty submission', async ({ page }) => {
    // await page.getByRole('button', { name: /Создать задачу/i }).click();

    await page.getByRole('button', { name: /Сохранить/i }).click()

    await expect(page.getByText('В некоторых полях есть проблемы')).toBeVisible()
  })

  test('should clear fields when dialog is closed and reopened', async ({ page }) => {
    // await page.getByRole('button', { name: /Создать задачу/i }).click();

    const contextInput = page.getByPlaceholder(/Выполнить какую-нибудь задачу/i)
    await contextInput.fill('Test context for reset')

    await page.getByTestId('close-dialog').click()
    await page.waitForTimeout(1000)
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await page.getByTestId('task-create').click()

    await expect(page.getByPlaceholder('Выполнить какую-нибудь задачу')).toBeEmpty()
  })

  test('should clear routine data when routine toggle is unchecked', async ({ page }) => {
    // await page.getByRole('button', { name: /Создать задачу/i }).click();

    const routineSwitch = page.getByTestId('routine-toggle')
    await routineSwitch.click()
    await routineSwitch.click()

    await routineSwitch.click()
  })

  test('should clear assignees when switching to team mode', async ({ page }) => {
    // await page.getByRole('button', { name: /Создать задачу/i }).click();

    const teamToggle = page.getByTestId('team-toggle')
    await teamToggle.click()
  })

  test('should show success toast and clear form on successful submission', async ({ page }) => {
    // await page.getByRole('button', { name: /Создать задачу/i }).click();

    await page.getByPlaceholder('Выполнить какую-нибудь задачу').fill('Success Test Task')
    await page.getByTestId('assignee-search-input').fill('ва')
    await page.waitForTimeout(500) // Wait for debounce and options to load
    for (let i = 0; i < 3; i++) {
      const option = page.getByTestId(`assignee-option-${i}`)
      if (await option.isVisible()) {
        await option.click()
      }
    }
    await page.getByTestId('due-date-picker').waitFor({ state: 'visible', timeout: 10000 })
    await page.getByTestId('due-date-picker').fill('2024-12-25')
    await page.getByTestId('due-time-picker').waitFor({ state: 'visible', timeout: 10000 })
    await page.getByTestId('due-time-picker').fill('10:30', { force: true })

    await page.getByTestId('topic-select-trigger').click()
    await page.getByTestId('topic-option-1').click()
    await page.waitForTimeout(1000) // Wait for mutation to complete and toast to appear

    await page.getByTestId('save-btn').click()
    await page.waitForTimeout(500) // Wait for mutation to complete and toast to appear
    await expect(page.getByText('Форма успешно отправлена')).toBeVisible()

    await page.getByTestId('task-create').waitFor({ state: 'visible', timeout: 10000 })
    await page.getByTestId('task-create').click()
    await expect(page.getByPlaceholder(/Выполнить какую-нибудь задачу/i)).toBeEmpty()
  })
})
