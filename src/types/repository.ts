// Repository domain types

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics: string[]
  owner: RepositoryOwner
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  open_issues_count: number
  license: RepositoryLicense | null
  default_branch: string
  fork: boolean
  size: number
}

export interface RepositoryOwner {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
}

export interface RepositoryLicense {
  key: string
  name: string
  spdx_id: string
  url: string | null
}
