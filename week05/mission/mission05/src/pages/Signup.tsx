import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema, step2Schema, step3Schema,
  type Step1Data, type Step2Data, type Step3Data
} from "../schemas/authSchema";
import { signup } from "../apis/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "", nickname: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema), mode: "onChange" });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema), mode: "onChange" });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema), mode: "onChange" });

  const onStep1Submit = (data: Step1Data) => { setFormData(p => ({ ...p, email: data.email })); setStep(2); };
  const onStep2Submit = (data: Step2Data) => { setFormData(p => ({ ...p, password: data.password })); setStep(3); };

  const onStep3Submit = async (data: Step3Data) => {
    const finalData = { ...formData, nickname: data.nickname };
    try {
      await signup({ email: finalData.email, password: finalData.password, name: finalData.nickname, bio: null, avatar: null });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <button onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))} className="mb-8 flex items-center gap-2 text-white">
          <span className="text-2xl">←</span><span>뒤로가기</span>
        </button>

        <div className="rounded-lg bg-gray-800 p-8">
          <h1 className="mb-8 text-center text-3xl font-bold text-white">회원가입</h1>

          {step === 1 && (
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-6">
              <div>
                <input type="email" placeholder="이메일을 입력해주세요" {...step1Form.register("email")}
                  className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500" />
                {step1Form.formState.errors.email && <p className="mt-2 text-sm text-red-500">{step1Form.formState.errors.email.message}</p>}
              </div>
              <button type="submit" disabled={!step1Form.formState.isValid}
                className={`w-full rounded-lg py-3 font-semibold ${step1Form.formState.isValid ? "bg-pink-600 text-white" : "cursor-not-allowed bg-gray-600 text-gray-400"}`}>
                다음
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-6">
              <div className="rounded-lg bg-gray-700 p-3">
                <p className="text-sm text-gray-400">이메일</p>
                <p className="font-semibold text-white">{formData.email}</p>
              </div>

              <div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력해주세요" {...step2Form.register("password")}
                    className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {step2Form.formState.errors.password && <p className="mt-2 text-sm text-red-500">{step2Form.formState.errors.password.message}</p>}
              </div>

              <div>
                <div className="relative">
                  <input type={showPasswordCheck ? "text" : "password"} placeholder="비밀번호를 다시 입력해주세요" {...step2Form.register("passwordCheck")}
                    className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500" />
                  <button type="button" onClick={() => setShowPasswordCheck(!showPasswordCheck)} className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">
                    {showPasswordCheck ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {step2Form.formState.errors.passwordCheck && <p className="mt-2 text-sm text-red-500">{step2Form.formState.errors.passwordCheck.message}</p>}
              </div>

              <button type="submit" disabled={!step2Form.formState.isValid}
                className={`w-full rounded-lg py-3 font-semibold ${step2Form.formState.isValid ? "bg-pink-600 text-white" : "cursor-not-allowed bg-gray-600 text-gray-400"}`}>
                다음
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-6">
              <div className="rounded-lg bg-gray-700 p-3">
                <p className="text-sm text-gray-400">이메일</p>
                <p className="font-semibold text-white">{formData.email}</p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-700 text-4xl">🧑🏻</div>
                <button type="button" className="text-sm text-pink-500">프로필 이미지 변경</button>
              </div>

              <div>
                <input type="text" placeholder="닉네임을 입력해주세요" {...step3Form.register("nickname")}
                  className="w-full rounded-lg bg-white px-4 py-3 text-gray-900 placeholder-gray-500" />
                {step3Form.formState.errors.nickname && <p className="mt-2 text-sm text-red-500">{step3Form.formState.errors.nickname.message}</p>}
              </div>

              <button type="submit" disabled={!step3Form.formState.isValid}
                className={`w-full rounded-lg py-3 font-semibold ${step3Form.formState.isValid ? "bg-pink-600 text-white" : "cursor-not-allowed bg-gray-600 text-gray-400"}`}>
                회원가입 완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
