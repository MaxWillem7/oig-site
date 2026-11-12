import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'

/** Handschriftletter uit het huisstijlboek, alleen voor de labels boven koppen. */
export const glitter = localFont({
  src: '../../fonts/i-love-glitter.ttf',
  weight: '400',
  display: 'swap',
  variable: '--font-glitter',
})

export const fontVariables = [GeistSans.variable, glitter.variable].join(' ')
