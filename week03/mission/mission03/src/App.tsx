import './App.css'
import RootLayout from './layout/root-layout';
import DetailMovie from './pages/detailMoviePage';
import ErrorPage from './pages/errorPage';
import HomePage from './pages/homePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:'/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path:'popular',
        element: <MoviePage />
      },
      {
        path:'popular/:movieId',
        element: <DetailMovie />
      },
      {
        path:'playing',
        element: <MoviePage />
      },
      {
        path:'playing/:movieId',
        element: <DetailMovie />
      },
      {
        path:'top_rated',
        element: <MoviePage />
      },
      {
        path:'top_rated/:movieId',
        element: <DetailMovie />
      },
      {
        path:'upcoming',
        element: <MoviePage />
      },
      {
        path:'upcoming/:movieId',
        element: <DetailMovie />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ] 
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
