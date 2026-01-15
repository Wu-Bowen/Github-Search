// GitHub API response types

import type { Repository } from '@/types/repository.ts'

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

export interface GitHubRateLimit {
  resources: {
    core: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
    search: {
      limit: number
      remaining: number
      reset: number
      used: number
    }
  }
  rate: {
    limit: number
    remaining: number
    reset: number
    used: number
  }
}

export interface GitHubReadme {
  content: string // Base64 encoded
  encoding: string
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  download_url: string
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
  used: number
}
