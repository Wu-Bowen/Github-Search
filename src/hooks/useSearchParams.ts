// URL search params management

import { useSearchParams as useRouterSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import type { SearchFilters } from '@/types/filters.ts'

export function useSearchFilters() {
  const [searchParams, setSearchParams] = useRouterSearchParams()

  const filters: SearchFilters = {
    query: searchParams.get('q') || '',
    language: searchParams.get('language') || undefined,
    stars: searchParams.get('stars')
      ? Number(searchParams.get('stars'))
      : undefined,
    sort: (searchParams.get('sort') as SearchFilters['sort']) || 'best-match',
    order: (searchParams.get('order') as SearchFilters['order']) || 'desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  }

  const updateFilter = useCallback(
    (key: keyof SearchFilters, value: string | number | undefined) => {
      setSearchParams((prev) => {
        // Map 'query' key to 'q' for shorter URLs
        const urlKey = key === 'query' ? 'q' : key

        if (value !== undefined && value !== '') {
          prev.set(urlKey, value.toString())
        } else {
          prev.delete(urlKey)
        }

        // Reset page when filters change (except when page itself changes)
        if (key !== 'page') {
          prev.set('page', '1')
        }

        return prev
      })
    },
    [setSearchParams]
  )

  const clearFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  return { filters, updateFilter, clearFilters }
}
