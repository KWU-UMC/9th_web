import './App.css'
import RootLayout from './layout/root-layout';
import DetailMovie from './pages/detailMoviePage';
import ErrorPage from './pages/errorPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import SignPage from './pages/signupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

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

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App;
