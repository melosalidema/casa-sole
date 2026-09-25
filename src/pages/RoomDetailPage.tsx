import { ArrowLeft, ArrowRight, Check, Maximize2, Users } from '../components/Icons'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BookingWidget } from '../components/BookingWidget'
import { Reveal } from '../components/Reveal'
import { getRoomBySlug, rooms } from '../data/hotel'

export function RoomDetailPage() {
  const { slug } = useParams()
  const room = slug === undefined ? undefined : getRoomBySlug(slug)

  if (room === undefined) {
    return <Navigate to="/rooms" replace />
  }

  const otherRooms = rooms.filter((item) => item.slug !== room.slug)

  return (
    <main id="content" className="room-detail">
      <section className="room-detail__hero">
        <img src={room.images[0]} alt={room.name} />
        <div className="room-detail__hero-veil" />
        <Link className="room-detail__back" to="/rooms"><ArrowLeft size={16} /> All rooms</Link>
        <div className="room-detail__hero-content page-container">
          <span className="eyebrow eyebrow--light">{room.eyebrow}</span>
          <h1>{room.name}</h1>
          <p>From €{room.price} / night</p>
        </div>
      </section>

      <section className="room-detail__intro section-pad">
        <div className="page-container room-detail__intro-grid">
          <Reveal className="room-detail__facts">
            <div><Maximize2 size={18} /><span><strong>{room.size} m²</strong>Room size</span></div>
            <div><Users size={18} /><span><strong>Up to {room.guests}</strong>Guests</span></div>
            <div><span className="bed-icon">K</span><span><strong>{room.bed}</strong>Bed type</span></div>
          </Reveal>
          <Reveal className="room-detail__copy" delay={0.08}>
            <span className="eyebrow">The feeling</span>
            <h2>Soft light.<br /><em>Hard-to-leave views.</em></h2>
            <p>{room.longDescription}</p>
            <Link className="text-link" to="/contact?intent=booking">Ask us anything <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="room-gallery page-container">
        <Reveal className="room-gallery__main image-zoom">
          <img src={room.images[1] ?? room.gallery[0]} alt={`${room.name} sitting area`} />
        </Reveal>
        <Reveal className="room-gallery__small image-zoom" delay={0.08}>
          <img src={room.gallery[0]} alt={`${room.name} detail`} />
        </Reveal>
        <Reveal className="room-gallery__small image-zoom" delay={0.16}>
          <img src={room.gallery[1]} alt={`${room.name} bathroom`} />
        </Reveal>
      </section>

      <section className="room-detail__amenities section-pad section-sand">
        <div className="page-container room-detail__amenities-grid">
          <Reveal>
            <span className="eyebrow">Included in your stay</span>
            <h2>Thoughtful,<br /><em>never fussy.</em></h2>
          </Reveal>
          <Reveal className="amenity-list" delay={0.08}>
            {room.features.map((feature) => (
              <div key={feature}><Check size={15} /><span>{feature}</span></div>
            ))}
            <div><Check size={15} /><span>Daily housekeeping</span></div>
            <div><Check size={15} /><span>Beach towels &amp; pool passes</span></div>
          </Reveal>
          <Reveal className="room-detail__booking" delay={0.12}>
            <BookingWidget placement="sidebar" initialRoomId={room.slug} />
          </Reveal>
        </div>
      </section>

      <section className="room-next section-pad">
        <div className="page-container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2>Another kind of<br /><em>room to dream in.</em></h2>
            </div>
            <Link className="text-link" to="/rooms">View all rooms <ArrowRight size={16} /></Link>
          </div>
          <div className="room-next__grid">
            {otherRooms.map((item) => (
              <Link key={item.slug} to={`/rooms/${item.slug}`} className="room-next__card image-zoom">
                <img src={item.images[0]} alt={item.name} />
                <span>{item.name} <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
