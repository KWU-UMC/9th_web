import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RootLayout from "./layout/root-layout";
import ProtectedLayout from "./layout/protected-layout";
import { AuthProvider } from "./context/authContext";
import GoogleCallback from "./pages/GoogleCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
    ],
  },
  {
    path: "/login",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/v1/auth/google/callback",
    element: <GoogleCallback />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
