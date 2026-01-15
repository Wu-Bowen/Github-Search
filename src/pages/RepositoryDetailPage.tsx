// Individual repo detail view

import { useParams, Link } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout.tsx'
import RepositoryDetail from '@/components/repository/RepositoryDetail.tsx'
import Spinner from '@/components/ui/Spinner.tsx'
import ErrorMessage from '@/components/ui/ErrorMessage.tsx'
import Button from '@/components/ui/Button.tsx'
import { useRepositoryDetail } from '@/hooks/useRepositoryDetail.ts'
import { ApiErrorClass } from '@/types/api.ts'

export default function RepositoryDetailPage() {
  const { owner, name } = useParams<{ owner: string; name: string }>()

  if (!owner || !name) {
    return (
      <PageLayout>
        <ErrorMessage
          title="Invalid Repository"
          message="Repository owner or name is missing from the URL."
          action={
            <Link to="/">
              <Button variant="primary">Back to Search</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  const { data, isLoading, isError, error, refetch } = useRepositoryDetail(
    owner,
    name
  )

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="lg" className="text-blue-600 mb-4" />
          <p className="text-gray-600">Loading repository details...</p>
        </div>
      </PageLayout>
    )
  }

  if (isError && error) {
    const apiError = error as ApiErrorClass
    return (
      <PageLayout>
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Search
          </Link>
        </div>
        <ErrorMessage
          title={
            apiError.status === 404
              ? 'Repository Not Found'
              : 'Failed to Load Repository'
          }
          message={apiError.message}
          onRetry={() => refetch()}
          action={
            <Link to="/">
              <Button variant="secondary">Back to Search</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  if (!data) {
    return (
      <PageLayout>
        <ErrorMessage
          message="Repository data is not available."
          action={
            <Link to="/">
              <Button variant="primary">Back to Search</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </Link>
      </div>
      <RepositoryDetail repository={data} />
    </PageLayout>
  )
}
