import { ReactNode } from 'react'
import { LayoutDefault } from './default'

interface LayoutDefaultProps {
  children: ReactNode
}

export function UseLayout({ children }: LayoutDefaultProps) {
  return <LayoutDefault>{children}</LayoutDefault>
}
