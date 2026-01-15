// Display active filters with clear buttons

import Button from '@/components/ui/Button.tsx'
import Badge from '@/components/ui/Badge.tsx'
import type { SearchFilters } from '@/types/filters.ts'

interface ActiveFiltersProps {
  filters: SearchFilters
  onClearFilter: (key: keyof SearchFilters) => void
  onClearAll: () => void
}

export default function ActiveFilters({
  filters,
  onClearFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const activeFilters: Array<{ key: keyof SearchFilters; label: string }> = []

  if (filters.language) {
    activeFilters.push({ key: 'language', label: `Language: ${filters.language}` })
  }
  if (filters.stars) {
    activeFilters.push({ key: 'stars', label: `Stars: ${filters.stars}+` })
  }
  if (filters.sort && filters.sort !== 'best-match') {
    const sortLabel = filters.sort.charAt(0).toUpperCase() + filters.sort.slice(1)
    activeFilters.push({
      key: 'sort',
      label: `Sort: ${sortLabel} (${filters.order})`,
    })
  }

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => onClearFilter(filter.key)}
        >
          {filter.label}
          <button
            type="button"
            className="hover:text-purple-900"
            aria-label={`Remove ${filter.label} filter`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-purple-600 hover:text-purple-700"
      >
        Clear all
      </Button>
    </div>
  )
}
