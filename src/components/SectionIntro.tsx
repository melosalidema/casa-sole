import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionIntroProps {
  eyebrow: string
  title: ReactNode
  text?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionIntro({ eyebrow, title, text, align = 'left', light = false }: SectionIntroProps) {
  return (
    <Reveal className={`section-intro section-intro--${align}${light ? ' section-intro--light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}
