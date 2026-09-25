import { motion } from 'framer-motion'
import { ArrowDown } from './Icons'
import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description: string
  image: string
  imageAlt: string
  position?: string
}

export function PageHero({ eyebrow, title, description, image, imageAlt, position = 'center' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <motion.img
        src={image}
        alt={imageAlt}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ objectPosition: position }}
      />
      <div className="page-hero__veil" />
      <div className="page-hero__content page-container">
        <motion.span
          className="eyebrow eyebrow--light"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {description}
        </motion.p>
      </div>
      <a className="page-hero__scroll" href="#content" aria-label="Scroll to content">
        <ArrowDown size={17} />
      </a>
    </section>
  )
}
