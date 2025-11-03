import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found";
import RootLayout from "./layout/root-layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import  ProtectedLayout from "./layout/ProtectedLayout";

// publicRoutes: 인증없이 접근 가능한 라우트
const publicRoutes: RouteObject = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
];

// privateRoutes: 인증 후에 접근 가능한 라우트
const privateRoutes: RouteObject = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "my", element: <MyPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
