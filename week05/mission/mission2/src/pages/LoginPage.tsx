import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../apis/auth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const data = await loginUser(loginData);


      login(data.data.accessToken, data.data.refreshToken);

      navigate('/mypage');
    } catch (error) {
      console.error('로그인 실패:',error);
      alert('이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h1>🔑
로그인
페이지</h1>

      <div>
        <label>이메일:
</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="email"
        />
      </div>

      <div>
        <label>비밀번호:
</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <button type="submit">로그인</button>

      <p>
        계정이
없나요?
<Link to="/signup">회원가입하기</Link>
      </p>
    </form>
  );
};

export default LoginPage;