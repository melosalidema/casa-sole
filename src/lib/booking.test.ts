import { beforeEach, describe, expect, it } from 'vitest'
import '../test/setup'
import { rooms } from '../data/hotel'
import {
  addDays,
  calculateQuote,
  differenceInNights,
  enumerateNights,
  findAlternativeRange,
  formatDate,
  getInquiries,
  isDateRangeAvailable,
  parseLocalDate,
  saveInquiry,
  STORAGE_KEY,
} from './booking'
import type { Inquiry } from './booking'

class MemoryStorage {
  private data = new Map<string, string>()

  get length(): number {
    return this.data.size
  }

  clear(): void {
    this.data.clear()
  }

  getItem(key: string): string | null {
    const value = this.data.get(key)
    return value === undefined ? null : value
  }

  key(index: number): string | null {
    const keys = Array.from(this.data.keys())
    return keys.at(index) ?? null
  }

  removeItem(key: string): void {
    this.data.delete(key)
  }

  setItem(key: string, value: string): void {
    this.data.set(key, String(value))
  }
}

function installStorage(storage: unknown): void {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    writable: true,
    value: storage,
  })
}

const inquiryFixture: Inquiry = {
  id: 'inquiry-1',
  roomId: 'classic',
  checkIn: '2026-10-01',
  checkOut: '2026-10-03',
  adults: 2,
  children: 1,
  createdAt: '2026-09-24T10:00:00.000Z',
}

beforeEach(() => {
  installStorage(new MemoryStorage())
})

describe('parseLocalDate', () => {
  it('parses a valid date as UTC midnight', () => {
    const date = parseLocalDate('2026-07-04')
    expect(date.getUTCFullYear()).toBe(2026)
    expect(date.getUTCMonth()).toBe(6)
    expect(date.getUTCDate()).toBe(4)
    expect(date.getUTCHours()).toBe(0)
  })

  it('rejects impossible calendar dates', () => {
    expect(() => parseLocalDate('2026-02-30')).toThrow()
    expect(() => parseLocalDate('2026-13-01')).toThrow()
    expect(() => parseLocalDate('2026-00-10')).toThrow()
  })

  it('rejects malformed date strings', () => {
    expect(() => parseLocalDate('not-a-date')).toThrow()
    expect(() => parseLocalDate('')).toThrow()
    expect(() => parseLocalDate('2026/10/01')).toThrow()
    expect(() => parseLocalDate('2026-1-1')).toThrow()
  })

  it('accepts valid leap days and rejects invalid ones', () => {
    expect(parseLocalDate('2024-02-29').getUTCDate()).toBe(29)
    expect(() => parseLocalDate('2026-02-29')).toThrow()
  })
})

describe('differenceInNights', () => {
  it('returns zero for the same day', () => {
    expect(differenceInNights('2026-10-01', '2026-10-01')).toBe(0)
  })

  it('counts consecutive nights', () => {
    expect(differenceInNights('2026-10-01', '2026-10-02')).toBe(1)
    expect(differenceInNights('2026-10-01', '2026-10-05')).toBe(4)
  })

  it('crosses month and year boundaries', () => {
    expect(differenceInNights('2026-01-31', '2026-02-01')).toBe(1)
    expect(differenceInNights('2026-01-31', '2026-02-28')).toBe(28)
    expect(differenceInNights('2026-12-31', '2027-01-01')).toBe(1)
  })

  it('handles leap year boundaries', () => {
    expect(differenceInNights('2024-02-28', '2024-03-01')).toBe(2)
    expect(differenceInNights('2026-02-28', '2026-03-01')).toBe(1)
  })

  it('returns a negative value for a reversed range', () => {
    expect(differenceInNights('2026-10-03', '2026-10-01')).toBe(-2)
  })
})

describe('addDays', () => {
  it('adds days across month and year boundaries in UTC', () => {
    expect(formatDate(addDays(parseLocalDate('2026-10-31'), 1))).toBe('2026-11-01')
    expect(formatDate(addDays(parseLocalDate('2026-12-31'), 1))).toBe('2027-01-01')
    expect(formatDate(addDays(parseLocalDate('2024-02-28'), 1))).toBe('2024-02-29')
    expect(formatDate(addDays(parseLocalDate('2026-02-28'), 1))).toBe('2026-03-01')
  })
})

