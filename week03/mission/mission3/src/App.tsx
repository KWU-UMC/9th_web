import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import Movies from "./pages/movies";
import RootLayout from "./layout/root-layout";
import MovieDetailPage from "./pages/movie-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: <Movies />,
      },
      {
        path: "moviedetail/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
