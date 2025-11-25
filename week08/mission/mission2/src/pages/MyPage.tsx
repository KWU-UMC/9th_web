// src/pages/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMyPageInfo } from '../apis/auth'; 
import { useUpdateMyInfo } from '../hooks/mutations/useUserMutations';

// --- (스타일 코드는 3-4 단계와 동일) ---
const FormWrapper = styled.div` /* ... */ `;
const Input = styled.input` /* ... */ `;
const TextArea = styled.textarea` /* ... */ `;
const Button = styled.button` /* ... */ `;
const ButtonGroup = styled.div` /* ... */ `;
// --- (스타일 코드 끝) ---

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // 1. ⭐️ useQuery 수정
  const {
    data: userInfo,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['myInfo'],
    
    // ⭐️ [오류 수정] getMyPageInfo가 { data: ... }를 반환하므로 .data를 붙임
    queryFn: () => getMyPageInfo().then(res => res.data), 
    
    staleTime: 1000 * 60 * 5,
  });

  const updateInfo = useUpdateMyInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setBio(userInfo.bio || ''); 
    }
  }, [userInfo]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditSave = () => {
    if (!name.trim()) {
      alert('이름은 필수입니다.');
      return;
    }
    updateInfo.mutate(
      { name, bio }, 
      { onSuccess: () => setIsEditing(false) }
    );
  };

  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;

  return (
    <div>
      <h1>🔒 마이페이지</h1>
      <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>
      
      {!isEditing ? (
        <FormWrapper>
          <p>이름: {userInfo?.name}</p>
          <p>이메일: {userInfo?.email}</p>
          <p>Bio: {userInfo?.bio || '소개 없음'}</p>
          <Button onClick={() => setIsEditing(true)}>설정 (수정)</Button>
        </FormWrapper>
      ) : (
        <FormWrapper>
          <h3>프로필 수정</h3>
          <label htmlFor="mypage-name">이름 (필수):</label>
          <Input 
            id="mypage-name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <label htmlFor="mypage-bio">Bio (옵션):</label>
          <TextArea 
            id="mypage-bio"
            value={bio} 
            // ⭐️ [오타 수정] e.gtarget.value -> e.target.value
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
          />
          <ButtonGroup>
            <Button onClick={handleEditSave} disabled={updateInfo.isPending}>
              {updateInfo.isPending ? '저장 중...' : '저장'}
            </Button>
            <Button onClick={() => setIsEditing(false)} disabled={updateInfo.isPending}
              style={{ backgroundColor: '#535353', color: 'white' }}
            >
              취소
            </Button>
          </ButtonGroup>
        </FormWrapper>
      )}

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        로그아웃 (임시)
      </button>
    </div>
  );
};

export default MyPage;