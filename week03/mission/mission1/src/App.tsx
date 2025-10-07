import MoviePage from './pages/MoviePage';
import './App.css'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

//BrowserRouter v5
// createBrowserRouter v6 기준으로 강의 촬영

const rounter = createBrowserRouter([
  {
    path : '/',
    element : <HomePage></HomePage>, 
    errorElement : <NotFoundPage />,
    children : [
      {
        path : 'movies/:category',
        element : <MoviePage />,
      },
      {
        path : 'movie/:movieId',
        element : <MovieDetailPage></MovieDetailPage>
      }
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={rounter} />
  );
}

export default App;
