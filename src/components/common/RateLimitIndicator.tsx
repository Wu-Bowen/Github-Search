// Show GitHub API rate limit status

import { useState, useEffect } from 'react'
import {
  getCachedRateLimit,
  subscribeToRateLimit,
  getRateLimitPercentage,
  getRateLimitColor,
} from '@/services/github/rateLimit.ts'
import { formatResetTime } from '@/utils/formatters.ts'

export default function RateLimitIndicator() {
  const [rateLimit, setRateLimit] = useState(getCachedRateLimit())

  // Subscribe to rate limit updates from API responses
  useEffect(() => {
    const unsubscribe = subscribeToRateLimit(() => {
      setRateLimit(getCachedRateLimit())
    })
    return unsubscribe
  }, [])

  if (!rateLimit) {
    return null
  }

  const percentage = getRateLimitPercentage(rateLimit)
  const colorName = getRateLimitColor(percentage)

  const colorClasses = {
    green: 'text-green-600 bg-green-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    red: 'text-red-600 bg-red-50',
  }

  const colorClass = colorClasses[colorName as keyof typeof colorClasses]

  return (
    <div
      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${colorClass}`}
      title={`GitHub API: ${rateLimit.remaining}/${rateLimit.limit} requests remaining. Resets ${formatResetTime(rateLimit.reset)}`}
    >
      <span className="hidden sm:inline">API: </span>
      {rateLimit.remaining}/{rateLimit.limit}
    </div>
  )
}
