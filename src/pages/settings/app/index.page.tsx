import { UseLayout } from '@/pages/_layouts/use-layout'
import { Page } from './page'

export default function handler() {
  return (
    <UseLayout>
      <Page />
    </UseLayout>
  )
}
