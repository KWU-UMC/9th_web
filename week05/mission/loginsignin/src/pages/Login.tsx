import { useNavigate } from "react-router-dom"
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import z from 'zod';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

// Zod 스키마: 이메일 형식 + 비밀번호 길이 제약
const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
    .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const {setItem: setAccessTokenInStorage} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {setItem: setRefreshTokenInStorage} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  const navigate = useNavigate();

  // RHF 설정: onChange 검증 + firstError + Zod resolver
  const{
    register,
    handleSubmit,
    watch,
    formState: {errors, touchedFields, isValid, isSubmitting},
  } = useForm<FormFields>({
    defaultValues: {email: "", password: ""},
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  // 에러 UI 규칙
  const emailInvalidUI = touchedFields.email && !!errors.email;
  const pwdInvalidUI = touchedFields.password && !!errors.password;

  // 버튼 활성화 플래그: watch로 빈값
  const email = watch("email");
  const password = watch("password")
  const canSubmit = useMemo(
    () => !!email && !!password && isValid && !isSubmitting, [email, password, isValid, isSubmitting]
  );

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try{
      const response = await postSignin(data);
      setAccessTokenInStorage(response.data.accessToken);
      setRefreshTokenInStorage(response.data.refreshToken);
      alert("로그인 성공");
      navigate("/");
    } catch(error){
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  }

  const googleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + '/v1/auth/google/login'
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between">
          <button 
            type="button"
            className="text-white text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          >&lt;</button>
          <h1 className="text-white text-2xl mb-2">로그인</h1>
          <span></span>
        </div>

        <button
          type="button"
          className="w-full text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 cursor-pointer mb-2"
          onClick={googleLogin}
        >구글 로그인</button>

        <input
          {...register('email')}
          className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
          ${emailInvalidUI ? 'border-red-500' : ''}`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {emailInvalidUI && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}

        <input
          {...register('password')}
          className={`border border-gray-300 text-white placeholder-gray-500 w-[250px] p-[5px] rounded-sm
          ${pwdInvalidUI ? 'border-red-500' : ''}`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {pwdInvalidUI && (
          <div className="text-red-500 text-sm">{errors.password?.message}</div>
        )}

        <button
          type="button"
          className="w-full text-white bg-gray-900 py-[5px] rounded-sm text-lg hover:bg-gray-700 disabled:text-gray-600 cursor-pointer"
          onClick={handleSubmit(onSubmit)}
          disabled={!canSubmit}
        >로그인</button>
      </div>
    </div>
  )
}

export default Login
