import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import DefaultLayout from '@/layout/DefaultLayout'
import { DeferredLoader } from '@/components'
import Home from '@/pages/home'
import Movies from '@/pages/movies'
import Series from '@/pages/series'
import { SignUp, SignIn, EditProfile } from '@/pages'
import { useFetchUser } from '@/hooks/queries/useFetchUser'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useFetchUser()

  if (isLoading) {
    return <DeferredLoader />
  }

  if (isError) {
    throw new Error('user fetch 실패')
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    ) // 인증되지 않은 경우 리다이렉트
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    // errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: '/movies',
        element: (
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        )
      },
      {
        path: '/series',
        element: (
          <ProtectedRoute>
            <Series />
          </ProtectedRoute>
        )
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/edit-profile',
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        )
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
