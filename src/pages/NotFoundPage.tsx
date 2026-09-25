import { ArrowLeft } from '../components/Icons'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'

export function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__image" />
      <Reveal className="not-found__content">
        <span>404 · A little off course</span>
        <h1>This path leads<br /><em>back to the sea.</em></h1>
        <Link className="button button--cream" to="/"><ArrowLeft size={16} /> Return home</Link>
      </Reveal>
    </main>
  )
}
