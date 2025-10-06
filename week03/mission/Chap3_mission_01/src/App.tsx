import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1) 만든 페이지 import
import HomePage from "./pages/Homepage";
import NotFound from "./pages/not-found";
import MoviesPage from "./pages/MoviesPage";
import RootLayout from "./layout/root-layout";

// 2) 라우터에 연결
const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        // 2) index: true → 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage />,
      },
      {
        // 3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
        path: 'movies',
        element: <MoviesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
