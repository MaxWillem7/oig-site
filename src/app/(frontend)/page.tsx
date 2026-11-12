import { Home } from '@/components/home/Home'
import { pageMetadata } from '@/lib/cms'

export const revalidate = 300

export const generateMetadata = () => pageMetadata('/')

export default function Page() {
  return <Home />
}
