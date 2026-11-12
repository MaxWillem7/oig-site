import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyPreview } from '@/lib/preview'

/** Zet de voorvertoning aan (concepten zichtbaar) en stuurt door naar de pagina. `?stop=1` zet hem uit. */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const draft = await draftMode()
  if (url.searchParams.get('stop')) {
    draft.disable()
    redirect(url.searchParams.get('path')?.startsWith('/') ? String(url.searchParams.get('path')) : '/')
  }
  const path = url.searchParams.get('path') ?? ''
  const ok = verifyPreview(path, Number(url.searchParams.get('exp')), url.searchParams.get('sig') ?? '')
  if (!ok) return new Response('Deze previewlink is ongeldig of verlopen.', { status: 401 })
  draft.enable()
  redirect(path)
}
