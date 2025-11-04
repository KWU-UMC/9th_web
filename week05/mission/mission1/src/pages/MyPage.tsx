import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // AuthContext의 logout 함수 실행 (토큰 삭제, 상태 변경)
    navigate('/'); // 로그아웃 후 홈페이지로 이동
  };

  return (
    <div>
      <h1>마이페이지</h1>
      <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>
      
      <button onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;