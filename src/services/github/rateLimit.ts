// Rate limit handling utilities

import type { RateLimitInfo } from './types.ts'

let cachedRateLimit: RateLimitInfo | null = null
const listeners: Set<() => void> = new Set()

export function parseRateLimitHeaders(headers: Headers): RateLimitInfo {
  const limit = parseInt(headers.get('x-ratelimit-limit') || '0', 10)
  const remaining = parseInt(headers.get('x-ratelimit-remaining') || '0', 10)
  const reset = parseInt(headers.get('x-ratelimit-reset') || '0', 10)
  const used = parseInt(headers.get('x-ratelimit-used') || '0', 10)

  const rateLimit: RateLimitInfo = {
    limit,
    remaining,
    reset,
    used,
  }

  // Cache the rate limit info
  cachedRateLimit = rateLimit

  // Notify all listeners that rate limit has updated
  listeners.forEach(listener => listener())

  return rateLimit
}

export function subscribeToRateLimit(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export function getCachedRateLimit(): RateLimitInfo | null {
  return cachedRateLimit
}

export function getRateLimitPercentage(rateLimit: RateLimitInfo): number {
  if (rateLimit.limit === 0) return 0
  return (rateLimit.remaining / rateLimit.limit) * 100
}

export function getRateLimitColor(percentage: number): string {
  if (percentage > 50) return 'green'
  if (percentage > 20) return 'yellow'
  return 'red'
}
