'use client'

import { useEffect } from 'react'

const anker = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Geeft de H2's van tekst uit het CMS een anker, zodat de inhoudsopgave ernaar kan springen. */
export function HeadingIds({ target }: { target: string }) {
  useEffect(() => {
    const root = document.getElementById(target)
    if (!root) return
    root.querySelectorAll('h2').forEach((h) => {
      if (!h.id) h.id = anker(h.textContent ?? '')
    })
    // sprong naar het anker uit de adresbalk, nu de ankers bestaan
    if (window.location.hash) document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
  }, [target])
  return null
}
