import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // ⭐️ useLocation 추가
import { loginUser } from '../apis/auth'; // 네가 만든 api

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ⭐️ location 훅 사용

  // ⭐️ (미션) ProtectedLayout이 넘겨준 'from' state를 확인
  const from = location.state?.from?.pathname || '/'; // 없으면 홈으로

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const data = await loginUser(loginData); // 네가 만든 api
      login(data.data.accessToken, data.data.refreshToken); // 컨텍스트 함수
      
      // ⭐️ (미션) /mypage가 아닌, 원래 가려던 페이지(from)로 이동
      navigate(from, { replace: true }); 
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인하세요.");
    }
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
        <button type="submit">로그인</button>
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