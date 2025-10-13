import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './layout/RootLayout'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage nav="popular" />
      },
      {
        path: 'popular',
        element: <HomePage nav="popular" />
      },
      {
        path: 'now_playing',
        element: <HomePage nav="now_playing" />
      },
      {
        path: 'top_rated',
        element: <HomePage nav="top_rated" />
      },
      {
        path: 'upcoming',
        element: <HomePage nav="upcoming"/>
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetail />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}/>
}

export default App
