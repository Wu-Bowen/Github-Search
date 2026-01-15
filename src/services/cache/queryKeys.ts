// React Query key factories

import type { SearchFilters } from '@/types/filters.ts'

export const queryKeys = {
  repositories: {
    all: ['repositories'] as const,
    search: (filters: SearchFilters) => ['repositories', 'search', filters] as const,
    detail: (owner: string, name: string) =>
      ['repositories', 'detail', owner, name] as const,
    readme: (owner: string, name: string) =>
      ['repositories', 'readme', owner, name] as const,
  },
  rateLimit: {
    status: ['rateLimit', 'status'] as const,
  },
} as const
