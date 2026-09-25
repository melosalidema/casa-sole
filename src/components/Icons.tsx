import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  size?: number
}

type IconName =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'calendar'
  | 'camera'
  | 'check'
  | 'chevron-down'
  | 'clock'
  | 'compass'
  | 'heart-handshake'
  | 'leaf'
  | 'mail'
  | 'map-pin'
  | 'maximize'
  | 'menu'
  | 'minus'
  | 'phone'
  | 'plus'
  | 'sparkles'
  | 'sprout'
  | 'star'
  | 'sun'
  | 'users'
  | 'utensils'
  | 'x'

interface NamedIconProps extends IconProps {
  name: IconName
}

function Icon({ name, size = 24, children, ...props }: NamedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {iconPaths[name](children)}
    </svg>
  )
}

const line = (d: string): ReactNode => <path d={d} />

export function ArrowDown(props: IconProps) { return <Icon name="arrow-down" {...props} /> }
export function ArrowLeft(props: IconProps) { return <Icon name="arrow-left" {...props} /> }
export function ArrowRight(props: IconProps) { return <Icon name="arrow-right" {...props} /> }
export function ArrowUpRight(props: IconProps) { return <Icon name="arrow-up-right" {...props} /> }
export function CalendarDays(props: IconProps) { return <Icon name="calendar" {...props} /> }
export function Camera(props: IconProps) { return <Icon name="camera" {...props} /> }
export function Check(props: IconProps) { return <Icon name="check" {...props} /> }
export function ChevronDown(props: IconProps) { return <Icon name="chevron-down" {...props} /> }
export function Clock3(props: IconProps) { return <Icon name="clock" {...props} /> }
export function Compass(props: IconProps) { return <Icon name="compass" {...props} /> }
export function HeartHandshake(props: IconProps) { return <Icon name="heart-handshake" {...props} /> }
export function Leaf(props: IconProps) { return <Icon name="leaf" {...props} /> }
export function Mail(props: IconProps) { return <Icon name="mail" {...props} /> }
export function MapPin(props: IconProps) { return <Icon name="map-pin" {...props} /> }
export function Maximize2(props: IconProps) { return <Icon name="maximize" {...props} /> }
export function Menu(props: IconProps) { return <Icon name="menu" {...props} /> }
export function Minus(props: IconProps) { return <Icon name="minus" {...props} /> }
export function Phone(props: IconProps) { return <Icon name="phone" {...props} /> }
export function Plus(props: IconProps) { return <Icon name="plus" {...props} /> }
export function Sparkles(props: IconProps) { return <Icon name="sparkles" {...props} /> }
export function Sprout(props: IconProps) { return <Icon name="sprout" {...props} /> }
export function Star(props: IconProps) { return <Icon name="star" {...props} /> }
export function SunMedium(props: IconProps) { return <Icon name="sun" {...props} /> }
export function Users(props: IconProps) { return <Icon name="users" {...props} /> }
export function UtensilsCrossed(props: IconProps) { return <Icon name="utensils" {...props} /> }
export function X(props: IconProps) { return <Icon name="x" {...props} /> }

const iconPaths: Record<IconName, (children?: ReactNode) => ReactNode> = {
  'arrow-down': () => <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  'arrow-left': () => <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
  'arrow-right': () => <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  'arrow-up-right': () => <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  calendar: () => <><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  camera: () => <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z" /><circle cx="12" cy="13" r="3" /></>,
  check: () => line('m20 6-11 11-5-5'),
  'chevron-down': () => line('m6 9 6 6 6-6'),
  clock: () => <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  compass: () => <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.8 5.2L8 16l2.8-5.2z" /></>,
  'heart-handshake': () => <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1" /><path d="m3.2 13.4 3.5 3.5a2 2 0 0 0 2.8 0l.1-.1 2.1 2.1a1.4 1.4 0 0 0 2-2l.1-.1.6.6a1.4 1.4 0 0 0 2-2L14 12.7a1.4 1.4 0 0 0-2 0l-.5.5" /></>,
  leaf: () => <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 19 2 19 2c1 5.5-1.4 15-8 16" /><path d="M2 21c0-3 1.9-5.6 4.5-7" /></>,
  mail: () => <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  'map-pin': () => <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0" /><circle cx="12" cy="10" r="2.5" /></>,
  maximize: () => <><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" /></>,
  menu: () => <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  minus: () => line('M5 12h14'),
  phone: () => <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1" />,
  plus: () => <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  sparkles: () => <><path d="m12 3-1.2 3.2L7.5 7.5l3.3 1.3L12 12l1.2-3.2 3.3-1.3-3.3-1.3z" /><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8zM19 13l-.7 1.8-1.8.7 1.8.7L19 18l.7-1.8 1.8-.7-1.8-.7z" /></>,
  sprout: () => <><path d="M7 20h10" /><path d="M10 20c5.5-2.5 5.5-8 5-12-4 1-7 3.5-7 8" /><path d="M14 10c0-3 2-5 5-5 0 3-2 5-5 5z" /></>,
  star: () => <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />,
  sun: () => <><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /><circle cx="12" cy="12" r="4" /></>,
  users: () => <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  utensils: () => <><path d="m3 3 7.5 7.5M6 2l1 3 2 1 3-1 1 2-4 4-3-3z" /><path d="m14 13 7 7M17 10l5 5M15 22l6-6M3 21l8-8" /></>,
  x: () => <><path d="M18 6 6 18M6 6l12 12" /></>,
}
