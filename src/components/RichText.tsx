import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Toont een richtext-veld uit het CMS in de huisstijl. Rendert niets als het leeg is. */
export function RichText({ data, className }: { data: unknown; className?: string }) {
  const state = data as SerializedEditorState | null | undefined
  const children = state?.root?.children ?? []
  const hasText = JSON.stringify(children).includes('"text":"')
  if (!hasText) return null
  return <LexicalRichText data={state!} className={`prose ${className ?? ''}`} />
}

export const hasRichText = (data: unknown) => {
  const state = data as SerializedEditorState | null | undefined
  return JSON.stringify(state?.root?.children ?? []).includes('"text":"')
}
