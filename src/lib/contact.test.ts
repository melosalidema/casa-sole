import { beforeEach, describe, expect, it } from 'vitest'
import { getContactInquiries, saveContactInquiry } from './contact'

const inquiry = {
  id: 'contact-1',
  name: 'Mina Bell',
  email: 'mina@example.com',
  interest: 'Restaurant table',
  message: 'A quiet table for two, please.',
  createdAt: '2026-09-24T10:00:00.000Z',
}

beforeEach(() => {
  localStorage.clear()
})

describe('contact enquiry persistence', () => {
  it('saves and retrieves contact enquiries', () => {
    saveContactInquiry(inquiry)
    expect(getContactInquiries()).toEqual([inquiry])
  })

  it('appends inquiries in insertion order', () => {
    saveContactInquiry(inquiry)
    saveContactInquiry({ ...inquiry, id: 'contact-2' })
    expect(getContactInquiries().map((item) => item.id)).toEqual(['contact-1', 'contact-2'])
  })

  it('recovers from malformed storage', () => {
    localStorage.setItem('casa-sole-contact-inquiries', '{broken')
    expect(getContactInquiries()).toEqual([])
  })

  it('filters invalid stored records', () => {
    localStorage.setItem('casa-sole-contact-inquiries', JSON.stringify([{ id: 'incomplete' }, inquiry]))
    expect(getContactInquiries()).toEqual([inquiry])
  })
})
