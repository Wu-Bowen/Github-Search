// React Router configuration

import { createBrowserRouter } from 'react-router-dom'
import SearchPage from '@/pages/SearchPage.tsx'
import RepositoryDetailPage from '@/pages/RepositoryDetailPage.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import App from '@/App.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: 'repo/:owner/:name',
        element: <RepositoryDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
