import { useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "../hooks/useForm";
import { postJSON } from "../lib/api";
import { useNavigate } from "react-router-dom";

type LoginResponse = { access_token: string; refresh_token?: string };

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const { values, errors, isSubmitting, setIsSubmitting, handleChange, validateAll } = useForm(
    { email: "", password: "" },
    {
      email: (v) => {
        if (!v) return "이메일을 입력해주세요.";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(v)) return "올바른 이메일 형식을 입력해주세요.";
        return null;
      },
      password: (v) => {
        if (!v) return "비밀번호를 입력해주세요.";
        if (v.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
        return null;
      },
    }
  );

  const isValid = !!values.email && !!values.password && !errors.email && !errors.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validateAll()) return;

    try {
      setIsSubmitting(true);
      const data = await postJSON<LoginResponse>("/auth/login", values);
      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
      navigate("/");
    } catch (err: any) {
      setServerError(err?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <BackButton />

      <div className="w-full max-w-sm bg-black rounded-lg p-6 shadow-md border border-gray-800">
        <h1 className="text-center text-xl mb-6 font-bold">로그인</h1>

        <button className="w-full flex items-center justify-center border border-gray-600 py-2 rounded-lg hover:bg-gray-800">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            className="w-5 h-5 mr-2"
          />
          구글 로그인
        </button>

        <div className="text-center text-gray-400 my-3">OR</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요!"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </div>
    </div>
  );
}
