// Detailed repository information component

import Card from '@/components/ui/Card.tsx'
import Badge from '@/components/ui/Badge.tsx'
import RepositoryStats from './RepositoryStats.tsx'
import { formatDate, formatNumber } from '@/utils/formatters.ts'
import type { Repository } from '@/types/repository.ts'

interface RepositoryDetailProps {
  repository: Repository
}

export default function RepositoryDetail({
  repository,
}: RepositoryDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={repository.owner.avatar_url}
            alt={`${repository.owner.login} avatar`}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {repository.full_name}
            </h1>
            {repository.description && (
              <p className="text-lg text-gray-700 mb-3">
                {repository.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              {repository.homepage && (
                <a
                  href={repository.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <RepositoryStats
            stars={repository.stargazers_count}
            forks={repository.forks_count}
            watchers={repository.watchers_count}
            openIssues={repository.open_issues_count}
          />
        </div>

        {repository.topics && repository.topics.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {repository.topics.map((topic) => (
              <Badge key={topic} variant="primary">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Repository Info
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Owner</span>
              <span className="font-medium">{repository.owner.login}</span>
            </div>
            {repository.language && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium">{repository.language}</span>
              </div>
            )}
            {repository.license && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">License</span>
                <span className="font-medium">{repository.license.name}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Default Branch</span>
              <span className="font-medium">{repository.default_branch}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Activity
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Created</span>
              <span className="font-medium">
                {formatDate(repository.created_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">
                {formatDate(repository.updated_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Pushed</span>
              <span className="font-medium">
                {formatDate(repository.pushed_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Size</span>
              <span className="font-medium">
                {formatNumber(repository.size)} KB
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
