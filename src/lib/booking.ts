import { getRoomBySlug } from '../data/hotel'

export const TAX_RATE = 0.12
export const MAX_STAY_NIGHTS = 30
export const MAX_SUGGESTION_WINDOW_DAYS = 60
export const EXTRA_ADULT_RATE = 40
export const EXTRA_CHILD_RATE = 20
export const STORAGE_KEY = 'casa-sole-inquiries'

const MS_PER_DAY = 86_400_000
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

export function parseLocalDate(date: string): Date {
  const match = DATE_PATTERN.exec(date)
  if (match === null) {
    throw new RangeError('Date must use the YYYY-MM-DD format')
  }
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new RangeError('Date does not exist on the calendar')
  }
  return parsed
}

export function isValidDateString(date: string): boolean {
  try {
    parseLocalDate(date)
    return true
  } catch {
    return false
  }
}

export function addDays(date: Date, amount: number): Date {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + amount)
  return result
}

export function differenceInNights(checkIn: string, checkOut: string): number {
  const start = parseLocalDate(checkIn)
  const end = parseLocalDate(checkOut)
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY)
}

export function enumerateNights(checkIn: string, checkOut: string): string[] {
  const nights = differenceInNights(checkIn, checkOut)
  if (nights < 1) {
    return []
  }
  const start = parseLocalDate(checkIn)
  const result: string[] = []
  for (let index = 0; index < nights; index++) {
    result.push(formatDate(addDays(start, index)))
  }
  return result
}

export function formatDate(date: Date | string): string {
  const value = typeof date === 'string' ? parseLocalDate(date) : date
  const year = value.getUTCFullYear()
  const month = String(value.getUTCMonth() + 1).padStart(2, '0')
  const day = String(value.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function isDateRangeAvailable(roomId: string, checkIn: string, checkOut: string): boolean {
  const room = getRoomBySlug(roomId)
  if (room === undefined) {
    return false
  }
  if (!isValidDateString(checkIn) || !isValidDateString(checkOut)) {
    return false
  }
  const nights = differenceInNights(checkIn, checkOut)
  if (nights < 1 || nights > MAX_STAY_NIGHTS) {
    return false
  }
  const occupied = new Set(room.unavailableDates)
  return enumerateNights(checkIn, checkOut).every((night) => !occupied.has(night))
}

export function findAlternativeRange(
  roomId: string,
  checkIn: string,
  checkOut: string,
): { checkIn: string, checkOut: string } | null {
  const room = getRoomBySlug(roomId)
  if (room === undefined) {
    return null
  }
  if (!isValidDateString(checkIn) || !isValidDateString(checkOut)) {
    return null
  }
  const nights = differenceInNights(checkIn, checkOut)
  if (nights < 1 || nights > MAX_STAY_NIGHTS) {
    return null
  }
  const start = parseLocalDate(checkIn)
  const occupied = new Set(room.unavailableDates)
  for (let offset = 1; offset <= MAX_SUGGESTION_WINDOW_DAYS; offset++) {
    const candidateStart = addDays(start, offset)
    const candidateCheckIn = formatDate(candidateStart)
    const candidateCheckOut = formatDate(addDays(candidateStart, nights))
    const isFree = enumerateNights(candidateCheckIn, candidateCheckOut).every(
      (night) => !occupied.has(night),
    )
    if (isFree) {
      return { checkIn: candidateCheckIn, checkOut: candidateCheckOut }
    }
  }
  return null
}

export interface Quote {
  roomId: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  nights: number
  nightlyRate: number
  subtotal: number
  taxes: number
  total: number
  currency: 'EUR'
  available: boolean
  suggestion?: string
}

export function calculateQuote(
  roomId: string,
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number,
): Quote {
  const base: Quote = {
    roomId,
    checkIn,
    checkOut,
    adults,
    children,
    nights: 0,
    nightlyRate: 0,
    subtotal: 0,
    taxes: 0,
    total: 0,
    currency: 'EUR',
    available: false,
  }

  const room = getRoomBySlug(roomId)
  if (room === undefined) {
    return { ...base, suggestion: 'Unknown room' }
  }
  if (!isValidDateString(checkIn) || !isValidDateString(checkOut)) {
    return { ...base, suggestion: 'Check-in and check-out must be valid YYYY-MM-DD dates' }
  }
  const nights = differenceInNights(checkIn, checkOut)
  if (nights < 1) {
    return { ...base, suggestion: 'Check-out must be after check-in' }
  }
  if (nights > MAX_STAY_NIGHTS) {
    return { ...base, suggestion: `A stay cannot exceed ${MAX_STAY_NIGHTS} nights` }
  }
  if (!Number.isInteger(adults) || !Number.isInteger(children) || adults < 1 || children < 0) {
    return {
      ...base,
      suggestion: 'Adults must be a positive integer and children a non-negative integer',
    }
  }

  const occupants = adults + children
  const extraGuests = Math.max(0, occupants - room.guests)
  const extraAdults = Math.max(0, adults - room.guests)
  const extraChildren = extraGuests - extraAdults
  const nightlyRate = room.price + extraAdults * EXTRA_ADULT_RATE + extraChildren * EXTRA_CHILD_RATE

  const subtotal = roundMoney(nights * nightlyRate)
  const taxes = roundMoney(subtotal * TAX_RATE)
  const total = roundMoney(subtotal + taxes)

  const available = isDateRangeAvailable(roomId, checkIn, checkOut)
  const suggestion = available ? undefined : buildSuggestion(roomId, checkIn, checkOut)

  return {
    ...base,
    nights,
    nightlyRate,
    subtotal,
    taxes,
    total,
    available,
    suggestion,
  }
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100
}

function buildSuggestion(roomId: string, checkIn: string, checkOut: string): string {
  const alternative = findAlternativeRange(roomId, checkIn, checkOut)
  if (alternative !== null) {
    return `Unavailable for these dates. Nearest alternative: ${alternative.checkIn} to ${alternative.checkOut}`
  }
  return 'Unavailable for these dates and no alternative was found nearby'
}

export interface Inquiry {
  id: string
  roomId: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  createdAt: string
  name?: string
  email?: string
  total?: number
}

export function saveInquiry(inquiry: Inquiry): void {
  const storage = getStorage()
  if (storage === null) {
    return
  }
  try {
    const inquiries = readInquiries()
    inquiries.push(inquiry)
    storage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
  } catch {
    return
  }
}

export function getInquiries(): Inquiry[] {
  return readInquiries()
}

function readInquiries(): Inquiry[] {
  const storage = getStorage()
  if (storage === null) {
    return []
  }
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) {
      return []
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter(isInquiry)
  } catch {
    return []
  }
}

function getStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') {
      return null
    }
    return localStorage
  } catch {
    return null
  }
}

function isInquiry(value: unknown): value is Inquiry {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.roomId === 'string' &&
    typeof record.checkIn === 'string' &&
    typeof record.checkOut === 'string' &&
    typeof record.adults === 'number' &&
    typeof record.children === 'number'
  )
}