// Generic skeleton loader component

import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn.ts'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        {
          'rounded-full': variant === 'circular',
          'rounded': variant === 'text',
          'rounded-lg': variant === 'rectangular',
        },
        className
      )}
      {...props}
    />
  )
}
