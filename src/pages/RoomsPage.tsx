import { ArrowRight, Maximize2, Users } from '../components/Icons'
import { Link } from 'react-router-dom'
import { BookingWidget } from '../components/BookingWidget'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionIntro } from '../components/SectionIntro'
import { rooms } from '../data/hotel'

export function RoomsPage() {
  return (
    <main id="content">
      <PageHero
        eyebrow="Rooms & suites"
        title={<>Your own corner<br /><em>of the coast.</em></>}
        description="Eighteen rooms, each with its own rhythm. Natural textures, a proper bed, and the sea always close enough to hear."
        image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2400&q=88"
        imageAlt="Warm and minimal hotel suite"
      />

      <section className="rooms-intro section-pad">
        <div className="page-container rooms-intro__grid">
          <SectionIntro
            eyebrow="Choose your view"
            title={<>Nothing oversized.<br /><em>Everything considered.</em></>}
            text="Our rooms are intentionally small in number and generous in feeling. Linen, lime plaster, hand-finished oak and views that change by the hour."
          />
          <Reveal className="rooms-intro__note" delay={0.1}>
            <span>Good to know</span>
            <p>Every stay includes daily breakfast, beach towels, a welcome drink and our local host recommendations.</p>
          </Reveal>
        </div>
      </section>

      <section className="rooms-list section-pad section-sand">
        <div className="page-container">
          {rooms.map((room, index) => (
            <Reveal key={room.slug} className="room-list-card">
              <Link to={`/rooms/${room.slug}`} className="room-list-card__image image-zoom">
                <img src={room.images[0]} alt={room.name} />
                <span className="room-list-card__index">0{index + 1}</span>
              </Link>
              <div className="room-list-card__content">
                <span className="eyebrow">{room.eyebrow}</span>
                <h2>{room.name}</h2>
                <p>{room.description}</p>
                <div className="room-list-card__facts">
                  <span><Maximize2 size={15} /> {room.size} m²</span>
                  <span><Users size={15} /> Up to {room.guests}</span>
                  <span>{room.bed} bed</span>
                </div>
                <div className="room-list-card__footer">
                  <p>From <strong>€{room.price}</strong> / night</p>
                  <span className="text-link">Explore room <ArrowRight size={16} /></span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="rooms-booking section-pad">
        <div className="page-container rooms-booking__grid">
          <SectionIntro
            eyebrow="Find your dates"
            title={<>The sea is open.<br /><em>When are you coming?</em></>}
            text="Check live demo availability and build a stay at your own pace. Our team will personally confirm every request."
          />
          <BookingWidget placement="inline" />
        </div>
      </section>
    </main>
  )
}
