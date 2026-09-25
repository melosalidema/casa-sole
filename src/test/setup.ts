import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = [0]
  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] { return [] }
  unobserve(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: IntersectionObserverMock,
})

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: vi.fn(),
})
