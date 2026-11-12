import { LANDINGS } from '@/components/whitepapers/content'
import { WhitepaperLanding } from '@/components/whitepapers/WhitepaperLanding'
import { pageMetadata } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/lp/meubilair/')

export default function Page() {
  return <WhitepaperLanding lp={LANDINGS.meubilair} />
}
