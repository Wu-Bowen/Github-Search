// React Query hook for repository details

import { useQuery } from '@tanstack/react-query'
import { githubFetch } from '@/services/github/api.ts'
import { buildRepositoryUrl } from '@/services/github/endpoints.ts'
import { queryKeys } from '@/services/cache/queryKeys.ts'
import type { Repository } from '@/types/repository.ts'

export function useRepositoryDetail(owner: string, name: string) {
  return useQuery({
    queryKey: queryKeys.repositories.detail(owner, name),
    queryFn: async () => {
      const url = buildRepositoryUrl(owner, name)
      return githubFetch<Repository>(url)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
