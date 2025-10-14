import { useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postJSON } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { RegisterPayload, RegisterResponse } from "../types/auth";

/** ---------- Step Schemas ---------- */
const emailSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식을 입력해주세요."),
});
type EmailForm = z.infer<typeof emailSchema>;

const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirm: z.string().min(1, "비밀번호를 다시 입력해주세요."),
  })
  .refine((v) => v.password === v.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

const profileSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
});
type ProfileForm = z.infer<typeof profileSchema>;

/** ---------- UI ---------- */
export default function SignupPage() {
  const navigate = useNavigate();

  // 다단계 진행 상태
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // 로컬스토리지에 임시로 저장(새로고침 대비)
  const emailLs = useLocalStorage("signup_email", "");
  const pwLs = useLocalStorage("signup_pw", "");
  const nickLs = useLocalStorage("signup_nick", "");

  /** STEP 1: 이메일 */
  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: emailLs.value || "" },
    mode: "onChange",
  });

  /** STEP 2: 비밀번호 */
  const pwForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: pwLs.value || "", confirm: pwLs.value || "" },
    mode: "onChange",
  });

  /** STEP 3: 닉네임 */
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { nickname: nickLs.value || "" },
    mode: "onChange",
  });

  /** 제출 핸들러들 */
  const onNextEmail = emailForm.handleSubmit(({ email }) => {
    emailLs.setValue(email);
    setStep(2);
  });

  const onNextPassword = pwForm.handleSubmit(({ password }) => {
    pwLs.setValue(password);
    setStep(3);
  });

  const onFinish = profileForm.handleSubmit(async ({ nickname }) => {
    nickLs.setValue(nickname);

    const payload: RegisterPayload = {
      email: emailLs.value,
      password: pwLs.value,
      nickname,
    };

    // 서버 연동: /auth/register (레포 기본 스펙)
    const data = await postJSON<RegisterResponse>("/auth/register", payload);

    // 토큰을 내려줄 경우 저장(옵션)
    if (data.access_token) localStorage.setItem("access_token", data.access_token);
    if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);

    // 임시 저장 비우기
    emailLs.remove();
    pwLs.remove();
    nickLs.remove();

    // 홈으로 이동
    navigate("/");
  });

  /** 단계별 UI */
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative px-4">
      <BackButton />

      <div className="w-full max-w-sm bg-black rounded-lg p-6 shadow-md border border-gray-800">
        <h1 className="text-center text-xl mb-6 font-bold">회원가입</h1>

        {/* STEP 1: 이메일 입력 */}
        {step === 1 && (
          <form className="flex flex-col gap-4" onSubmit={onNextEmail}>
            <Input
              left={<span>📧</span>}
              placeholder="이메일을 입력해주세요!"
              {...emailForm.register("email")}
              error={emailForm.formState.errors.email?.message}
            />
            <Button type="submit" disabled={!emailForm.formState.isValid}>
              다음
            </Button>
          </form>
        )}

        {/* STEP 2: 비밀번호 입력 */}
        {step === 2 && (
          <form className="flex flex-col gap-4" onSubmit={onNextPassword}>
            {/* 상단에 이전 단계 이메일 표시 */}
            <div className="flex items-center gap-2 text-sm text-gray-300 -mt-2">
              <span>📧</span>
              <span>{emailLs.value}</span>
            </div>

            <PasswordInput
              placeholder="비밀번호를 입력해주세요!"
              {...pwForm.register("password")}
              error={pwForm.formState.errors.password?.message}
            />

            <PasswordInput
              placeholder="비밀번호를 다시 한 번 입력해주세요!"
              {...pwForm.register("confirm")}
              error={pwForm.formState.errors.confirm?.message}
            />

            <div className="flex gap-2">
              <Button type="button" onClick={() => setStep(1)} className="bg-gray-800 hover:bg-gray-700">
                이전
              </Button>
              <Button type="submit" disabled={!pwForm.formState.isValid}>
                다음
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: 닉네임 + (선택) 프로필 UI */}
        {step === 3 && (
          <form className="flex flex-col gap-4" onSubmit={onFinish}>
            <div className="flex flex-col items-center gap-3">
              {/* 프로필 이미지 UI (실제 업로드 X) */}
              <div className="h-24 w-24 rounded-full bg-gray-700 grid place-items-center text-4xl">👤</div>

              {/* 이메일 고정 표시 */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>📧</span>
                <span>{emailLs.value}</span>
              </div>
            </div>

            <Input
              placeholder="닉네임을 입력해주세요!"
              {...profileForm.register("nickname")}
              error={profileForm.formState.errors.nickname?.message}
            />

            <div className="flex gap-2">
              <Button type="button" onClick={() => setStep(2)} className="bg-gray-800 hover:bg-gray-700">
                이전
              </Button>
              <Button type="submit" disabled={!profileForm.formState.isValid}>
                회원가입 완료
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
