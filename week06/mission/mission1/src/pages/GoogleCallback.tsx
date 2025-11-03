import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useEffect(() => {
    console.log("=== Google Callback 시작 ===");
    console.log("현재 URL:", window.location.href);

    const params = new URLSearchParams(window.location.search);

    console.log("쿼리 파라미터:");
    console.log("- userId:", params.get("userId"));
    console.log("- name:", params.get("name"));
    console.log("- accessToken:", params.get("accessToken"));
    console.log("- refreshToken:", params.get("refreshToken"));

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const name = params.get("name");

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken, name);

      navigate("/");
    } else {
      console.error(" 토큰이 없습니다");
      navigate("/");
    }
  }, [navigate, setTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-center">
        <div className="text-2xl mb-4">🔄</div>
        <p className="text-xl mb-2">구글 로그인 처리 중...</p>
        <p className="text-sm text-gray-400">잠시만 기다려주세요</p>
      </div>
    </div>
  );
}
