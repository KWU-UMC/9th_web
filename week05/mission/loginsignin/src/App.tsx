import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RootLayout from './layout/RootLayout';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleUserInformation from './pages/GoogleUserInformation';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <Login />},
      {path: 'signup', element: <Signup />},
      {path: '/v1/auth/google/callback', element: <GoogleUserInformation />},
    ]
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {path: "my", element: <MyPage />},
    ],
  },
];

const router = createBrowserRouter([...routes, ...protectedRoutes]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
