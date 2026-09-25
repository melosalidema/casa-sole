import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, ChevronDown, Minus, Plus, Users, X } from './Icons'
import { type FormEvent, useMemo, useState } from 'react'
import { rooms } from '../data/hotel'
import { addDays, calculateQuote, formatDate, saveInquiry } from '../lib/booking'

interface BookingWidgetProps {
  initialRoomId?: string
  placement?: 'hero' | 'inline' | 'sidebar'
}

const euro = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export function BookingWidget({ initialRoomId = 'classic', placement = 'inline' }: BookingWidgetProps) {
  const [roomId, setRoomId] = useState(initialRoomId)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [guestMenuOpen, setGuestMenuOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')

  const selectedRoom = rooms.find((room) => room.slug === roomId) ?? rooms[0]
  const minCheckout = checkIn ? formatDate(addDays(new Date(`${checkIn}T00:00:00Z`), 1)) : ''
  const quote = useMemo(
    () => calculateQuote(roomId, checkIn, checkOut, adults, children),
    [roomId, checkIn, checkOut, adults, children],
  )
  const hasDates = checkIn !== '' && checkOut !== ''

  const openBooking = () => {
    if (!hasDates) {
      setError('Choose your arrival and departure dates to continue.')
      return
    }
    if (quote.nights < 1) {
      setError('Departure must be at least one night after arrival.')
      return
    }
    if (!quote.available) {
      setError(quote.suggestion ?? 'This room is not available for those dates.')
      return
    }
    setError('')
    setConfirmed(false)
    setBookingOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeBooking = () => {
    setBookingOpen(false)
    setError('')
    document.body.style.overflow = ''
  }

  const updateCheckIn = (value: string) => {
    setCheckIn(value)
    setError('')
    if (value !== '' && checkOut !== '' && checkOut <= value) {
      setCheckOut('')
    }
  }

  const updateCheckOut = (value: string) => {
    setCheckOut(value)
    setError('')
  }

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity() || !quote.available) {
      return
    }
    const code = `CS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    saveInquiry({
      id: crypto.randomUUID(),
      roomId,
      checkIn,
      checkOut,
      adults,
      children,
      createdAt: new Date().toISOString(),
      total: quote.total,
    })
    setConfirmationCode(code)
    setConfirmed(true)
  }

  return (
    <>
      <div className={`booking-widget booking-widget--${placement}`} id="book">
        <div className="booking-widget__field booking-widget__room">
          <label htmlFor={`room-${placement}`}>Room</label>
          <div className="select-wrap">
            <select id={`room-${placement}`} value={roomId} onChange={(event) => setRoomId(event.target.value)}>
              {rooms.map((room) => (
                <option key={room.slug} value={room.slug}>
                  {room.name} · from {euro.format(room.price)}
                </option>
              ))}
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </div>
        </div>

        <div className="booking-widget__field">
          <label htmlFor={`check-in-${placement}`}>Check in</label>
          <div className="date-wrap">
            <CalendarDays size={15} aria-hidden="true" />
            <input
              id={`check-in-${placement}`}
              type="date"
              value={checkIn}
              min={formatDate(new Date())}
              onChange={(event) => updateCheckIn(event.target.value)}
            />
          </div>
        </div>

        <div className="booking-widget__field">
          <label htmlFor={`check-out-${placement}`}>Check out</label>
          <div className="date-wrap">
            <CalendarDays size={15} aria-hidden="true" />
            <input
              id={`check-out-${placement}`}
              type="date"
              value={checkOut}
              min={minCheckout || formatDate(addDays(new Date(), 1))}
              onChange={(event) => updateCheckOut(event.target.value)}
            />
          </div>
        </div>

        <div className="booking-widget__field booking-widget__guests">
          <span className="booking-label">Guests</span>
          <button type="button" className="guest-trigger" onClick={() => setGuestMenuOpen((open) => !open)} aria-expanded={guestMenuOpen}>
            <Users size={15} aria-hidden="true" />
            <span>{adults + children} {adults + children === 1 ? 'guest' : 'guests'}</span>
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {guestMenuOpen && (
            <div className="guest-menu">
              <GuestCounter label="Adults" detail="Ages 13+" value={adults} minimum={1} onChange={setAdults} />
              <GuestCounter label="Children" detail="Ages 0–12" value={children} minimum={0} onChange={setChildren} />
              <button type="button" className="guest-menu__done" onClick={() => setGuestMenuOpen(false)}>Done</button>
            </div>
          )}
        </div>

        <button className="booking-widget__submit" type="button" onClick={openBooking}>
          <span>Check availability</span>
          <ArrowRight size={18} />
        </button>

        {error && <p className="booking-widget__error" role="alert">{error}</p>}
        {hasDates && quote.available && quote.nights > 0 && (
          <p className="booking-widget__rate" aria-live="polite">
            {selectedRoom.name} · {quote.nights} {quote.nights === 1 ? 'night' : 'nights'} · {euro.format(quote.total)} total
          </p>
        )}
      </div>

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            className="booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeBooking()
            }}
          >
            <motion.section
              className="booking-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Request your room by the sea"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="booking-sheet__close" type="button" onClick={closeBooking} aria-label="Close booking">
                <X size={20} />
              </button>
              {!confirmed ? (
                <>
                  <span className="eyebrow">Your stay, considered</span>
                  <h2 id="booking-title">Request your room<br />by the sea.</h2>
                  <div className="booking-summary">
                    <img src={selectedRoom.images[0]} alt="" />
                    <div>
                      <strong>{selectedRoom.name}</strong>
                      <span>{selectedRoom.size} m² · {selectedRoom.bed} bed</span>
                      <span>{formatDate(checkIn)} — {formatDate(checkOut)}</span>
                      <span>{adults + children} {adults + children === 1 ? 'guest' : 'guests'}</span>
                    </div>
                    <strong>{euro.format(quote.total)}</strong>
                  </div>
                  <div className="booking-price-breakdown">
                    <span>{euro.format(quote.subtotal)} room + taxes</span>
                    <span>{euro.format(quote.taxes)} local taxes</span>
                  </div>
                  <form className="inquiry-form inquiry-form--sheet" onSubmit={submitInquiry}>
                    <div className="form-row">
                      <label>
                        Your name
                        <input type="text" autoComplete="name" required />
                      </label>
                      <label>
                        Email address
                        <input type="email" autoComplete="email" required />
                      </label>
                    </div>
                    <label>
                      Anything we should know?
                      <textarea rows={2} placeholder="Celebrations, arrival time or dietary notes" />
                    </label>
                    <label className="form-check">
                      <input type="checkbox" required />
                      <span>I understand this is a concept demo and no real reservation or payment is made.</span>
                    </label>
                    <button className="button button--dark button--full" type="submit">
                      Send booking request <ArrowRight size={17} />
                    </button>
                  </form>
                </>
              ) : (
                <motion.div className="booking-confirmation" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="booking-confirmation__icon"><Check size={28} /></span>
                  <span className="eyebrow">Request received</span>
                  <h2 id="booking-title">The sea will be<br />waiting for you.</h2>
                  <p>Your concept booking request has been saved on this device. No payment has been taken and no real reservation has been made.</p>
                  <div className="confirmation-code">
                    <span>Reference</span>
                    <strong>{confirmationCode}</strong>
                  </div>
                  <button className="button button--dark" type="button" onClick={closeBooking}>Continue exploring</button>
                </motion.div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface GuestCounterProps {
  label: string
  detail: string
  value: number
  minimum: number
  onChange: (value: number) => void
}

function GuestCounter({ label, detail, value, minimum, onChange }: GuestCounterProps) {
  return (
    <div className="guest-counter">
      <div>
        <span>{label}</span>
        <small>{detail}</small>
      </div>
      <div>
        <button type="button" onClick={() => onChange(Math.max(minimum, value - 1))} aria-label={`Remove one ${label.toLowerCase()}`} disabled={value <= minimum}>
          <Minus size={14} />
        </button>
        <span aria-live="polite">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(8, value + 1))} aria-label={`Add one ${label.toLowerCase()}`}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
