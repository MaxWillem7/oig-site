import { revalidatePath } from 'next/cache'

/** Ververst de hele site na een wijziging in het CMS. Faalt stil buiten Next (seed-script). */
export const revalidateSite = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // buiten de Next-runtime (bijv. seed) is er niets te verversen
  }
}

export const revalidateAfterChange = <T>({ doc }: { doc: T }): T => {
  revalidateSite()
  return doc
}

export const revalidateAfterDelete = <T>({ doc }: { doc: T }): T => {
  revalidateSite()
  return doc
}
