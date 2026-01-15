// GitHub API client with error handling

import env from '@/config/env.ts'
import { ApiErrorClass } from '@/types/api.ts'
import { parseRateLimitHeaders } from './rateLimit.ts'

export async function githubFetch<T>(url: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  // Add authorization header if token is available
  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`
  }

  try {
    const response = await fetch(url, { headers })

    // Parse rate limit headers from every response
    parseRateLimitHeaders(response.headers)

    // Handle error responses
    if (!response.ok) {
      let errorMessage: string

      if (response.status === 403) {
        const resetTime = response.headers.get('x-ratelimit-reset')
        const resetDate = resetTime
          ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString()
          : 'soon'
        errorMessage = `GitHub API rate limit exceeded. Resets at ${resetDate}. Consider adding a GitHub token to increase your rate limit from 60 to 5,000 requests per hour.`
      } else if (response.status === 404) {
        errorMessage = 'Resource not found'
      } else if (response.status >= 500) {
        errorMessage = 'GitHub API is currently unavailable. Please try again later.'
      } else {
        const errorData = await response.json().catch(() => ({}))
        errorMessage =
          (errorData as { message?: string }).message ||
          `Request failed with status ${response.status}`
      }

      throw new ApiErrorClass(response.status, errorMessage)
    }

    return await response.json()
  } catch (error) {
    // Re-throw ApiErrors as-is
    if (error instanceof ApiErrorClass) {
      throw error
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiErrorClass(
        0,
        'Unable to connect to GitHub. Please check your internet connection.'
      )
    }

    // Handle other errors
    throw new ApiErrorClass(
      0,
      error instanceof Error ? error.message : 'An unexpected error occurred'
    )
  }
}