describe('formatDate', () => {
  it('formats dates as padded YYYY-MM-DD', () => {
    expect(formatDate(parseLocalDate('2026-01-05'))).toBe('2026-01-05')
    expect(formatDate('2026-11-09')).toBe('2026-11-09')
    expect(formatDate(parseLocalDate('2026-12-31'))).toBe('2026-12-31')
  })
})

describe('enumerateNights', () => {
  it('lists every occupied night across a month boundary', () => {
    expect(enumerateNights('2026-01-30', '2026-02-01')).toEqual(['2026-01-30', '2026-01-31'])
    expect(enumerateNights('2026-10-01', '2026-10-03')).toEqual(['2026-10-01', '2026-10-02'])
  })

  it('returns an empty array for a reversed range', () => {
    expect(enumerateNights('2026-10-03', '2026-10-01')).toEqual([])
  })
})

describe('seeded data', () => {
  it('exposes three rooms with the expected slugs and base pricing', () => {
    expect(rooms.map((room) => room.slug)).toEqual(['classic', 'deluxe', 'sea-view-suite'])
    expect(rooms.find((room) => room.slug === 'classic')?.price).toBe(290)
    expect(rooms.find((room) => room.slug === 'deluxe')?.price).toBe(380)
    expect(rooms.find((room) => room.slug === 'sea-view-suite')?.price).toBe(520)
  })

  it('uses verified images.unsplash.com URLs for all room imagery', () => {
    for (const room of rooms) {
      for (const url of [...room.images, ...room.gallery]) {
        expect(url.startsWith('https://images.unsplash.com/')).toBe(true)
      }
    }
  })
})

describe('isDateRangeAvailable', () => {
  it('accepts a free seeded range', () => {
    expect(isDateRangeAvailable('classic', '2026-10-01', '2026-10-03')).toBe(true)
    expect(isDateRangeAvailable('deluxe', '2026-10-01', '2026-10-04')).toBe(true)
    expect(isDateRangeAvailable('sea-view-suite', '2026-11-10', '2026-11-13')).toBe(true)
  })

  it('rejects any range containing a seeded occupied night', () => {
    expect(isDateRangeAvailable('classic', '2026-10-15', '2026-10-16')).toBe(false)
    expect(isDateRangeAvailable('classic', '2026-10-14', '2026-10-17')).toBe(false)
    expect(isDateRangeAvailable('deluxe', '2026-10-20', '2026-10-21')).toBe(false)
    expect(isDateRangeAvailable('sea-view-suite', '2026-11-01', '2026-11-02')).toBe(false)
  })

  it('rejects reversed ranges', () => {
    expect(isDateRangeAvailable('classic', '2026-10-03', '2026-10-01')).toBe(false)
  })

  it('rejects ranges longer than the maximum stay', () => {
    expect(isDateRangeAvailable('classic', '2026-10-01', '2026-11-01')).toBe(false)
  })

  it('rejects invalid dates and unknown rooms', () => {
    expect(isDateRangeAvailable('classic', 'not-a-date', '2026-10-03')).toBe(false)
    expect(isDateRangeAvailable('classic', '2026-10-01', '2026-13-01')).toBe(false)
    expect(isDateRangeAvailable('unknown-room', '2026-10-01', '2026-10-03')).toBe(false)
  })
})

