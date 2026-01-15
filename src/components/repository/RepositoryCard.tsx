// Individual repository card component

import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card.tsx'
import Badge from '@/components/ui/Badge.tsx'
import RepositoryStats from './RepositoryStats.tsx'
import { formatDate } from '@/utils/formatters.ts'
import type { Repository } from '@/types/repository.ts'

interface RepositoryCardProps {
  repository: Repository
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/repo/${repository.owner.login}/${repository.name}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  // Show max 3 topics
  const displayTopics = repository.topics?.slice(0, 3) || []

  return (
    <Card
      hover
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="p-4 cursor-pointer"
      role="article"
      tabIndex={0}
      aria-label={`Repository: ${repository.full_name}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={repository.owner.avatar_url}
          alt={`${repository.owner.login} avatar`}
          className="w-12 h-12 rounded-full"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 truncate">
            {repository.full_name}
          </h3>
          <p className="text-sm text-gray-600">
            Updated {formatDate(repository.updated_at)}
          </p>
        </div>
      </div>

      {repository.description && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {repository.description}
        </p>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {repository.language && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>{repository.language}</span>
          </div>
        )}
        {repository.license && (
          <div className="text-sm text-gray-600">
            {repository.license.name}
          </div>
        )}
      </div>

      {displayTopics.length > 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {displayTopics.map((topic) => (
            <Badge key={topic} variant="primary">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      <RepositoryStats
        stars={repository.stargazers_count}
        forks={repository.forks_count}
        openIssues={repository.open_issues_count}
      />
    </Card>
  )
}
