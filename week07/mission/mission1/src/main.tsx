import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext'; // 1단계에서 만든 Provider

// 1. QueryClient 인스턴스 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // ⭐️ 여기부터 '보이지 않는 공백'을 모두 수정했어
  <React.StrictMode>
    {/* 2. QueryProvider로 감싸기 */}
    <QueryClientProvider client={queryClient}>
      {/* 3. AuthProvider로 감싸기 */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);