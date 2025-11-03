import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  const redirectURL = localStorage.getItem("redirectURL");

  if (accessToken) {
    if (redirectURL) {
      localStorage.removeItem("redirectURL");
      navigate(redirectURL);
    } else {
      navigate("/"); // 기본 경로
    }
  }
}, [accessToken, navigate]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    try {
      await login(values);
    } catch {
      alert("로그인에 실패했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직 구현
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login" ; // 실제 구글 OAuth URL로 변경
  }

  const isDisabled: boolean =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="bg-zinc-950 text-white min-h-dvh flex flex-col items-center justify-center pb-5">
      <div className="w-full max-w-[450px] px-5 lg:px-6">
        {/* 이전으로 */}
        <div
          className="mt-10 inline-flex items-center text-sm text-white hover:text-zinc-300 transition"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="mr-3 h-3.5 w-2"
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 
              32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 
              246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
              0l-192 192z"
            />
          </svg>
          <span>이전으로</span>
        </div>

        {/* 로그인 폼 */}
        <section className="mt-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold">로그인</h1>
          {/* 구글 로그인 */}
          <form className="mt-8 w-full" onSubmit={(e) => e.preventDefault()}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-800 py-3 
              text-sm font-medium text-white transition hover:bg-zinc-800/50 
              focus:outline-none focus:ring-2 focus:ring-zinc-600"
              onClick={handleGoogleLogin}
            >
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
              구글 로그인
            </button>
          </form>

          {/* 구분선 */}
          <div className="relative my-6 w-full">
            <div className="flex items-center">
              <div className="flex-grow border-t border-zinc-800" />
              <span className="mx-3 text-sm text-zinc-500">or</span>
              <div className="flex-grow border-t border-zinc-800" />
            </div>
          </div>

          {/* 이메일 로그인 */}
          <form
            className="w-full space-y-4"
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                {...getInputProps("email")}
                name="email"
                type="email"
                placeholder="이메일 입력"
                className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent 
                px-4 py-3 text-sm text-white placeholder:text-zinc-500 
                focus:border-zinc-600 focus:outline-none"
                autoComplete="email"
              />
              {errors?.email && touched?.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                {...getInputProps("password")}
                name="password"
                type="password"
                placeholder="비밀번호 입력"
                className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent 
                px-4 py-3 text-sm text-white placeholder:text-zinc-500 
                focus:border-zinc-600 focus:outline-none"
                autoComplete="current-password"
              />
              {errors?.password && touched?.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-white py-3 text-base 
              font-medium text-zinc-950 transition hover:bg-white/90 active:bg-white/80 disabled:bg-gray-500"
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              로그인
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
