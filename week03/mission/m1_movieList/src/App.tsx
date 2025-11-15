import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MoviesPage from './pages/movies'
import NotFound from './pages/not-found'
import RootLayout from './layout/root-layout'
import HomePage from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MoviesPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
