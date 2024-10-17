import { ReactNode } from 'react'

interface LayoutDefaultProps {
  children: ReactNode
}

export function LayoutSignIn({ children }: LayoutDefaultProps) {
  return (
    <div className="h-screen w-screen bg-content1">
      <div>{children}</div>
    </div>
  )
}
