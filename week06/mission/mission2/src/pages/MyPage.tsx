import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMyPageInfo } from '../apis/auth'; 

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const data = await getMyPageInfo(); 
        
        // 👇 여기가 수정되었습니다!
        setUserInfo(JSON.stringify(data.data)); 

      } catch (error) {
        console.error("마이페이지 정보 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>🔒 마이페이지</h1>
      <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>
      
      <button onClick={handleLogout}>
        로그아웃
      </button>

      <hr />
      <h3>(API 응답 테스트: /v1/users/me)</h3>
      <div style={{ background: '#eee', padding: '10px' }}>
        {userInfo ? userInfo : "유저 정보 없음"}
      </div>
    </div>
  );
};

export default MyPage;