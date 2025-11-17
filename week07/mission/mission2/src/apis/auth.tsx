// src/apis/auth.tsx
import { api } from './axios';

// ... (loginUser, refreshAccessToken, getMyPageInfo, signupUser 함수는 동일) ...
export const loginUser = async (loginData: any) => { /* ... */ };
export const refreshAccessToken = async () => { /* ... */ };
export const getMyPageInfo = async () => { /* ... */ };
export const signupUser = async (signupData: any) => { /* ... */ };

// ... (3단계에서 추가한 UserUpdateData, updateMyInfo 함수는 동일) ...
export interface UserUpdateData { /* ... */ }
export const updateMyInfo = async (data: UserUpdateData) => { /* ... */ };


// --- (⭐️ 7주차 4단계 신규 추가 ⭐️) ---

// (신규) 로그아웃 (D) 가짜 API
export const logoutUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 딜레이
  console.log('👋 [Mock API] 로그아웃 요청');
  return { success: true };
};

// (신규) 회원 탈퇴 (D) 가짜 API
export const deleteAccount = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 딜레이
  console.log('🔥 [Mock API] 회원 탈퇴 요청');
  return { success: true, message: '회원 탈퇴가 완료되었습니다.' };
};