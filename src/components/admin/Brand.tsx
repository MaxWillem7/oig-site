/* eslint-disable @next/next/no-img-element */
import React from 'react'

/** Logo op het inlogscherm van het CMS. */
export function Logo() {
  return <img src="/logo.svg" alt="Onderwijs Inkoop Groep" width={260} height={100} className="oig-logo" />
}

/** Beeldmerk linksboven in het CMS. */
export function Icon() {
  return <img src="/favicon.svg" alt="" width={30} height={30} className="oig-icon" />
}
