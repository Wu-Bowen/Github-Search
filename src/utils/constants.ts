// App-wide constants

export const POPULAR_LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'Shell',
  'C',
  'Dart',
  'Scala',
] as const

export const STARS_PRESETS = [
  { label: 'Any', value: undefined },
  { label: '100+', value: 100 },
  { label: '500+', value: 500 },
  { label: '1,000+', value: 1000 },
  { label: '5,000+', value: 5000 },
  { label: '10,000+', value: 10000 },
] as const

export const SORT_OPTIONS = [
  { label: 'Best match', value: 'best-match' },
  { label: 'Most stars', value: 'stars', order: 'desc' },
  { label: 'Fewest stars', value: 'stars', order: 'asc' },
  { label: 'Most forks', value: 'forks', order: 'desc' },
  { label: 'Fewest forks', value: 'forks', order: 'asc' },
  { label: 'Recently updated', value: 'updated', order: 'desc' },
  { label: 'Least recently updated', value: 'updated', order: 'asc' },
] as const

export const RESULTS_PER_PAGE = 30
export const MAX_RESULTS = 1000
export const DEBOUNCE_DELAY = 500
