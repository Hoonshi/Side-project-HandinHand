import DefaultLayout from '@/layout/DefaultLayout'
import Home from '@/pages/Home'
import Movies from '@/pages/movies'
import Series from '@/pages/series'
import SignIn from '@/pages/signin'
import SignUp from '@/pages/signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/series',
        element: <Series />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <SignUp />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
