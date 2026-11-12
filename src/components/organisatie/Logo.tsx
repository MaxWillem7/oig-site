import Image from 'next/image'
import s from './organisatie.module.css'

/** Logo dat binnen zijn vak past (object-fit: contain). De maat van het vak komt uit de CSS van de pagina. */
export function Logo({
  src,
  alt,
  sizes = '160px',
  grijs,
}: {
  src: string
  alt: string
  sizes?: string
  grijs?: boolean
}) {
  return (
    <span className={`${s.logo} ${grijs ? s.grijs : ''}`}>
      <Image src={src} alt={alt} fill sizes={sizes} unoptimized={/\.(svg|gif)$/.test(src)} />
    </span>
  )
}
