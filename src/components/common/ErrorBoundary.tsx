// React error boundary component

import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import ErrorMessage from '@/components/ui/ErrorMessage.tsx'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <ErrorMessage
            title="Application Error"
            message={
              this.state.error?.message ||
              'An unexpected error occurred. Please refresh the page.'
            }
            onRetry={() => window.location.reload()}
          />
        </div>
      )
    }

    return this.props.children
  }
}
