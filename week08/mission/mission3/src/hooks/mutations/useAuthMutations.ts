// src/hooks/mutations/useAuthMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, logoutUser, deleteAccount } from '../../apis/auth'; // ⭐️ 상대 경로
import { useAuth } from '../../context/AuthContext'; // ⭐️ 상대 경로
import type { LoginData } from '../../pages/LoginPage'; // ⭐️ (4-3에서 export 예정)

// 1. 로그인 훅
export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // ProtectedLayout에서 전달한 state.from을 확인
  const from = location.state?.from?.pathname || '/';

  return useMutation({
    mutationFn: (loginData: LoginData) => loginUser(loginData),
    onSuccess: (data) => {
      // API 응답에서 토큰을 가져와 Context에 저장
      login(data.data.accessToken, data.data.refreshToken);
      // 원래 가려던 페이지로 이동
      navigate(from, { replace: true });
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('이메일 또는 비밀번호를 확인하세요.');
    },
  });
};

// 2. 로그아웃 훅
export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // 1. AuthContext의 상태(토큰, 유저) 비우기
      logout();
      // 2. React Query 캐시 비우기 (로그인 기반 모든 데이터)
      queryClient.clear();
      // 3. 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  });
};

// 3. 회원 탈퇴 훅
export const useDeleteAccount = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다. (Mock)');
      // 1. AuthContext 상태 비우기 (로그아웃과 동일)
      logout();
      // 2. React Query 캐시 비우기
      queryClient.clear();
      // 3. 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다.');
    },
  });
};