/**
 * Leveranciers van de live site (/partners/, opgehaald op 12 november 2026), op alfabet.
 * De naam is de naam zoals die in het logo zelf staat. De live site linkt de logo's niet; hier dus ook geen links.
 */
export type Partner = { name: string; logo: string }

const p = (name: string, file: string): Partner => ({ name, logo: `/beeld/partners/${file}` })

export const PARTNERS: Partner[] = [
  p('112BHV', '112bhv.png'),
  p('ArboAnders', 'arboanders.webp'),
  p('Atalian', 'atalian.png'),
  p('Burgman', 'burgman.webp'),
  p('Canon', 'canon.png'),
  p('Care for Coffee', 'care-for-coffee.png'),
  p('CBO Security', 'cbo-security.png'),
  p('CleanJack', 'cleanjack.svg'),
  p('Concent', 'concent.png'),
  p('Cruon', 'cruon.png'),
  p('CWS', 'cws.png'),
  p('Fidus', 'fidus.png'),
  p('Flame Control', 'flame-control.png'),
  p('Fleulia', 'fleulia.png'),
  p('G4S', 'g4s.webp'),
  p('Geef Scholen Energie', 'geef-scholen-energie.png'),
  p('GP', 'gp.png'),
  p('IVM', 'ivm.png'),
  p('Janssen-Fritsen', 'janssen-fritsen.svg'),
  p('Jeka Service', 'jeka-service.jpg'),
  p('Keus Schoonmaak', 'keus-schoonmaak.png'),
  p('Kompas', 'kompas.webp'),
  p('Konica Minolta', 'konica-minolta.png'),
  p('L.J. de Vries', 'lj-de-vries.png'),
  p('MKB Schoon', 'mkb-schoon.webp'),
  p('MPL', 'mpl.jpg'),
  p('Nederrijn Schoonmaak', 'nederrijn.svg'),
  p('NNRD', 'nnrd.webp'),
  p('Omnia Connect', 'omnia-connect.png'),
  p('OVSR', 'ovsr.png'),
  p('Qualiant', 'qualiant.jpg'),
  p('Remondis', 'remondis.png'),
  p('Renewi', 'renewi.png'),
  p('Repcon', 'repcon.jpg'),
  p('Ricoh', 'ricoh.jpg'),
  p('Roggendorf', 'roggendorf.webp'),
  p('Saled', 'saled.png'),
  p('SaniQ', 'saniq.png'),
  p('Schilte', 'schilte.png'),
  p('Sense Schoonmaak', 'sense-schoonmaak.png'),
  p('Speelplan', 'speelplan.png'),
  p('Toshiba', 'toshiba.png'),
  p('Trigion', 'trigion.png'),
  p('TyClean', 'tyclean.png'),
  p('Uniqcare', 'uniqcare.jpg'),
  p('Van Happen Containers', 'van-happen-containers.png'),
  p('VLS Schoonmaak', 'vls-schoonmaak.gif'),
]

/** De acht logo's op /over-ons/ (keuze uit het ontwerp; OIG mag een andere selectie aanwijzen). */
export const PARTNERS_OVER_ONS = [
  'Omnia Connect',
  'Fidus',
  'Konica Minolta',
  'Canon',
  'Toshiba',
  'Trigion',
  'Remondis',
  'Qualiant',
]
  .map((name) => PARTNERS.find((x) => x.name === name))
  .filter((x): x is Partner => Boolean(x))
