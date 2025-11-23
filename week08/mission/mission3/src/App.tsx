import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import './App.css'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layouts/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/LpDetailPage'
import { useState } from 'react'
import WriteModal from './components/WriteModal'

const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [ 
      {index: true, element: <HomePage/>},
      {path: 'login', element:<LoginPage />},
      {path: 'signup', element:<SignupPage />},
      {path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage />},
    ]
  }
];

const protectedRoutes:RouteObject[] = [
  {
    path:'/',
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children:[
      {path:'my',element:<MyPage/>},
      { path: 'lp/:lpid', element: <LpDetailPage /> }
    ]
  }
]

const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: 3,
    }
  }
});

function App() {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const handleOpenModal = () => {
    // AuthProvider 안쪽에서 훅 사용
    // App에서는 직접 useAuth 호출 X
    setIsWriteModalOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />

        {import.meta.env.DEV && (
          <div style={{ display: 'none' }}>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        )}

        <button
          className="fixed bottom-4 right-4 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-700"
          onClick={() => setIsWriteModalOpen(true)}
        >
          +
        </button>

        {isWriteModalOpen && <WriteModal onClose={() => setIsWriteModalOpen(false)} />}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
