import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postSignup } from "../apis/auth";

// Zod 스키마 정의
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);

  // 👁️ 비밀번호 표시 여부 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    trigger,
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const validateCurrentStep = async () => {
      let valid = false;
      if (step === 1) valid = await trigger("email");
      if (step === 2) valid = await trigger(["password", "passwordCheck"]);
      setIsStepValid(valid);
    };
    validateCurrentStep();
  }, [
    step,
    watch("email"),
    watch("password"),
    watch("passwordCheck"),
    trigger,
  ]);

  const nextStep = async () => {
    if (isStepValid) {
      if (step === 1) {
        setSavedEmail(watch("email"));
      }
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    try {
      await postSignup(rest);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-dvh flex flex-col items-center justify-center pb-5">
      <div className="w-full max-w-[450px] px-5 lg:px-6">
        <section className="mt-10 flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold">회원가입</h1>

          {savedEmail && step > 1 && (
            <div className="mt-4 text-sm text-zinc-400">
              <span className="text-2xl">✉</span>
              이메일:{" "}
              <span className="font-medium text-white">{savedEmail}</span>
            </div>
          )}

          <form className="mt-8 w-full" onSubmit={(e) => e.preventDefault()}>
            {/* -------------------- 1단계: 이메일 -------------------- */}
            {step === 1 && (
              <div className="space-y-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-800 py-3 text-sm font-medium text-white transition hover:bg-zinc-800/50"
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

                <div className="relative my-6 w-full flex items-center">
                  <div className="flex-grow border-t border-zinc-800" />
                  <span className="mx-3 text-sm text-zinc-500">or</span>
                  <div className="flex-grow border-t border-zinc-800" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="이메일 입력"
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                  {errors.email && touchedFields.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* -------------------- 2단계: 비밀번호 -------------------- */}
            {step === 2 && (
              <div className="space-y-4">
                {/* 비밀번호 입력 */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent px-4 py-3 pr-10 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                  {/* 👁️ 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-zinc-400 hover:text-white"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </button>
                  {errors.password && touchedFields.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="relative">
                  <label htmlFor="passwordCheck" className="block text-sm">
                    Password 확인
                  </label>
                  <input
                    {...register("passwordCheck")}
                    type={showPasswordCheck ? "text" : "password"}
                    placeholder="비밀번호 확인"
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent px-4 py-3 pr-10 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordCheck((prev) => !prev)}
                    className="absolute right-3 top-9 text-zinc-400 hover:text-white"
                  >
                    {showPasswordCheck ? "👁️" : "🙈"}
                  </button>
                  {errors.passwordCheck && touchedFields.passwordCheck && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.passwordCheck.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* -------------------- 3단계: 닉네임 -------------------- */}
            {step === 3 && (
              <div className="space-y-6">
                {/* 프로필 이미지 영역 */}
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-10 w-10 text-white stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>

                {/* 닉네임 입력 영역 */}
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-300">
                    닉네임
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="닉네임 입력"
                    className="mt-2 w-full rounded-lg border border-zinc-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none"
                  />
                  {errors.name && touchedFields.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* -------------------- 버튼 영역 -------------------- */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg border border-zinc-800 text-white"
                >
                  이전
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid || isSubmitting}
                  className={`ml-auto px-4 py-2 rounded-lg text-zinc-950 font-semibold transition
                    ${
                      isStepValid
                        ? "bg-white hover:bg-gray-200"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  다음
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="ml-auto px-4 py-2 rounded-lg bg-white text-zinc-950 hover:bg-gray-200"
                >
                  회원가입
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
