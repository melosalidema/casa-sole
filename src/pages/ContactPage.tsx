import { Check, ChevronDown, Clock3, Mail, MapPin, Phone } from '../components/Icons'
import { type FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookingWidget } from '../components/BookingWidget'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionIntro } from '../components/SectionIntro'
import { saveContactInquiry } from '../lib/contact'

const faqs = [
  {
    question: 'How do I get to Casa Solé?',
    answer: 'The nearest airport is about 38 minutes away by car. We arrange private transfers for every guest and can recommend the easiest arrival route from your flight.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'In this concept experience, cancellations are not processed. For a real stay, flexible reservations can usually be cancelled up to seven days before arrival.',
  },
  {
    question: 'Can families stay at Casa Solé?',
    answer: 'Yes. The Deluxe Room and Sea View Suite work especially well for families. Our team can arrange connecting rooms, child-friendly amenities and a cot in advance.',
  },
  {
    question: 'Are meals suitable for dietary requirements?',
    answer: 'Absolutely. Restaurant Sole is happy to adapt most dishes for vegetarian, vegan, gluten-free and allergy-related needs. Please share details when booking.',
  },
  {
    question: 'Is the hotel accessible?',
    answer: 'The main entrance, reception, restaurant and several rooms are step-free. Because Casa Solé is a restored historic house, some upper areas use stairs. Contact us for specific access needs.',
  },
]

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const initialIntent = searchParams.get('intent') ?? 'general'
  const [interest, setInterest] = useState(
    initialIntent === 'restaurant' ? 'Restaurant table' : initialIntent === 'experience' ? 'An experience' : 'General enquiry',
  )
  const [openFaq, setOpenFaq] = useState(0)
  const [sent, setSent] = useState(false)
  const showBooking = initialIntent === 'booking'
  const email = useMemo(() => 'stay@casasole.example', [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const formData = new FormData(form)
    saveContactInquiry({
      id: crypto.randomUUID(),
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      interest,
      message: String(formData.get('message') ?? ''),
      createdAt: new Date().toISOString(),
    })
    setSent(true)
  }

  return (
    <main id="content">
      <PageHero
        eyebrow="Contact · Book · Ask"
        title={<>We’re here when<br /><em>you need us.</em></>}
        description="Questions about a room, a celebration or the best path to the water? Write to the people who know this coast best."
        image="https://images.unsplash.com/photo-1690991966399-9758fdbe5794?auto=format&fit=crop&w=2400&q=88"
        imageAlt="A peaceful terrace overlooking the sea"
      />

      <section className="contact-main section-pad">
        <div className="page-container contact-main__grid">
          <Reveal className="contact-details">
            <span className="eyebrow">Find us</span>
            <h2>Between the olive<br />trees and the <em>sea.</em></h2>
            <p>Via del Faro 18<br />07020 Costa Serena<br />Mediterranean Coast, Italia</p>
            <div className="contact-details__links">
              <a href="mailto:stay@casasole.example"><Mail size={17} /><span><small>Email</small>{email}</span></a>
              <a href="tel:+390000000000"><Phone size={17} /><span><small>Call</small>+39 000 000 0000</span></a>
              <div><Clock3 size={17} /><span><small>Reception</small>Always open for our guests</span></div>
            </div>
            <div className="arrival-note">
              <MapPin size={18} />
              <p><strong>Arriving by car?</strong> We’ll send detailed directions and arrange your transfer. The final road is narrow, slow and worth it.</p>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.1}>
            {sent ? (
              <div className="contact-success" role="status">
                <span><Check size={25} /></span>
                <h2>Message received.</h2>
                <p>Your demo enquiry is safely stored on this device. No email has actually been sent, but the full booking experience works exactly as intended.</p>
                <button className="text-link" type="button" onClick={() => setSent(false)}>Send another note <ChevronDown size={15} /></button>
              </div>
            ) : (
              <>
                <span className="eyebrow">Write to us</span>
                <h2>What can we<br />arrange for you?</h2>
                <form className="inquiry-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      Your name
                      <input name="name" type="text" autoComplete="name" placeholder="First and last name" required />
                    </label>
                    <label>
                      Email address
                      <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                    </label>
                  </div>
                  <label>
                    I’m writing about
                    <select value={interest} onChange={(event) => setInterest(event.target.value)}>
                      <option>General enquiry</option>
                      <option>An experience</option>
                      <option>Restaurant table</option>
                      <option>A celebration</option>
                      <option>Accessibility</option>
                    </select>
                  </label>
                  <label>
                    Your message
                    <textarea name="message" rows={5} placeholder="Tell us a little about what you have in mind" required />
                  </label>
                  <label className="form-check">
                    <input type="checkbox" required />
                    <span>I understand this is a concept demo and no message is actually sent.</span>
                  </label>
                  <button className="button button--dark" type="submit">Send your note <span>→</span></button>
                </form>
              </>
            )}
          </Reveal>
        </div>
      </section>

      {showBooking && (
        <section className="contact-booking section-pad section-sand">
          <div className="page-container contact-booking__inner">
            <SectionIntro
              eyebrow="Book your stay"
              title={<>Let’s find your<br /><em>room by the water.</em></>}
              text="Choose a room and dates to see the demo availability, nightly price and estimated stay total."
            />
            <BookingWidget placement="inline" />
          </div>
        </section>
      )}

      <section className="contact-map section-pad">
        <div className="page-container contact-map__grid">
          <Reveal className="contact-map__visual">
            <div className="map-grid" aria-hidden="true" />
            <span className="map-coastline" aria-hidden="true" />
            <span className="map-pin"><MapPin size={20} fill="currentColor" /></span>
            <div className="map-label map-label--hotel">Casa Solé</div>
            <div className="map-label map-label--cove">Cala Nord · 7 min</div>
            <div className="map-label map-label--village">Costa Serena · 12 min</div>
            <div className="map-label map-label--airport">Airport · 38 min</div>
          </Reveal>
          <Reveal className="contact-map__content" delay={0.1}>
            <span className="eyebrow">Around the house</span>
            <h2>Close enough<br />to <em>wander.</em></h2>
            <p>A hidden cove at the end of the lane, a village full of morning rituals and the mountains beyond. We’ll point you in the right direction.</p>
            <div className="map-times">
              <div><strong>7 min</strong><span>Walking to Cala Nord</span></div>
              <div><strong>12 min</strong><span>Driving to the village</span></div>
              <div><strong>28 min</strong><span>To the hilltop vineyards</span></div>
              <div><strong>38 min</strong><span>Airport transfer</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="faq-section section-pad section-sand" id="faqs">
        <div className="page-container faq-section__grid">
          <Reveal>
            <span className="eyebrow">Good to know</span>
            <h2>Questions,<br /><em>answered.</em></h2>
            <p>Still wondering about something? <a href="mailto:stay@casasole.example">Write to us directly.</a></p>
          </Reveal>
          <Reveal className="faq-list" delay={0.08}>
            {faqs.map((faq, index) => (
              <div className={`faq-item${openFaq === index ? ' faq-item--open' : ''}`} key={faq.question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{faq.question}</span>
                  <ChevronDown size={18} />
                </button>
                <div className="faq-item__answer"><p>{faq.answer}</p></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  )
}
