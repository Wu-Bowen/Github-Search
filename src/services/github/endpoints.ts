// GitHub API endpoint builders

import env from '@/config/env.ts'
import type { SearchFilters } from '@/types/filters.ts'

const API_BASE = env.GITHUB_API_BASE

export function buildSearchQuery(
  query: string,
  filters: Pick<SearchFilters, 'language' | 'stars'>
): string {
  const parts: string[] = [query]

  if (filters.language) {
    parts.push(`language:${filters.language}`)
  }

  if (filters.stars) {
    parts.push(`stars:>=${filters.stars}`)
  }

  return parts.join(' ')
}

export function buildSearchUrl(filters: SearchFilters): string {
  const searchQuery = buildSearchQuery(filters.query, filters)
  const params = new URLSearchParams({
    q: searchQuery,
    per_page: '30',
    page: filters.page.toString(),
  })

  if (filters.sort && filters.sort !== 'best-match') {
    params.set('sort', filters.sort)
    params.set('order', filters.order)
  }

  return `${API_BASE}/search/repositories?${params}`
}

export function buildRepositoryUrl(owner: string, name: string): string {
  return `${API_BASE}/repos/${owner}/${name}`
}

export function buildReadmeUrl(owner: string, name: string): string {
  return `${API_BASE}/repos/${owner}/${name}/readme`
}

export function buildRateLimitUrl(): string {
  return `${API_BASE}/rate_limit`
}
