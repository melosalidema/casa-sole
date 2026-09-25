export interface ContactInquiry {
  id: string
  name: string
  email: string
  interest: string
  message: string
  createdAt: string
}

const CONTACT_STORAGE_KEY = 'casa-sole-contact-inquiries'

export function saveContactInquiry(inquiry: ContactInquiry): void {
  try {
    if (typeof localStorage === 'undefined') return
    const current = readContactInquiries()
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify([...current, inquiry]))
  } catch {
    return
  }
}

export function getContactInquiries(): ContactInquiry[] {
  return readContactInquiries()
}

function readContactInquiries(): ContactInquiry[] {
  try {
    if (typeof localStorage === 'undefined') return []
    const value: unknown = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter(isContactInquiry)
  } catch {
    return []
  }
}

function isContactInquiry(value: unknown): value is ContactInquiry {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.email === 'string' &&
    typeof record.interest === 'string' &&
    typeof record.message === 'string' &&
    typeof record.createdAt === 'string'
  )
}
