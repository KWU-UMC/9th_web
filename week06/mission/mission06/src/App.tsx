import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RootLayout from './layout/RootLayout';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleUserInformation from './pages/GoogleUserInformation';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetail from './pages/LpDetail';

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
      {path: "lps/:lpId", element: <LpDetail />},
    ],
  },
];

const router = createBrowserRouter([...routes, ...protectedRoutes]);

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App