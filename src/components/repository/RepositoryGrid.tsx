// Grid container for repository cards

import type { ReactNode } from 'react'

interface RepositoryGridProps {
  children: ReactNode
}

export default function RepositoryGrid({ children }: RepositoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}
