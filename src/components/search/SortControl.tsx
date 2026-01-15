// Sort order dropdown

import Select from '@/components/ui/Select.tsx'
import { SORT_OPTIONS } from '@/utils/constants.ts'
import type { SortOption, SortOrder } from '@/types/filters.ts'

interface SortControlProps {
  sort: SortOption
  order: SortOrder
  onChange: (sort: SortOption, order: SortOrder) => void
}

export default function SortControl({
  sort,
  order,
  onChange,
}: SortControlProps) {
  // Create a combined value for the select (e.g., "stars:desc")
  const currentValue =
    sort === 'best-match' ? 'best-match' : `${sort}:${order}`

  const options = SORT_OPTIONS.map((option) => {
    const value =
      option.value === 'best-match'
        ? 'best-match'
        : `${option.value}:${option.order || 'desc'}`
    return {
      label: option.label,
      value,
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'best-match') {
      onChange('best-match', 'desc')
    } else {
      const [sortValue, orderValue] = value.split(':')
      onChange(sortValue as SortOption, orderValue as SortOrder)
    }
  }

  return (
    <Select
      label="Sort by"
      value={currentValue}
      onChange={handleChange}
      options={options}
      aria-label="Sort repositories"
    />
  )
}
