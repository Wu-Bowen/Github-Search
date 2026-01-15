// GitHub rate limit tracking hook

import { useQuery } from '@tanstack/react-query'
import { githubFetch } from '@/services/github/api.ts'
import { buildRateLimitUrl } from '@/services/github/endpoints.ts'
import { getCachedRateLimit } from '@/services/github/rateLimit.ts'
import { queryKeys } from '@/services/cache/queryKeys.ts'
import type { GitHubRateLimit } from '@/services/github/types.ts'

export function useRateLimit() {
  return useQuery({
    queryKey: queryKeys.rateLimit.status,
    queryFn: async () => {
      const url = buildRateLimitUrl()
      return githubFetch<GitHubRateLimit>(url)
    },
    // Use cached rate limit as placeholder data
    placeholderData: () => {
      const cached = getCachedRateLimit()
      return cached
        ? {
            rate: cached,
            resources: { core: cached, search: cached },
          }
        : undefined
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  })
}
