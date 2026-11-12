import { randomUUID } from 'crypto'
import { FILE_RULES } from './definitions'

export type CheckedFile = { name: string; data: Buffer; mimetype: string; size: number }

const startsWith = (buf: Buffer, bytes: number[]) => bytes.every((b, i) => buf[i] === b)

/** Controleert of de inhoud past bij het opgegeven type (eerste bytes van het bestand). */
const matchesType = (buf: Buffer, ext: string) => {
  if (ext === 'pdf') return startsWith(buf, [0x25, 0x50, 0x44, 0x46])
  if (ext === 'docx') return startsWith(buf, [0x50, 0x4b, 0x03, 0x04])
  if (ext === 'png') return startsWith(buf, [0x89, 0x50, 0x4e, 0x47])
  if (ext === 'jpg') return startsWith(buf, [0xff, 0xd8, 0xff])
  return false
}

/**
 * Leest de bestanden uit het formulier en keurt ze. Geeft een foutmelding of de gekeurde bestanden,
 * elk met een willekeurige bestandsnaam zodat het adres niet te raden is.
 */
export async function readFiles(fd: FormData, field: string): Promise<{ files: CheckedFile[]; error?: string }> {
  const raw = fd.getAll(field).filter((v): v is File => typeof v === 'object' && v !== null && 'arrayBuffer' in v && v.size > 0)
  if (raw.length === 0) return { files: [], error: 'Voeg je cv toe.' }
  if (raw.length > FILE_RULES.maxFiles) return { files: [], error: `Hoogstens ${FILE_RULES.maxFiles} bestanden.` }
  const total = raw.reduce((sum, f) => sum + f.size, 0)
  if (total > FILE_RULES.maxBytes) return { files: [], error: 'De bestanden zijn samen groter dan 4 MB.' }

  const files: CheckedFile[] = []
  for (const f of raw) {
    const ext = FILE_RULES.types[f.type]
    const data = Buffer.from(await f.arrayBuffer())
    if (!ext || !matchesType(data, ext)) return { files: [], error: 'Alleen pdf, docx, png of jpg.' }
    files.push({ name: `${randomUUID()}.${ext}`, data, mimetype: f.type, size: data.length })
  }
  return { files }
}
