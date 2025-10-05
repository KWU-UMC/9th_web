import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>,
    errorElement:<NotFoundPage />,
    children:[
      {
        path: 'movies/:category',
        element: <MoviePage/>
      },
    ],
  },

  ])

export default function App() {
  return <RouterProvider router={router}/>
}

