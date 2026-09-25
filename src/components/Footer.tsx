import { ArrowUpRight, Camera } from './Icons'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <span className="eyebrow eyebrow--light">Letters from the coast</span>
          <h2>A little sun,<br />delivered slowly.</h2>
        </div>
        <form className="newsletter" onSubmit={handleSubmit}>
          <label htmlFor="footer-email">Notes on new rooms, seasonal tables and quiet places.</label>
          <div className="newsletter__field">
            <input id="footer-email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe">
              {subscribed ? 'Thank you' : <ArrowUpRight size={20} />}
            </button>
          </div>
          <span className="newsletter__status" aria-live="polite">
            {subscribed ? 'You’re on the list. See you by the sea.' : 'One thoughtful note a month. No noise.'}
          </span>
        </form>
      </div>

      <div className="site-footer__links">
        <div className="footer-brand">
          <Logo light />
          <p>An eighteen-room retreat shaped by salt air, long lunches and the quiet luxury of nowhere else to be.</p>
        </div>
        <div>
          <span>Explore</span>
          <Link to="/rooms">Rooms & suites</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/restaurant">Restaurant Sole</Link>
          <Link to="/story">Our story</Link>
        </div>
        <div>
          <span>Visit</span>
          <a href="mailto:stay@casasole.example">stay@casasole.example</a>
          <a href="tel:+390000000000">+39 000 000 0000</a>
          <p>Via del Faro 18<br />Costa Serena, Italia</p>
        </div>
        <div>
          <span>Follow</span>
          <a className="footer-social" href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <Camera size={15} /> Instagram
          </a>
          <Link to="/contact">Contact</Link>
          <Link to="/contact#faqs">FAQs</Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Casa Solé</span>
        <span>Concept experience · No real reservations are made</span>
        <div>
          <a href="#privacy">Privacy</a>
          <a href="#accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  )
}
