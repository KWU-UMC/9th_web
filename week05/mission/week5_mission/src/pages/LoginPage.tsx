import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  // 🧑‍💻 일반 로그인 (임시)
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // 1) 실제 로그인 요청 (id/pw 전송)
    // const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', ... })

    // 2) 테스트용: 가짜 토큰 저장
    localStorage.setItem("accessToken", "FAKE_TOKEN_FOR_NOW");

    // 3) 원래 가려던 페이지로 이동 (없으면 홈으로)
    navigate(redirectTo, { replace: true });
  }

  // 🔑 Google 로그인 (OAuth)
  const handleGoogleLogin = () => {
    // 서버의 Google OAuth 라우트로 이동 (백엔드가 구글 로그인 화면으로 리다이렉트함)
    window.location.href = "http://localhost:8000/v1/auth/google";
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>로그인</h1>

      {/* 일반 로그인 (임시용) */}
      <form onSubmit={handleLogin} style={{ marginBottom: "2rem" }}>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          로그인 (임시)
        </button>
      </form>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* ✅ 구글 로그인 버튼 */}
      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          style={{
            width: "18px",
            height: "18px",
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        />
        Google 계정으로 로그인
      </button>
    </div>
  );
}
