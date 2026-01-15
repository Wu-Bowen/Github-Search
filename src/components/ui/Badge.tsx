// Badge component for tags/topics

import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn.ts'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary'
}

export default function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-blue-100 text-blue-800': variant === 'primary',
          'bg-purple-100 text-purple-800': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  )
}
