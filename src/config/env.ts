// Environment variables validation

const env = {
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN || null,
  GITHUB_API_BASE:
    import.meta.env.VITE_GITHUB_API_BASE || 'https://api.github.com',
} as const

export default env
