import { Link } from 'react-router-dom'

interface LogoProps {
  light?: boolean
  onClick?: () => void
}

export function Logo({ light = false, onClick }: LogoProps) {
  return (
    <Link className={`logo${light ? ' logo--light' : ''}`} to="/" onClick={onClick} aria-label="Casa Solé home">
      <span>CASA</span>
      <span>SOLÉ</span>
    </Link>
  )
}
