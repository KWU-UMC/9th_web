import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RootLayout from "./layout/root-layout";
import ProtectedLayout from "./layout/protected-layout";
import { AuthProvider } from "./context/authContext";
import MyPage from "./pages/MyPage";
import GoogleCallback from "./pages/GoogleCallback";

const router = createBrowserRouter([

  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/login",
    element: <RootLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/signup",
    element: <RootLayout />,
    children: [{ index: true, element: <Signup /> }],
  },

  {
    path: "/oauth/google/callback",
    element: <RootLayout />,
    children: [{ index: true, element: <GoogleCallback /> }],
  },

  {
  path: "/v1/auth/google/callback",
  element: <RootLayout />,
  children: [{ index: true, element: <GoogleCallback /> }],
  },

  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [{ path: "/me", element: <MyPage /> }],
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

