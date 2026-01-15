// Stars threshold filter

import Select from '@/components/ui/Select.tsx'
import { STARS_PRESETS } from '@/utils/constants.ts'

interface StarsFilterProps {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

export default function StarsFilter({ value, onChange }: StarsFilterProps) {
  const options = STARS_PRESETS.map((preset) => ({
    label: preset.label,
    value: preset.value?.toString() || '',
  }))

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    onChange(newValue ? Number(newValue) : undefined)
  }

  return (
    <Select
      label="Minimum Stars"
      value={value?.toString() || ''}
      onChange={handleChange}
      options={options}
      aria-label="Filter by minimum stars"
    />
  )
}
