// Filter controls container

import LanguageFilter from './LanguageFilter.tsx'
import StarsFilter from './StarsFilter.tsx'
import SortControl from './SortControl.tsx'
import type { SearchFilters, SortOption, SortOrder } from '@/types/filters.ts'

interface FilterPanelProps {
  filters: SearchFilters
  onFilterChange: (key: keyof SearchFilters, value: any) => void
}

export default function FilterPanel({
  filters,
  onFilterChange,
}: FilterPanelProps) {
  const handleSortChange = (sort: SortOption, order: SortOrder) => {
    onFilterChange('sort', sort)
    onFilterChange('order', order)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <LanguageFilter
        value={filters.language}
        onChange={(value) => onFilterChange('language', value)}
      />
      <StarsFilter
        value={filters.stars}
        onChange={(value) => onFilterChange('stars', value)}
      />
      <SortControl
        sort={filters.sort}
        order={filters.order}
        onChange={handleSortChange}
      />
    </div>
  )
}
