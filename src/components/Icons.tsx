import type { SVGProps } from 'react'

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2.2} aria-hidden {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const Chevron = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} aria-hidden {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2.2} aria-hidden {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const External = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} strokeWidth={2} aria-hidden {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
