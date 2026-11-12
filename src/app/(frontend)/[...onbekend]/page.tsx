import { notFound } from 'next/navigation'

/**
 * Vangt elk onbekend adres op, zodat de eigen 404-pagina (not-found.tsx) met header en footer verschijnt.
 * Zonder deze route toont Next.js zijn kale standaardpagina, omdat de site uit twee routegroepen bestaat.
 */
export default function Onbekend() {
  notFound()
}
