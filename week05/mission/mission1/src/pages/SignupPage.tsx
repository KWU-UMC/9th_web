import { z } from "zod"
import { useForm, type SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { postSignup } from "../apis/auth";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z.string()
  .min(6,{
    message: "비밀번호는 6자 이상이여야 합니다.",
  })
  .max(20, {
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  passwordCheck: z.string().min(6,{
    message: "비밀번호는 6자 이상이여야 합니다.",
  })
  .max(20, {
    message: "비밀번호는 20자 이하여야 합니다.",
  }),
  name: z.string().min(1, {message:"이름을 입력해주세요."})
})
.refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path:['passwordCheck']
  })

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormFields>({
    defaultValues:{
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  })
  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

  const togglePasswordCheckVisibility = () => {
      setShowPasswordCheck((prev) => !prev);
    };

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    const {passwordCheck, ...rest } = data;
    const response = await postSignup(rest);

    console.log(response);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                    {...register("email")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email ? "border-red-500 bg-red-200": "border-gray-300"}`}
                    type="email"
                    placeholder="이메일"/>
                {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

            <div className="relative w-[300px]">
              <input
                {...register("password")}
                className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm
                  ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"/>

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500 font-semibold hover:text-gray-800">
                {showPassword ? "숨기기" : "보기"}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}

        <div className="relative w-[300px]">
          <input
            {...register("passwordCheck")}
            className={`border w-full p-[10px] focus:border-[#807bff] rounded-sm
              ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={showPasswordCheck ? "text" : "password"}
            placeholder="비밀번호 확인"/>

          <button
            type="button"
            onClick={togglePasswordCheckVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500 font-semibold hover:text-gray-800">
            {showPasswordCheck ? "숨기기" : "보기"}
          </button>
        </div>
        {errors.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}

                <input
                    {...register("name")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password ? "border-red-500 bg-red-200": "border-gray-300"}`}
                    type="text"
                    placeholder="이름"/>
                {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                
                <button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700
                    transition-colors cursor-position disabled:bg-gray-300">회원가입</button>
            </div>
        </div>
  );
};

export default SignupPage;