import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from './Icons'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const navigation = [
  { to: '/rooms', label: 'Stay' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/restaurant', label: 'Sole' },
  { to: '/story', label: 'Our story' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const solid = !isHome || scrolled || menuOpen

  return (
    <header className={`site-header${solid ? ' site-header--solid' : ''}`}>
      <div className="site-header__inner">
        <button
          className="header-menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <Logo light={!solid} onClick={() => setMenuOpen(false)} />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="header-book" to="/contact?intent=booking">
          Book your stay
        </Link>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                >
                  <NavLink to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
              >
                <Link to="/contact?intent=booking" onClick={() => setMenuOpen(false)}>Book your stay</Link>
              </motion.div>
            </nav>
            <div className="mobile-menu__footer">
              <span>Costa Serena, Mediterranean</span>
              <a href="mailto:stay@casasole.example">stay@casasole.example</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