describe('calculateQuote', () => {
  it('returns the full pricing breakdown for an available stay', () => {
    const quote = calculateQuote('classic', '2026-10-01', '2026-10-03', 2, 0)
    expect(quote.available).toBe(true)
    expect(quote.nights).toBe(2)
    expect(quote.nightlyRate).toBe(290)
    expect(quote.subtotal).toBe(580)
    expect(quote.taxes).toBe(69.6)
    expect(quote.total).toBe(649.6)
    expect(quote.currency).toBe('EUR')
    expect(quote.suggestion).toBeUndefined()
  })

  it('charges extra adults beyond the room base capacity', () => {
    const quote = calculateQuote('classic', '2026-10-01', '2026-10-03', 3, 0)
    expect(quote.nightlyRate).toBe(330)
    expect(quote.subtotal).toBe(660)
    const deluxe = calculateQuote('deluxe', '2026-10-01', '2026-10-04', 4, 0)
    expect(deluxe.nightlyRate).toBe(420)
  })

  it('charges extra children beyond the room base capacity', () => {
    const quote = calculateQuote('deluxe', '2026-10-01', '2026-10-04', 2, 2)
    expect(quote.nightlyRate).toBe(400)
    const classic = calculateQuote('classic', '2026-10-01', '2026-10-03', 2, 2)
    expect(classic.nightlyRate).toBe(330)
  })

  it('marks unavailable ranges and provides a suggestion', () => {
    const quote = calculateQuote('classic', '2026-10-15', '2026-10-16', 2, 0)
    expect(quote.available).toBe(false)
    expect(quote.nights).toBe(1)
    expect(quote.suggestion).toContain('2026-10-18')
  })

  it('rejects reversed ranges', () => {
    const quote = calculateQuote('classic', '2026-10-03', '2026-10-01', 2, 0)
    expect(quote.available).toBe(false)
  })

  it('rejects stays longer than the maximum', () => {
    const quote = calculateQuote('classic', '2026-10-01', '2026-11-01', 2, 0)
    expect(quote.available).toBe(false)
    expect(quote.suggestion).toContain('30')
  })

  it('rejects invalid date strings', () => {
    const quote = calculateQuote('classic', 'not-a-date', '2026-10-03', 2, 0)
    expect(quote.available).toBe(false)
  })

  it('guards zero, negative and fractional guest counts', () => {
    expect(calculateQuote('classic', '2026-10-01', '2026-10-03', 0, 0).available).toBe(false)
    expect(calculateQuote('classic', '2026-10-01', '2026-10-03', -1, 0).available).toBe(false)
    expect(calculateQuote('classic', '2026-10-01', '2026-10-03', 2, -1).available).toBe(false)
    expect(calculateQuote('classic', '2026-10-01', '2026-10-03', 2.5, 0).available).toBe(false)
    expect(calculateQuote('classic', '2026-10-01', '2026-10-03', 1, 0).available).toBe(true)
  })

  it('never produces negative money values', () => {
    const quote = calculateQuote('classic', '2026-10-01', '2026-10-03', 2, 0)
    expect(quote.nightlyRate).toBeGreaterThanOrEqual(0)
    expect(quote.subtotal).toBeGreaterThanOrEqual(0)
    expect(quote.taxes).toBeGreaterThanOrEqual(0)
    expect(quote.total).toBeGreaterThanOrEqual(0)
  })
})

describe('findAlternativeRange', () => {
  it('returns the nearest fully available window of equal length', () => {
    expect(findAlternativeRange('classic', '2026-10-15', '2026-10-16')).toEqual({
      checkIn: '2026-10-18',
      checkOut: '2026-10-19',
    })
  })

  it('returns null for unknown rooms and invalid dates', () => {
    expect(findAlternativeRange('unknown-room', '2026-10-15', '2026-10-16')).toBeNull()
    expect(findAlternativeRange('classic', 'bad', '2026-10-16')).toBeNull()
  })
})

describe('inquiry persistence', () => {
  it('saves an inquiry and reads it back unchanged', () => {
    saveInquiry(inquiryFixture)
    const inquiries = getInquiries()
    expect(inquiries).toHaveLength(1)
    expect(inquiries[0]).toEqual(inquiryFixture)
  })

  it('appends multiple inquiries in order', () => {
    saveInquiry(inquiryFixture)
    saveInquiry({ ...inquiryFixture, id: 'inquiry-2' })
    const inquiries = getInquiries()
    expect(inquiries).toHaveLength(2)
    expect(inquiries[1].id).toBe('inquiry-2')
  })

  it('ignores corrupt stored JSON', () => {
    const storage = globalThis.localStorage as unknown as Storage
    storage.setItem(STORAGE_KEY, '{corrupt json')
    expect(getInquiries()).toEqual([])
  })

  it('ignores non-array payloads and invalid entries', () => {
    const storage = globalThis.localStorage as unknown as Storage
    storage.setItem(STORAGE_KEY, JSON.stringify({ id: 'x' }))
    expect(getInquiries()).toEqual([])
    storage.setItem(STORAGE_KEY, JSON.stringify([{ id: 'incomplete' }, inquiryFixture]))
    expect(getInquiries()).toEqual([inquiryFixture])
  })

  it('stays safe when storage is unavailable', () => {
    delete (globalThis as unknown as Record<string, unknown>).localStorage
    expect(getInquiries()).toEqual([])
    expect(() => saveInquiry(inquiryFixture)).not.toThrow()
  })

  it('stays safe when the storage backend throws', () => {
    installStorage({
      getItem: () => null,
      setItem: () => {
        throw new Error('quota exceeded')
      },
    })
    expect(getInquiries()).toEqual([])
    expect(() => saveInquiry(inquiryFixture)).not.toThrow()
  })
})