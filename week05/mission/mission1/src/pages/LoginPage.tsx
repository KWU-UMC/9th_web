import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. 실제 로그인 API 호출 (axios 등 사용)
    // const response = await authApi.login(username, password);
    // const token = response.data.accessToken;

    // 2. 테스트용 임시 토큰
    const fakeToken = 'my-fake-access-token';

    // 3. Context의 login 함수 호출 (AuthContext 상태 변경)
    login(fakeToken);

    // 4. 로그인 후 원하는 페이지로 이동 (예: 마이페이지)
    navigate('/mypage');
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>LoginPage</div>
      <button type="submit">로그인 (테스트)</button>
    </form>
  );
};

export default LoginPage;