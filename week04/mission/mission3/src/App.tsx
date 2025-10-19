import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RootLayout from "./layout/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
