// Main search/browse page

import PageLayout from '@/components/layout/PageLayout.tsx'
import SearchBar from '@/components/search/SearchBar.tsx'
import FilterPanel from '@/components/search/FilterPanel.tsx'
import ActiveFilters from '@/components/search/ActiveFilters.tsx'
import RepositoryGrid from '@/components/repository/RepositoryGrid.tsx'
import RepositoryCard from '@/components/repository/RepositoryCard.tsx'
import RepositoryCardSkeleton from '@/components/repository/RepositoryCardSkeleton.tsx'
import Pagination from '@/components/ui/Pagination.tsx'
import EmptyState from '@/components/ui/EmptyState.tsx'
import ErrorMessage from '@/components/ui/ErrorMessage.tsx'
import { useSearchFilters } from '@/hooks/useSearchParams.ts'
import { useSearchRepositories } from '@/hooks/useSearchRepositories.ts'
import { ApiErrorClass } from '@/types/api.ts'
import { RESULTS_PER_PAGE, MAX_RESULTS } from '@/utils/constants.ts'
import type { SearchFilters } from '@/types/filters.ts'

export default function SearchPage() {
  const { filters, updateFilter, clearFilters } = useSearchFilters()

  const { data, isLoading, isFetching, isError, error, refetch } =
    useSearchRepositories(filters)

  const handleSearchChange = (query: string) => {
    updateFilter('query', query)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    updateFilter(key, value)
  }

  const handleClearFilter = (key: keyof SearchFilters) => {
    updateFilter(key, undefined)
  }

  const handlePageChange = (page: number) => {
    updateFilter('page', page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Calculate total pages
  const totalPages = data
    ? Math.min(
        Math.ceil(data.total_count / RESULTS_PER_PAGE),
        Math.ceil(MAX_RESULTS / RESULTS_PER_PAGE)
      )
    : 0

  const hasQuery = filters.query.trim().length > 0
  const hasResults = data && data.items.length > 0
  const isEmpty = data && data.items.length === 0

  return (
    <PageLayout>
      {/* Always render SearchBar in same position */}
      <div className={hasQuery ? 'mb-6' : 'max-w-3xl mx-auto mt-12'}>
        {!hasQuery && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search GitHub Repositories
            </h1>
            <p className="text-lg text-gray-600">
              Discover and explore repositories from millions of developers
            </p>
          </div>
        )}

        <SearchBar
          value={filters.query}
          onChange={handleSearchChange}
          autoFocus={!hasQuery}
          placeholder="Search repositories by name, description, or topic..."
        />
      </div>

      {/* Show filters only when there's a query */}
      {hasQuery && (
        <div className="space-y-4 mb-6">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          <ActiveFilters
            filters={filters}
            onClearFilter={handleClearFilter}
            onClearAll={clearFilters}
          />
        </div>
      )}

      {/* Initial empty state */}
      {!hasQuery && !isLoading && (
        <div className="mt-12">
          <EmptyState
            icon={
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            title="Start searching"
            description="Try searching for topics like 'react', 'machine learning', or 'web framework'"
          />
        </div>
      )}

      {/* Error state */}
      {hasQuery && isError && error && (
        <ErrorMessage
          message={(error as ApiErrorClass).message}
          onRetry={() => refetch()}
        />
      )}

      {/* Loading state */}
      {hasQuery && (isLoading || (isFetching && !data)) && (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Searching...</span>
            </div>
          </div>
          <RepositoryGrid>
            {Array.from({ length: 6 }).map((_, i) => (
              <RepositoryCardSkeleton key={i} />
            ))}
          </RepositoryGrid>
        </>
      )}

      {/* Empty results */}
      {hasQuery && isEmpty && !isLoading && (
        <EmptyState
          icon={
            <svg
              className="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="No repositories found"
          description={`No results for "${filters.query}". Try different keywords or adjust your filters.`}
        />
      )}

      {/* Results */}
      {hasQuery && hasResults && !isLoading && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">
                {data.total_count.toLocaleString()}
              </span>{' '}
              repositories found
              {data.total_count > MAX_RESULTS && (
                <span className="text-sm text-gray-500">
                  {' '}
                  (showing first {MAX_RESULTS.toLocaleString()})
                </span>
              )}
              {isFetching && (
                <span className="ml-2 text-sm text-gray-500">(updating...)</span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              Page {filters.page} of {totalPages}
            </p>
          </div>

          <RepositoryGrid>
            {data.items.map((repo) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </RepositoryGrid>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </PageLayout>
  )
}
