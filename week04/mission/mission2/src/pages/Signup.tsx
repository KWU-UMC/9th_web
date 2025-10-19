import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

export default function Signup() {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, isValid } =
    useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      console.log("회원가입", values);
      // navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-8 flex items-center gap-2"
        >
          <span className="text-2xl">←</span>
          <span>뒤로가기</span>
        </button>

        {/* 회원가입 폼 */}
        <div className="bg-gray-800 rounded-lg p-8">
          <h1 className="text-white text-3xl font-bold mb-8 text-center">
            회원가입
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 
                         placeholder-gray-500"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 
                         placeholder-gray-500"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                isValid
                  ? "bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              회원가입
            </button>
          </form>

          {/* 로그인 페이지로 이동 */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              이미 계정이 있으신가요?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-500 hover:text-pink-400 font-semibold"
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
