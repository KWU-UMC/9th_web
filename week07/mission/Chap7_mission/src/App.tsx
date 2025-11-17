import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found";
import HomeLayout from "./layout/HomeLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LpDetailPage } from "./pages/LpDetailPage";

// publicRoutes: 인증없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// privateRoutes: 인증 후에 접근 가능한 라우트
const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "my", element: <MyPage /> },
      { path: "lp/:lpid", element: <LpDetailPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
