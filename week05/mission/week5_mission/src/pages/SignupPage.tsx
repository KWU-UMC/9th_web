import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../auth/AuthContext";

/** ---------- 스키마 ---------- */
const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    confirm: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
  })
  .refine((v) => v.password === v.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  });

const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, "닉네임은 2자 이상")
    .max(20, "닉네임은 20자 이하"),
});

type EmailForm = z.infer<typeof emailSchema>;
type PwForm = z.infer<typeof passwordSchema>;
type ProfileForm = z.infer<typeof profileSchema>;

/** ---------- UI 컴포넌트 ---------- */
function Field({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-400" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

/** ---------- 페이지 ---------- */
export default function SignupPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // 누적 데이터
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  /** STEP1: 이메일 */
  const {
    register: regEmail,
    handleSubmit: submitEmail,
    formState: { errors: emailErrors, isValid: emailValid },
  } = useForm<EmailForm>({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  /** STEP2: 비밀번호 */
  const {
    register: regPw,
    handleSubmit: submitPw,
    formState: { errors: pwErrors, isValid: pwValid },
  } = useForm<PwForm>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirm: "" },
  });

  /** STEP3: 닉네임 */
  const {
    register: regProfile,
    handleSubmit: submitProfile,
    formState: { errors: profileErrors, isValid: profileValid },
  } = useForm<ProfileForm>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
    defaultValues: { nickname: "" },
  });

  const goBack = () => {
    if (step === 1) {
      // 히스토리 없을 때 대비
      const idx = (window.history.state && (window.history.state as any).idx) ?? 0;
      idx > 0 ? nav(-1) : nav("/", { replace: true });
    } else {
      setStep((s) => (s === 3 ? 2 : 1));
    }
  };

  /** STEP1 완료 */
  const onEmail = (v: EmailForm) => {
    setEmail(v.email);
    setStep(2);
  };

  /** STEP2 완료 */
  const onPw = (v: PwForm) => {
    setPw(v.password);
    setStep(3);
  };

  /** STEP3 완료 (회원가입 끝) */
  const onProfile = (v: ProfileForm) => {
    // TODO: 실제 회원가입 API 호출 (email, pw, nickname 사용)
    // 성공 시 토큰 저장
    login("signed-up-token");
    nav("/", { replace: true });
  };

  return (
    <div className="min-h-dvh bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => nav("/")}
            className="text-pink-500 font-extrabold text-lg"
          >
            듀의 영화 찾기
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => nav("/login")}
              className="rounded-md border border-zinc-600 px-3 py-1.5 text-sm"
            >
              로그인
            </button>
            <button
              onClick={() => nav("/signup")}
              className="rounded-md bg-pink-500 px-3 py-1.5 text-sm text-white hover:bg-pink-600"
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="mx-auto max-w-md px-6 py-12">
        {/* ← 뒤로 */}
        <button
          onClick={goBack}
          className="mb-8 inline-flex items-center gap-2 text-zinc-300 hover:text-white"
        >
          <span className="text-2xl leading-none">‹</span> 뒤로
        </button>

        <h1 className="text-center text-2xl font-semibold mb-8">회원가입</h1>

        {/* -------- STEP 1: 이메일 -------- */}
        {step === 1 && (
          <form onSubmit={submitEmail(onEmail)} className="grid gap-4">
            <Field error={emailErrors.email?.message}>
              <input
                type="email"
                placeholder="이메일을 입력해주세요!"
                className="w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 outline-none focus:border-pink-500"
                {...regEmail("email")}
              />
            </Field>

            <button
              type="submit"
              disabled={!emailValid}
              className={`mt-2 rounded-md px-3 py-2 text-sm font-medium
              ${
                emailValid
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* -------- STEP 2: 비밀번호 -------- */}
        {step === 2 && (
          <form onSubmit={submitPw(onPw)} className="grid gap-4">
            {/* 상단 이메일 표시 */}
            <div className="flex items-center gap-2 text-zinc-300 mb-2">
              <span>📧</span>
              <span>{email}</span>
            </div>

            <PwInput
              label="비밀번호를 입력해주세요!"
              error={pwErrors.password?.message}
              {...regPw("password")}
            />
            <PwInput
              label="비밀번호를 다시 한 번 입력해주세요!"
              error={pwErrors.confirm?.message}
              {...regPw("confirm")}
            />

            <button
              type="submit"
              disabled={!pwValid}
              className={`mt-2 rounded-md px-3 py-2 text-sm font-medium
              ${
                pwValid
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* -------- STEP 3: 닉네임 -------- */}
        {step === 3 && (
          <form onSubmit={submitProfile(onProfile)} className="grid gap-4">
            {/* 프로필 썸네일(UI만) */}
            <div className="w-28 h-28 rounded-full bg-zinc-800 mx-auto mb-4 grid place-content-center">
              <span className="text-5xl text-zinc-500">👤</span>
            </div>

            <Field error={profileErrors.nickname?.message}>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요!"
                className="w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 outline-none focus:border-pink-500"
                {...regProfile("nickname")}
              />
            </Field>

            <button
              type="submit"
              disabled={!profileValid}
              className={`mt-2 rounded-md px-3 py-2 text-sm font-medium
              ${
                profileValid
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

/** 비밀번호 입력(눈 아이콘 토글) */
function PwInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  }
) {
  const [show, setShow] = useState(false);
  const { label, error, ...rest } = props;
  return (
    <Field error={error}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={label}
          className="w-full rounded-md border border-zinc-600 bg-transparent px-3 py-2 pr-10 outline-none focus:border-pink-500"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-white"
          aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
        {show ? "👀" : "🫣"}
        </button>
      </div>
    </Field>
  );
}
