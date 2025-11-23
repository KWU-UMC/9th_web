import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";
import { useAuth } from "../context/authContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      // 로그인 성공 시 원래 경로로 복귀
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-8 flex items-center gap-2 hover:text-pink-500 transition"
        >
          <span className="text-2xl">←</span>
          <span>뒤로가기</span>
        </button>

        {/* 로그인 폼 */}
        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-white text-3xl font-bold mb-6 text-center">
            로그인
          </h1>

          <GoogleLoginButton />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register("email")}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password")}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isValid
                  ? "bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
