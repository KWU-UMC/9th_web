import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
} from "../schemas/authSchema";
import { signup } from "../apis/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  // 비밀번호 표시/숨김
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // 1단계 폼
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
  });

  // 2단계 폼
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
  });

  // 3단계 폼
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    mode: "onChange",
  });

  // 1단계 제출
  const onStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, email: data.email }));
    setStep(2);
  };

  // 2단계 제출
  const onStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, password: data.password }));
    setStep(3);
  };

  // 3단계 제출
  const onStep3Submit = (data: Step3Data) => {
    const finalData = { ...formData, nickname: data.nickname };
    try {
      signup({
        email: finalData.email,
        password: finalData.password,
        name: finalData.nickname,
        bio: null,
        avatar: null,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
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

          {/* 1단계: 이메일 */}
          {step === 1 && (
            <form
              onSubmit={step1Form.handleSubmit(onStep1Submit)}
              className="space-y-6"
            >
              <div>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...step1Form.register("email")}
                  className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500"
                />
                {step1Form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {step1Form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!step1Form.formState.isValid}
                className={`w-full py-3 rounded-lg font-semibold ${
                  step1Form.formState.isValid
                    ? "bg-pink-600  text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </form>
          )}

          {/* 2단계: 비밀번호 */}
          {step === 2 && (
            <form
              onSubmit={step2Form.handleSubmit(onStep2Submit)}
              className="space-y-6"
            >
              {/* 이메일 표시 */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">이메일</p>
                <p className="text-white font-semibold">{formData.email}</p>
              </div>

              {/* 비밀번호 */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    {...step2Form.register("password")}
                    className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {step2Form.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {step2Form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <div className="relative">
                  <input
                    type={showPasswordCheck ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력해주세요"
                    {...step2Form.register("passwordCheck")}
                    className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {showPasswordCheck ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {step2Form.formState.errors.passwordCheck && (
                  <p className="text-red-500 text-sm mt-2">
                    {step2Form.formState.errors.passwordCheck.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!step2Form.formState.isValid}
                className={`w-full py-3 rounded-lg font-semibold ${
                  step2Form.formState.isValid
                    ? "bg-pink-600  text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                다음
              </button>
            </form>
          )}

          {/* 3단계: 닉네임 */}
          {step === 3 && (
            <form
              onSubmit={step3Form.handleSubmit(onStep3Submit)}
              className="space-y-6"
            >
              {/* 이메일 표시 */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">이메일</p>
                <p className="text-white font-semibold">{formData.email}</p>
              </div>

              {/* 프로필 이미지 (UI만) */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
                  🧑🏻
                </div>
                <button type="button" className="text-pink-500 text-sm">
                  프로필 이미지 변경
                </button>
              </div>

              {/* 닉네임 */}
              <div>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...step3Form.register("nickname")}
                  className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500"
                />
                {step3Form.formState.errors.nickname && (
                  <p className="text-red-500 text-sm mt-2">
                    {step3Form.formState.errors.nickname.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!step3Form.formState.isValid}
                className={`w-full py-3 rounded-lg font-semibold ${
                  step3Form.formState.isValid
                    ? "bg-pink-600 h text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                회원가입 완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
