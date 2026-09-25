import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from './App'
import { STORAGE_KEY } from './lib/booking'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  localStorage.clear()
  Object.defineProperty(crypto, 'randomUUID', {
    configurable: true,
    value: vi.fn(() => 'test-booking-id'),
  })
})

afterEach(() => {
  cleanup()
})

describe('Casa Solé application', () => {
  it('renders the immersive homepage and primary booking widget', () => {
    renderApp()
    expect(screen.getByRole('heading', { name: /find your own pace by the sea/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /check availability/i })).toBeInTheDocument()
    expect(screen.getByText(/eighteen rooms carved into the coast/i)).toBeInTheDocument()
  })

  it('navigates to room details and reflects the selected room', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getAllByRole('link', { name: /classic room/i })[0])
    expect(await screen.findByRole('heading', { name: 'Classic Room', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Room' })).toHaveValue('classic')
    expect(screen.getByText(/32 m²/i)).toBeInTheDocument()
  })

  it('completes and persists a direct booking request', async () => {
    const user = userEvent.setup()
    renderApp()

    fireEvent.change(screen.getByLabelText('Check in'), { target: { value: '2030-04-10' } })
    fireEvent.change(screen.getByLabelText('Check out'), { target: { value: '2030-04-13' } })
    await user.click(screen.getByRole('button', { name: /check availability/i }))

    const dialog = await screen.findByRole('dialog', { name: /request your room by the sea/i })
    expect(within(dialog).getByText(/2030-04-10.*2030-04-13/i)).toBeInTheDocument()
    await user.type(within(dialog).getByLabelText(/your name/i), 'Alex Morgan')
    await user.type(within(dialog).getByLabelText(/email address/i), 'alex@example.com')
    await user.click(within(dialog).getByRole('checkbox'))
    await user.click(within(dialog).getByRole('button', { name: /send booking request/i }))

    expect(await within(dialog).findByText(/request received/i)).toBeInTheDocument()
    expect(within(dialog).getByText(/no real reservation/i)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toHaveLength(1)
  })

  it('switches restaurant menus and stores a contact enquiry', async () => {
    const user = userEvent.setup()
    renderApp('/restaurant')

    await user.click(screen.getByRole('tab', { name: 'Dessert' }))
    expect(screen.getByRole('heading', { name: 'Tiramisu' })).toBeInTheDocument()

    cleanup()
    renderApp('/contact')
    await user.type(screen.getByLabelText(/your name/i), 'Mina Bell')
    await user.type(screen.getByLabelText(/email address/i), 'mina@example.com')
    await user.type(screen.getByLabelText(/your message/i), 'We would love a quiet table for dinner.')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /send your note/i }))

    expect(await screen.findByText(/message received/i)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('casa-sole-contact-inquiries') ?? '[]')).toHaveLength(1)
  })

  it('opens FAQ answers and redirects unknown room slugs safely', async () => {
    const user = userEvent.setup()
    renderApp('/contact#faqs')
    const firstFaqButton = screen.getByRole('button', { name: /how do i get to casa solé/i })
    expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true')
    await user.click(firstFaqButton)
    expect(firstFaqButton).toHaveAttribute('aria-expanded', 'false')
    const secondFaqButton = screen.getByRole('button', { name: /what is your cancellation policy/i })
    await user.click(secondFaqButton)
    expect(secondFaqButton).toHaveAttribute('aria-expanded', 'true')

    cleanup()
    renderApp('/rooms/not-a-room')
    expect(await screen.findByRole('heading', { name: /your own corner.*coast/i, level: 1 })).toBeInTheDocument()
  })
})
