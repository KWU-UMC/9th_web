import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RootLayout from './layout/RootLayout';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <Login />},
      {path: 'signup', element: <Signup />},
      {path: 'my', element: <MyPage />}
    ]
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
