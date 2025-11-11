import './App.css'
import RootLayout from './layout/root-layout';
import ErrorPage from './pages/errorPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import SignPage from './pages/signupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//publicRoutes:인증 없이 접근 가능
const publicRoutes:RouteObject[]=[
  {
    path:'/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path:'login',
        element: <LoginPage />
      },
      {
        path:'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />
      },
      {
        path:'sign',
        element: <SignPage />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ] 
  },
];

//protectedRoutes: 인증 필요
const protectedRoutes:RouteObject[]=[
  {
    path:"/",
    element:<ProtectedLayout/>,
    children:[
    {
      path:"my",
      element:<MyPage/>
    }]
  }
]
const router=createBrowserRouter([...publicRoutes,...protectedRoutes]);

/* eslint-disable-next-line react-refresh/only-export-components */
export const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        {import.meta.env.DEV&&<ReactQueryDevtools initialIsOpen={false}/>}
      </QueryClientProvider>
    </>
  )
}

export default App;
