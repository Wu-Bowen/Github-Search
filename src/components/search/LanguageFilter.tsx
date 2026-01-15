// Language dropdown filter

import Select from '@/components/ui/Select.tsx'
import { POPULAR_LANGUAGES } from '@/utils/constants.ts'

interface LanguageFilterProps {
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export default function LanguageFilter({
  value,
  onChange,
}: LanguageFilterProps) {
  const options = [
    { label: 'Any Language', value: '' },
    ...POPULAR_LANGUAGES.map((lang) => ({ label: lang, value: lang })),
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    onChange(newValue || undefined)
  }

  return (
    <Select
      label="Language"
      value={value || ''}
      onChange={handleChange}
      options={options}
      aria-label="Filter by programming language"
    />
  )
}
