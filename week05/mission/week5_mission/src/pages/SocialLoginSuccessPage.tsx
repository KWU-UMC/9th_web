import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SocialLoginSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("accessToken");

    if (token) {
      // 이 토큰이 ProtectedRoute에서 쓸 액세스 토큰
      localStorage.setItem("accessToken", token);
      navigate("/mypage", { replace: true });
    } else {
      // 실패 시 로그인으로 돌리기
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      소셜 로그인 처리 중입니다...
    </div>
  );
}
