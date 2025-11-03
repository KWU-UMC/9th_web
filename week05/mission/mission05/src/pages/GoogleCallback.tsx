import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { API_BASE_URL } from "../constants/key";
import axios from "../apis/axios";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { applyTokens } = useAuth();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (accessToken) {
        applyTokens(accessToken, refreshToken);
        navigate("/", { replace: true });
        return;
      }

      const code = params.get("code");
      const state = params.get("state");
      if (code) {
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/v1/auth/google/callback?${params.toString()}`
          );
          const at = data?.data?.accessToken;
          const rt = data?.data?.refreshToken ?? null;
          if (at) {
            applyTokens(at, rt);
          }
        } catch (e) {
          console.error("google callback exchange failed:", e);
        }
      }
      navigate("/", { replace: true });
    })();
  }, [location.search, applyTokens, navigate]);

  return (
    <div className="min-h-dvh flex items-center justify-center text-white">
      구글 로그인 처리 중...
    </div>
  );
}
