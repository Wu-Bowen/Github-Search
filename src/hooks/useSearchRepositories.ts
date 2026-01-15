// React Query hook for searching repositories

import { useQuery } from '@tanstack/react-query'
import { githubFetch } from '@/services/github/api.ts'
import { buildSearchUrl } from '@/services/github/endpoints.ts'
import { queryKeys } from '@/services/cache/queryKeys.ts'
import { useDebounce } from './useDebounce.ts'
import { DEBOUNCE_DELAY } from '@/utils/constants.ts'
import type { SearchFilters } from '@/types/filters.ts'
import type { GitHubSearchResponse } from '@/services/github/types.ts'

export function useSearchRepositories(filters: SearchFilters) {
  // Debounce the search query to avoid making too many API calls
  const debouncedQuery = useDebounce(filters.query, DEBOUNCE_DELAY)

  return useQuery({
    queryKey: queryKeys.repositories.search({
      ...filters,
      query: debouncedQuery,
    }),
    queryFn: async () => {
      // Don't make API call if query is empty
      if (!debouncedQuery.trim()) {
        return { items: [], total_count: 0, incomplete_results: false }
      }

      const url = buildSearchUrl({ ...filters, query: debouncedQuery })
      return githubFetch<GitHubSearchResponse>(url)
    },
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
