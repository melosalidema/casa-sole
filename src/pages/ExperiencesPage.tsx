import { ArrowRight, Clock3, Compass, Sparkles } from '../components/Icons'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionIntro } from '../components/SectionIntro'
import { experiences } from '../data/hotel'

export function ExperiencesPage() {
  return (
    <main id="content">
      <PageHero
        eyebrow="Experiences · Dining · About"
        title={<>Follow the light.<br /><em>Find your wild.</em></>}
        description="The coast is generous. Swim before breakfast, walk the old paths, taste the year. Then return to a table set for you."
        image="https://images.unsplash.com/photo-1758626222417-075ca49a760c?auto=format&fit=crop&w=2400&q=88"
        imageAlt="Boats resting in a clear Mediterranean bay"
      />

      <section className="experiences-intro section-pad">
        <div className="page-container experiences-intro__grid">
          <SectionIntro
            eyebrow="Made for your mood"
            title={<>Some days ask for<br /><em>wonder.</em></>}
            text="Others ask for nowhere in particular. Our hosts keep a little black book of the coast’s best kept secrets, from first-light swims to cellar lunches with winemakers."
          />
          <Reveal className="experiences-intro__aside" delay={0.1}>
            <Sparkles size={20} />
            <p>Every experience is private and made to order. Tell us what you love, and we’ll build the day around it.</p>
          </Reveal>
        </div>
      </section>

      <section className="experience-list section-pad section-olive">
        <div className="page-container">
          {experiences.map((experience, index) => (
            <Reveal key={experience.slug} className={`experience-row${index % 2 === 1 ? ' experience-row--reverse' : ''}`}>
              <div className="experience-row__image image-zoom">
                <img src={experience.image} alt={experience.title} />
                <span>0{index + 1}</span>
              </div>
              <div className="experience-row__content">
                <span className="eyebrow eyebrow--light">{experience.eyebrow}</span>
                <h2>{experience.title}</h2>
                <p>{experience.longDescription}</p>
                <div className="experience-row__meta">
                  <span><Clock3 size={15} /> {experience.duration}</span>
                  <span>From €{experience.price} / person</span>
                </div>
                <ul>
                  {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <Link className="button button--cream" to="/contact?intent=experience">Plan this experience <ArrowRight size={16} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="experience-principles section-pad">
        <div className="page-container">
          <SectionIntro eyebrow="The Casa Solé way" title={<>Small in number.<br /><em>Rich in detail.</em></>} align="center" />
          <div className="principle-grid">
            <Reveal className="principle-card">
              <Compass size={23} />
              <span>01</span>
              <h3>Local, always</h3>
              <p>Our hosts are artists, boat captains, growers and fishermen. The best experiences begin with people who know why the water is bluer today.</p>
            </Reveal>
            <Reveal className="principle-card" delay={0.08}>
              <Clock3 size={23} />
              <span>02</span>
              <h3>Unhurried</h3>
              <p>No rigid schedules or crowded coaches. We leave generous space around every plan, because the best moments are rarely on the schedule.</p>
            </Reveal>
            <Reveal className="principle-card" delay={0.16}>
              <Sparkles size={23} />
              <span>03</span>
              <h3>Entirely yours</h3>
              <p>Private by default. Share a table, a boat or a garden path with someone you love, or make the whole coast your own.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="experience-cta section-sand">
        <div className="page-container experience-cta__inner">
          <Reveal>
            <span className="eyebrow">Tell us how you like to wander</span>
            <h2>Your day.<br /><em>Your way.</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Write to our experience team with the mood, pace and people you have in mind. We’ll take care of the rest.</p>
            <Link className="button button--dark" to="/contact?intent=experience">Start a conversation <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
