// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TodoProvider } from './context/TodoContext.tsx'; // 추가

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider> {/* App을 이렇게 감싸주세요 */}
      <App />
    </TodoProvider>
  </React.StrictMode>,
);