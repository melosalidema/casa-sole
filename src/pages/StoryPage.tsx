import { ArrowRight, HeartHandshake, Sprout, SunMedium } from '../components/Icons'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionIntro } from '../components/SectionIntro'

export function StoryPage() {
  return (
    <main id="content">
      <PageHero
        eyebrow="Our story"
        title={<>A house built<br /><em>around the light.</em></>}
        description="Casa Solé began with a stone house, a stubborn olive tree and a simple belief: the best kind of luxury gives you back your time."
        image="https://images.unsplash.com/photo-1756887406085-a689fbc8af33?auto=format&fit=crop&w=2400&q=88"
        imageAlt="Mediterranean villa surrounded by flowers and sea views"
      />

      <section className="story-opening section-pad">
        <div className="page-container story-opening__grid">
          <Reveal className="story-opening__year">
            <span>Est.</span>
            <strong>1987</strong>
            <p>One family house.<br />Eighteen rooms.<br />The same welcome.</p>
          </Reveal>
          <Reveal className="story-opening__copy" delay={0.08}>
            <span className="eyebrow">Casa, not a castle</span>
            <h2>Made by hands.<br /><em>Kept by heart.</em></h2>
            <p>When the Ferraro family found this stone villa above a small Mediterranean cove, it had been empty for almost a decade. The lemon terraces were wild, the windows were soft with salt and the view had survived every season.</p>
            <p>We restored it slowly, using local builders, lime plaster and wood reclaimed from the original roof. We kept the crooked doors, the worn stone steps and the trees that had been here longest.</p>
          </Reveal>
        </div>
      </section>

      <section className="story-collage page-container">
        <Reveal className="story-collage__large image-zoom">
          <img src="https://images.unsplash.com/photo-1757810777684-1d29488da99f?auto=format&fit=crop&w=2000&q=85" alt="A quiet pool terrace at golden hour" />
          <span>The lower terrace, just before sunset</span>
        </Reveal>
        <Reveal className="story-collage__small image-zoom" delay={0.1}>
          <img src="https://images.unsplash.com/photo-1764147385154-c856f2dc63cd?auto=format&fit=crop&w=1400&q=85" alt="Old stone walls among olive terraces" />
        </Reveal>
        <Reveal className="story-collage__quote" delay={0.15}>
          <span>“</span>
          <blockquote>We wanted a hotel that felt cared for, not managed.</blockquote>
          <p>— Elena Ferraro, third-generation host</p>
        </Reveal>
      </section>

      <section className="story-values section-pad section-olive">
        <div className="page-container">
          <SectionIntro
            eyebrow="What guides us"
            title={<>Three things we<br /><em>won’t compromise.</em></>}
            text="Not rules exactly. More like a shared instinct for how this place should feel, taste and move."
            light
          />
          <div className="story-values__grid">
            <Reveal className="story-value">
              <SunMedium size={26} />
              <span>01</span>
              <h3>Make space</h3>
              <p>We leave white space in the day, on the table and between the lines. There is no schedule you need to keep.</p>
            </Reveal>
            <Reveal className="story-value" delay={0.08}>
              <Sprout size={26} />
              <span>02</span>
              <h3>Stay close</h3>
              <p>Our menu, our wine and our sense of place begin within a few kilometres of the front door.</p>
            </Reveal>
            <Reveal className="story-value" delay={0.16}>
              <HeartHandshake size={26} />
              <span>03</span>
              <h3>Be human</h3>
              <p>Real recommendations, remembered names and the occasional secret beach. Technology helps; people decide.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="story-today section-pad">
        <div className="page-container story-today__grid">
          <Reveal className="story-today__image image-zoom">
            <img src="https://images.unsplash.com/photo-1759609433518-a222577c4b57?auto=format&fit=crop&w=1800&q=85" alt="A Mediterranean village in the evening light" />
          </Reveal>
          <Reveal className="story-today__content" delay={0.1}>
            <span className="eyebrow">Then and now</span>
            <h2>The house grew.<br /><em>The idea didn’t.</em></h2>
            <p>Today, our small family team includes the third generation of the house, along with a chef from Naples, a garden keeper who knows every herb by scent and a local sailing captain who has explored every cove.</p>
            <p>We have added eighteen rooms, a new kitchen and a warm little spa. What hasn’t changed is the olive tree, the long table and our belief that hospitality is simply paying attention.</p>
            <div className="story-stats">
              <div><strong>18</strong><span>rooms</span></div>
              <div><strong>11</strong><span>team members</span></div>
              <div><strong>1</strong><span>old olive tree</span></div>
            </div>
            <Link className="text-link" to="/contact">Come and see for yourself <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="story-closing section-sand">
        <div className="page-container story-closing__inner">
          <span className="eyebrow">The next chapter</span>
          <h2>There’s always<br /><em>room at our table.</em></h2>
          <Link className="button button--dark" to="/contact?intent=booking">Plan your stay <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  )
}
