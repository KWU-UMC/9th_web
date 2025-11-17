// src/pages/LoginPage.tsx
import React, { useState } from 'react';
// ⭐️ useAuth, useNavigate, useLocation은 useLogin 훅이 내부에서 사용하므로 삭제
import { Link, useLocation } from 'react-router-dom'; 
// import { loginUser } from '../apis/auth'; // ⭐️ API 직접 호출 제거
import { useLogin } from '../hooks/mutations/useAuthMutations'; // ⭐️ 4-2 훅 임포트

// ⭐️ (신규) useLogin 훅에서 사용할 수 있도록 타입 export
export interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  // const { login } = useAuth(); // ⭐️ 제거
  // const navigate = useNavigate(); // ⭐️ 제거
  // const location = useLocation(); // ⭐️ 제거 (훅 내부에서 사용)
  // const from = location.state?.from?.pathname || '/'; // ⭐️ 제거

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. ⭐️ useLogin 훅 사용
  const { mutate: loginMutate, isPending } = useLogin();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData: LoginData = { email, password };
    
    // 2. ⭐️ try-catch 대신 mutate 함수 호출
    loginMutate(loginData);
  };

  // (기존 폼 UI는 그대로 사용)
  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h1>🔑 로그인 페이지</h1>
        <div>
          <label>이메일: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>비밀번호: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* 3. ⭐️ 로딩 상태 반영 */}
        <button type="submit" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </button>
        <p><Link to="/signup">회원가입하기</Link></p>
      </form>
      <hr />
      <a href="http://localhost:8000/v1/auth/google/login">
        구글로 로그인하기
      </a>
    </div>
  );
};

export default LoginPage;