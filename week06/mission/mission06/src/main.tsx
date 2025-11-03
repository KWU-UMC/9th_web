// src/main.tsx  ← 이 파일이 엔트리이므로 여기만 쓰자
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layout/RootLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LpDetail from "./pages/LpDetail";
import MyPage from "./pages/MyPage";
import GoogleUserInformation from "./pages/GoogleUserInformation";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      // ✅ 콜백 경로 둘 다 받아주기 (백엔드 설정에 따라 어느 쪽이든 매칭)
      { path: "/oauth/google", element: <GoogleUserInformation /> },
      { path: "/v1/auth/google/callback", element: <GoogleUserInformation /> },
      // ✅ 상세는 공개(로그인 없이 열람 가능)
      { path: "/lps/:lpId", element: <LpDetail /> },
    ],
  },
  // ✅ 보호 구간은 마이페이지만
  { element: <ProtectedLayout />, children: [{ path: "/my", element: <MyPage /> }] },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
