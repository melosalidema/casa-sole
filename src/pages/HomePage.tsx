import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Star } from '../components/Icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { experiences, rooms } from '../data/hotel'
import { BookingWidget } from '../components/BookingWidget'
import { Reveal } from '../components/Reveal'
import { SectionIntro } from '../components/SectionIntro'

const testimonials = [
  {
    quote: 'Casa Solé has that rare quality of making time feel generous. We arrived tired and left completely restored.',
    source: 'Mara & Theo · Copenhagen',
  },
  {
    quote: 'Not simply a beautiful room with a view. The whole place has a rhythm: breakfast late, swim often, dinner when the sky turns pink.',
    source: 'Sophie L. · London',
  },
  {
    quote: 'The kind of small hotel you begin describing to friends before you have even left the bay.',
    source: 'Noah & Jules · Montréal',
  },
]

export function HomePage() {
  const [testimonial, setTestimonial] = useState(0)

  const nextTestimonial = () => {
    setTestimonial((current) => (current + 1) % testimonials.length)
  }

  return (
    <main>
      <section className="home-hero">
        <motion.img
          className="home-hero__image"
          src="https://images.unsplash.com/photo-1758972574715-bcb23a467697?auto=format&fit=crop&w=2400&q=88"
          alt="A sunlit stone villa opening onto the Mediterranean Sea"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="home-hero__veil" />
        <div className="home-hero__content page-container">
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Boutique hotel · Costa Serena
          </motion.span>
          <motion.h1
            aria-label="Find your own pace by the sea."
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            Find your own<br /><em>pace by the sea.</em>
          </motion.h1>
          <motion.div
            className="home-hero__footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.75 }}
          >
            <p>Eighteen rooms carved into the coast.<br />A slower way to be together.</p>
            <Link className="round-link" to="/story" aria-label="Discover our story">
              <ArrowDown size={20} />
            </Link>
          </motion.div>
        </div>
        <div className="home-hero__coordinates">
          <span>44.1032° N</span>
          <span>07.5486° E</span>
        </div>
      </section>

      <div className="hero-booking page-container">
        <BookingWidget placement="hero" />
      </div>

      <section className="home-intro section-pad">
        <div className="page-container home-intro__grid">
          <Reveal className="home-intro__aside">
            <span className="section-number">01</span>
            <p>18 rooms<br />1 shoreline<br />0 reasons to hurry</p>
          </Reveal>
          <Reveal className="home-intro__statement" delay={0.1}>
            <h2>Not a place to escape.<br /><em>A place to arrive.</em></h2>
            <p>Casa Solé is a small hotel with a generous point of view. Come for the sea, stay for the quiet, and leave with a deeper sense of time.</p>
            <Link className="text-link" to="/story">Meet Casa Solé <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="home-rooms section-pad section-olive">
        <div className="page-container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow="Rooms & suites"
              title={<>Sleep with<br /><em>the sea nearby.</em></>}
              text="Natural materials, quiet luxuries, and private outdoor space. Each room is different; the welcome is always the same."
              light
            />
            <Link className="round-link round-link--light" to="/rooms" aria-label="View every room">
              <ArrowUpRight size={22} />
            </Link>
          </div>

          <div className="home-room-grid">
            {rooms.map((room, index) => (
              <Reveal key={room.slug} className={`home-room-card home-room-card--${index + 1}`} delay={index * 0.08}>
                <Link to={`/rooms/${room.slug}`}>
                  <div className="home-room-card__image image-zoom">
                    <img src={room.images[0]} alt={`${room.name} at Casa Solé`} />
                    <span className="image-index">0{index + 1}</span>
                  </div>
                  <div className="home-room-card__body">
                    <div>
                      <span>{room.size} m² · {room.guests} guests</span>
                      <h3>{room.name}</h3>
                    </div>
                    <p>From €{room.price} <ArrowUpRight size={15} /></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-rhythm section-pad">
        <div className="page-container home-rhythm__grid">
          <Reveal className="home-rhythm__image image-zoom">
            <img src="https://images.unsplash.com/photo-1768343518456-3692cd9adebb?auto=format&fit=crop&w=1800&q=85" alt="Olive trees moving on a Mediterranean hillside" />
            <span className="image-caption">The grove, seven minutes on foot</span>
          </Reveal>
          <div className="home-rhythm__content">
            <SectionIntro
              eyebrow="A day at your pace"
              title={<>Nothing to do.<br /><em>Everything to feel.</em></>}
              text="There is an art to doing very little here. Swim before breakfast. Read beneath the lemon trees. Let lunch become dinner. Our hosts will point you toward the good parts of the day, then leave the rest entirely up to you."
            />
            <div className="rhythm-list">
              <Reveal className="rhythm-list__item" delay={0.05}>
                <span>07:12</span>
                <div><strong>First light</strong><p>Coffee on the eastern terrace</p></div>
              </Reveal>
              <Reveal className="rhythm-list__item" delay={0.1}>
                <span>10:40</span>
                <div><strong>Blue hour</strong><p>A quiet cove before the crowds</p></div>
              </Reveal>
              <Reveal className="rhythm-list__item" delay={0.15}>
                <span>19:26</span>
                <div><strong>Golden table</strong><p>Dinner as the light turns amber</p></div>
              </Reveal>
            </div>
            <Link className="text-link" to="/experiences">Shape your day <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="home-experiences section-pad section-sand">
        <div className="page-container">
          <SectionIntro
            eyebrow="Beyond the hotel"
            title={<>The coast is<br /><em>your playground.</em></>}
            text="Private coves, old vineyards, long lunches and small adventures arranged by people who call this coastline home."
            align="center"
          />
          <div className="experience-preview-grid">
            {experiences.slice(0, 3).map((experience, index) => (
              <Reveal key={experience.slug} className="experience-preview" delay={index * 0.08}>
                <Link to="/experiences">
                  <div className="experience-preview__image image-zoom">
                    <img src={experience.image} alt={experience.title} />
                    <span><ArrowUpRight size={19} /></span>
                  </div>
                  <div className="experience-preview__meta">
                    <span>{experience.eyebrow} · {experience.duration}</span>
                    <h3>{experience.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="center-action">
            <Link className="button button--outline" to="/experiences">All experiences <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="home-table">
        <div className="home-table__image image-zoom">
          <img src="https://images.unsplash.com/photo-1756680967373-c3205a8a8b31?auto=format&fit=crop&w=2200&q=86" alt="Restaurant terrace overlooking the Mediterranean" />
        </div>
        <div className="home-table__content">
          <Reveal>
            <span className="eyebrow eyebrow--light">Restaurant Sole</span>
            <h2>Sea, salt<br />and a little <em>theatre.</em></h2>
            <p>Wood-fired fish, vegetables from the hillside and bottles chosen with feeling. Dinner here is less a meal than a reason to stay at the table.</p>
            <div className="home-table__details">
              <span>Breakfast</span><span>7:00 — 11:30</span>
              <span>Dinner</span><span>19:00 — late</span>
            </div>
            <Link className="button button--cream" to="/restaurant">Discover Sole <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="home-testimonials section-pad">
        <div className="page-container home-testimonials__inner">
          <Reveal className="home-testimonials__mark"><Star size={20} fill="currentColor" /> <span>4.9 / 5</span></Reveal>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={testimonial}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5 }}
            >
              “{testimonials[testimonial].quote}”
              <footer>{testimonials[testimonial].source}</footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="home-testimonials__controls">
            <div>
              {testimonials.map((item, index) => (
                <button key={item.source} type="button" className={index === testimonial ? 'active' : ''} onClick={() => setTestimonial(index)} aria-label={`Show review ${index + 1}`} />
              ))}
            </div>
            <button className="round-link" type="button" onClick={nextTestimonial} aria-label="Next review"><ArrowRight size={20} /></button>
          </div>
        </div>
      </section>

      <section className="home-place section-pad">
        <div className="page-container home-place__grid">
          <div className="home-place__content">
            <SectionIntro
              eyebrow="Your base by the sea"
              title={<>Close enough<br />to <em>disappear.</em></>}
              text="A hidden cove at the end of the road. A village where every baker knows your order. A day trip to nowhere in particular. Casa Solé puts you gently in the middle of it all."
            />
            <Reveal className="home-place__facts" delay={0.12}>
              <div><strong>7 min</strong><span>to the cove</span></div>
              <div><strong>12 min</strong><span>to the village</span></div>
              <div><strong>38 min</strong><span>to the airport</span></div>
            </Reveal>
            <Link className="text-link" to="/contact">Plan your arrival <ArrowRight size={16} /></Link>
          </div>
          <Reveal className="home-place__image image-zoom" delay={0.1}>
            <img src="https://images.unsplash.com/photo-1759609433518-a222577c4b57?auto=format&fit=crop&w=1800&q=85" alt="A small Mediterranean village above the sea" />
            <div className="map-card">
              <span>You are here</span>
              <strong>Casa Solé</strong>
              <small>44.1032° N · 7.5486° E</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-final-cta">
        <img src="https://images.unsplash.com/photo-1690991966399-9758fdbe5794?auto=format&fit=crop&w=2400&q=88" alt="Sunlit sea terrace prepared for a quiet stay" />
        <div className="home-final-cta__veil" />
        <Reveal className="home-final-cta__content">
          <span className="eyebrow eyebrow--light">Your room is out there</span>
          <h2>Come find<br /><em>your horizon.</em></h2>
          <Link className="button button--cream" to="/contact?intent=booking">Book your stay <ArrowRight size={16} /></Link>
        </Reveal>
      </section>
    </main>
  )
}
