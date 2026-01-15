// Search filter types

export type SortOption =
  | 'best-match'
  | 'stars'
  | 'forks'
  | 'help-wanted-issues'
  | 'updated'

export type SortOrder = 'asc' | 'desc'

export interface SearchFilters {
  query: string
  language?: string
  stars?: number
  sort: SortOption
  order: SortOrder
  page: number
}
