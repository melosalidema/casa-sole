import { ArrowRight, Clock3, Leaf, UtensilsCrossed } from '../components/Icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { restaurantMenu } from '../data/hotel'

export function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState(restaurantMenu.categories[0])
  const visibleItems = restaurantMenu.items.filter((item) => item.category === activeCategory)

  return (
    <main id="content">
      <PageHero
        eyebrow="Restaurant Sole"
        title={<>Dinner by the<br /><em>last light.</em></>}
        description="A Mediterranean kitchen, a sea-facing terrace and a table that always seems to have room for one more."
        image="https://images.unsplash.com/photo-1756680967373-c3205a8a8b31?auto=format&fit=crop&w=2400&q=88"
        imageAlt="A restaurant terrace overlooking the sea"
      />

      <section className="restaurant-intro section-pad">
        <div className="page-container restaurant-intro__grid">
          <Reveal>
            <span className="eyebrow">The kitchen</span>
            <h2>Simple things,<br /><em>done beautifully.</em></h2>
          </Reveal>
          <Reveal className="restaurant-intro__copy" delay={0.1}>
            <p>Chef Luca and his team cook from the day’s catch, the garden behind the hotel and a handful of growers they have known for years.</p>
            <p>Menus are short, generous and designed to be shared. Dietary preferences are always welcome.</p>
            <div className="restaurant-intro__facts">
              <span><Leaf size={16} /> Seasonal produce</span>
              <span><UtensilsCrossed size={16} /> Daily changing menu</span>
              <span><Clock3 size={16} /> Dinner from 19:00</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="menu-section section-pad section-sand">
        <div className="page-container">
          <div className="menu-heading">
            <span className="eyebrow">A taste of Sole</span>
            <h2>From the kitchen</h2>
            <p>Prices are indicative and subject to seasonal availability.</p>
          </div>
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {restaurantMenu.categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={category === activeCategory}
                className={category === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="menu-list" role="tabpanel">
            {visibleItems.map((item, index) => (
              <article key={item.id} className="menu-item" style={{ '--item-delay': `${index * 45}ms` } as React.CSSProperties}>
                <img src={item.image} alt="" />
                <div>
                  <div className="menu-item__title"><h3>{item.name}</h3><span>€{item.price}</span></div>
                  <p>{item.description}</p>
                  <div className="menu-item__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chef-story section-pad">
        <div className="page-container chef-story__grid">
          <Reveal className="chef-story__image image-zoom">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85" alt="Restaurant table set for dinner" />
          </Reveal>
          <Reveal className="chef-story__content" delay={0.1}>
            <span className="eyebrow">A note from Chef Luca</span>
            <blockquote>“A good meal should feel like the coast itself: bright, a little wild, and impossible to hurry.”</blockquote>
            <p>We built the menu around what arrives that morning. A fish from the blue boat, tomatoes warmed by the sun, a farmer’s cheese from two valleys over. The rest is instinct.</p>
            <Link className="text-link" to="/story">Meet the people behind Casa Solé <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="restaurant-reserve section-pad">
        <div className="page-container restaurant-reserve__inner">
          <Reveal>
            <span className="eyebrow eyebrow--light">Save a table</span>
            <h2>Stay for<br /><em>the last course.</em></h2>
            <p>Dinner reservations are recommended. Non-residents are always welcome when the terrace allows.</p>
            <Link className="button button--cream" to="/contact?intent=restaurant">Request a table <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
