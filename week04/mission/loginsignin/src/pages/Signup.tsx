import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import { postSignup } from "../apis/auth";

// [Zod 스키마]
// - 이메일: 형식 검사
// - 비밀번호: 길이 8~20
// - 비밀번호 재확인: 길이 동일 + refine으로 일치 검사
// - 닉네임: 1자 이상
const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다."
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다."
    }),
  passwordCheck: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다."
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다."
    }),
  name: z.string().min(1, {message: "닉네임을 입력해주세요."}),
})
.refine((data: string) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ['passwordCheck'],
});

type FormFields = z.infer<typeof schema>
type Step = 1 | 2 | 3;

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdCheck, setShowPwdCheck] = useState(false);

  // [useForm 옵션 설명]
  // - mode: "onChange"            -> 입력할 때마다 검증(버튼 활성/비활성 즉시 반영)
  // - reValidateMode: "onChange"  -> 에러가 난 필드를 수정하면 곧바로 재검증
  // - criteriaMode: "firstError"  -> 한 필드의 여러 규칙 중 첫 에러만 노출(메시지 간결)
  const {
    register, 
    handleSubmit,
    watch,        // RHF 내부 값을 실시간 구독(별도 useState 없이 UI 반영)
    trigger,      // 지정 필드를 프로그래매틱하게 검증(Promise<boolean>)
    getValues,
    formState: {errors, touchedFields, isSubmitting}
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  // 실시간 값 구독: 버튼 활성 조건 및 상단 표시 등에 사용
  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  // 비밀번호가 바뀔 때마다 재확인 필드를 재검증
  // - refine(일치 검사) 메시지 잔상 제거 UX
  useEffect(() => {
    if (step === 2 && passwordCheck) void trigger("passwordCheck");
  }, [password, passwordCheck, step, trigger]);

  // [에러 표시 규칙]
  // - 검증은 onChange로 하지만, 에러 표시는 blur 이후에만
  // - 스타일 조건: touchedFields.xxx && errors.xxx
  const emailInvalidUI = touchedFields.email && !!errors.email;
  const pwdInvalidUI = touchedFields.password && !!errors.password;
  const pwdCheckInvalidUI = touchedFields.passwordCheck && !!errors.passwordCheck;
  const nameInvalidUI = touchedFields.name && !!errors.name;

  // [useMemo] 버튼 활성 조건 계산을 의존 값이 바뀔 때만 재계산
  // - 불필요한 재계산/리렌더 줄이고, 의존성 명확화
  const emailOK = useMemo(() => !!email && !errors.email, [email, errors.email]);
  const passwordOK = useMemo(() => 
    !!password && !!passwordCheck && !errors.password && !errors.passwordCheck,
    [password, passwordCheck, errors.password, errors.passwordCheck]
  );
  const nameOK = useMemo(() => !!name && !errors.name, [name, errors.name]);

  // [단계 전환] goNext
  // 1단계: email만 trigger -> 통과 시 2단계
  // 2단계: password, passwordCheck 동시 trigger -> 통과 시 3단계
  // - 실패 시 RHF가 errors를 채우고, 해당 단계 그대로 유지(에러 UI 표시)
  const goNext = async () => {
    if (step === 1){
      const ok = await trigger("email") // 이메일만 프로그램적으로 검증
      if (ok) setStep(2);
      return;
    }
    if (step === 2){
      const ok = await trigger(["password", "passwordCheck"]); // 두 필드 동시 검증
      if (ok) setStep(3);
      return;
    }
  };

  // [단계 전환] goPrev
  // - 2 or 3단계면 한 단계 뒤로
  // - 1단계면 라우터 기준 이전 페이지로
  const goPrev = () => {
    if (step > 1) setStep((prev) => ((prev - 1) as Step));
    else navigate(-1)
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {passwordCheck, ...rest} = data;
    
    try{
      const response = await postSignup(rest);
      console.log(response);

      navigate("/");
    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between">
          <button 
            type="button"
            className="text-white text-2xl cursor-pointer"
            onClick={goPrev}
          >&lt;</button>
          <h1 className="text-white text-2xl mb-2">회원가입</h1>
          <span/>
        </div>

        {/* 2,3단계에서 상단에 이메일 표시 */}
        {step > 1 && (
          <div className="text-lg text-gray-300">
            <span className="px-2 py-1 rounded bg-gray-800">{getValues("email")}</span>
          </div>
        )}

        {/* STEP 1: 이메일 */}
        {step === 1 && (
          <>
            <input
              {...register('email')}
              type="email"
              className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
              ${emailInvalidUI ? 'border-red-500' : ''}`}
              placeholder="이메일을 입력해주세요!"
            />
            {emailInvalidUI && <p className="text-red-500 text-sm">{errors.email?.message}</p>}

            <button
              type="button"
              onClick={goNext}
              disabled={!emailOK}
              className="w-full text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 disabled:text-gray-600 cursor-pointer"
            >
              다음
            </button>
          </>
        )}

        {/* STEP 2: 비밀번호 + 재확인 */}
        {step === 2 && (
          <>
            <div className="relative">
              <input
                {...register('password')}
                type={showPwd ? "text" : "password"}
                className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
                ${errors?.password ? 'border-red-500' : ''}`}
                placeholder="비밀번호를 입력해주세요!"
              />
              <button
                type="button"
                onClick={() => setShowPwd((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300"
              >
                {showPwd ? "보기" : "가리기"}
              </button>
            </div>
            {pwdInvalidUI && <p className="text-red-500 text-sm">{errors.password?.message}</p>}

            <div className="relative">
              <input
                {...register('passwordCheck')}
                type={showPwdCheck ? "text" : "password"}
                className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
                ${pwdCheckInvalidUI ? 'border-red-500' : ''}`}
                placeholder="비밀번호를 재입력해주세요!"
              />
              <button
                type="button"
                onClick={() => setShowPwdCheck((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300"
              >
                {showPwdCheck ? "보기" : "가리기"}
              </button>
            </div>
            {pwdCheckInvalidUI && <p className="text-red-500 text-sm">{errors.passwordCheck?.message}</p>}

            <button
              type="button"
              onClick={goNext}
              disabled={!passwordOK}
              className="w-full text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 disabled:text-gray-600 cursor-pointer"
            >
              다음
            </button>
          </>
        )}

        {/* STEP 3: 닉네임 */}
        {step === 3 && (
          <>
            <input
              {...register('name')}
              type="name"
              className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
              ${nameInvalidUI ? 'border-red-500' : ''}`}
              placeholder="닉네임을 입력해주세요!"
            />
            {nameInvalidUI && <p className="text-red-500 text-sm">{errors.name?.message}</p>}

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!nameOK || isSubmitting}
              className="w-full text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 disabled:text-gray-600 cursor-pointer"
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Signup
