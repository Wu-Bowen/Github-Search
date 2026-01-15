// React Query configuration

import { QueryClient } from '@tanstack/react-query'
import { ApiErrorClass } from '@/types/api.ts'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 404 or rate limit (403)
        if (error instanceof ApiErrorClass) {
          if (error.status === 404 || error.status === 403) {
            return false
          }
        }
        // Retry other errors max 2 times
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})
