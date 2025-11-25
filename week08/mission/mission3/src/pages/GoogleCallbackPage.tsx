import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
      navigate('/mypage');
    } else {
      alert('구글 로그인에 실패했습니다.');
      navigate('/login');
    }
  }, [searchParams, login, navigate]);

  return <div>구글
로그인
처리
중...</div>;
};

export default GoogleCallbackPage;