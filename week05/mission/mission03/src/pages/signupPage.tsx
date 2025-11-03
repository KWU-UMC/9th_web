/*
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useCallback, useState } from "react";

const SignPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [confirm, setConfirm] = useState("");
    const [confirmTouched, setConfirmTouched] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [nickname, setNickname] = useState("");

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            return;
        }
        else if (step === 3) {
            setStep(2);
            return;
        }
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    const validate = useCallback((values: UserSignInformation) => {
        const errors = validateSignin(values);
        if (step === 1) {
            return { email: errors.email || "", password: "" };
        }

        const confirmError={...errors,confirm:""};

        if (!confirmError.password) {
            if (values.password && confirm && values.password !== confirm) {
            confirmError.confirm = "비밀번호가 일치하지 않습니다.";
            }
        } else {
            confirmError.confirm = "";
        }

        return confirmError;
    },[step,confirm]);
    
    const form = useForm<UserSignInformation>({
        initialValue: { email: "", password: "" },
        validate,
    });

    const { values, errors } = form;

    const handleSubmit = () => {
        if (step === 1) {
            if (!errors?.email && values.email) setStep(2);
        }
        else if(step===2) {
            if (!errors?.email && !errors?.password && values.password === confirm) setStep(3);
        }
        else if (step === 3) {
            const userData = {
                email: values.email,
                password: values.password,
                nickname: nickname,
            };
            console.log(userData);
            navigate("/login");
        }
    };

    const isDisabled =
        Object.values(errors||{}).some((error)=>error.length>0) ||
        (step === 1 ? values.email === "" : step === 2 ? values.password === "" || confirm === "" : nickname.trim() === "");
        
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen -mt-15">
                <div className="flex items-center justify-between w-80 mb-6 relative">
                    <button onClick={handleBack} className="text-3xl font-bold absolute left-0 ml-8 cursor-pointer">&lt;</button>
                    <h1 className="text-3xl font-semibold text-center w-full">[회원가입]</h1>
                </div>
                {step===1&&(
                    <>
                        <LoginForm name="email" context="이메일을 입력하세요."  {...form} />
                    </>
                )}

                {step===2&&(
                    <>
                        <LoginForm name="password" context="비밀번호를 입력하세요."  {...form} />
                        <div className="relative w-70">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="비밀번호를 한 번 더 입력하세요."
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                onBlur={() => setConfirmTouched(true)}
                                className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${(!errors?.password&&values.password) && confirmTouched && errors?.confirm ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                aria-label={showConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
                                className="absolute right-2 top-1/3 -translate-y-1/2 text-gray-500 leading-none"
                            >
                                {showConfirm ? "x" : "o"}
                            </button>
                        </div>
                        {(!errors?.password&&values.password) && confirmTouched && errors?.confirm && (
                            <p className="relative w-70 text-red-500 text-sm mb-2 ml-3">{errors.confirm}</p>
                        )}
                    </>
                )}

                {step===3&&(
                    <div className="relative w-70">
                        <input
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full h-10 rounded text-gray-400 border border-gray-300 px-3 mb-3 text-sm"
                        />
                    </div>
                )}

                <button onClick={handleSubmit} disabled={isDisabled}
                    className={`flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold
                    ${isDisabled ? "cursor-not-allowed bg-white border border-gray-300 text-gray-300" :"cursor-pointer bg-gray-200 border border-gray-300" }`}>{step === 3 ? "회원가입 완료" : "다음"}</button>
                </div>
        </>
    )
}

export default SignPage;
*/

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSingup } from "../apis/auth";

const schema =z.object({
    email:z.string().email({message:"올바른 이메일 형식이 아닙니다."}),
    password: z.string().min(8,{
        message: "비밀번호는 8자 이상이어야 합니다.",
    }).max(20,{message:"비밀번호는 20자 이하여야 합니다.",}),
    passwordCheck: z.string().min(1, { message: "비밀번호 확인을 입력해주세요." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
})
.superRefine((vals, ctx) => {
  if (vals.password && vals.passwordCheck && vals.password !== vals.passwordCheck) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passwordCheck"],
      message: "비밀번호가 일치하지 않습니다.",
    });
  }
});

type FormFields = z.infer<typeof schema>;

const SignPage =()=>{

    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [showPw, setShowPw] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors, touchedFields, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: { email: "", password: "", passwordCheck: "", name: "" },
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const handleBack = useCallback(() => {
        if (step === 2) setStep(1);
        else if (step === 3) setStep(2);
        else {
            if (window.history.length > 1) navigate(-1);
            else navigate("/");
        }
    }, [step, navigate]);
    
    const goNext = useCallback(async () => {
        if (step === 1) {
            const ok = await trigger("email");
            if (ok) setStep(2);
        } else if (step === 2) {
            const ok = await trigger(["password", "passwordCheck"]);
            if (ok) setStep(3);
        }
    }, [step, trigger]);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password, name } = data;
    const rest = { email, password, name };
    const response=await postSingup(rest);
    console.log("signup:", response);

  navigate("/login");
};

  const isDisabled =
  isSubmitting ||
  (step === 1
    ? !!errors.email || !watch("email")            // ← 이메일이 비었을 때도 비활성화
    : step === 2
    ? !!errors.password || !!errors.passwordCheck ||
      !watch("password") || !watch("passwordCheck") // ← 둘 다 비었을 때도
    : !!errors.name || !watch("name"));     // ← 닉네임 비었을 때


  return (
        <>
            <div className="flex flex-col justify-center items-center h-screen -mt-15">
                <div className="flex items-center justify-between w-80 mb-6 relative">
                    <button onClick={handleBack} className="text-3xl font-bold absolute left-0 ml-8 cursor-pointer">&lt;</button>
                    <h1 className="text-3xl font-semibold text-center w-full">[회원가입]</h1>
                </div>
                {step===1&&(
                    <div className="relative w-70">
                    <input {...register("email")} type={"email"} className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${errors?.email&&touchedFields.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} placeholder="이메일을 입력하세요."/>
                    {errors?.email&&touchedFields.email&&(
                        <div className="relative w-70 text-red-500 text-sm mb-2 ml-4">{errors.email.message}</div>
                    )}
                    </div>
                )}

                {step===2&&(
                    <>
                        <div className="relative w-70">
                            <input {...register("password")} type={showPw ? "text" : "password"} className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${errors.password && touchedFields.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} placeholder="비밀번호를 입력하세요."/>
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                className="absolute right-2 top-1/3 -translate-y-1/2 text-gray-500 leading-none"
                            >
                                {showPw ? "x" : "o"}
                            </button>
                        </div>
                        {errors.password && touchedFields.password&&(
                            <div className="relative w-70 text-red-500 text-sm mb-2 ml-4">{errors.password.message}</div>
                        )}
                        <div className="relative w-70">
                            <input
                                {...register("passwordCheck")}
                                type={showPwCheck ? "text" : "password"}
                                placeholder="비밀번호를 한 번 더 입력하세요."
                                className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${errors.passwordCheck && touchedFields.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwCheck(v => !v)}
                                className="absolute right-2 top-1/3 -translate-y-1/2 text-gray-500 leading-none"
                            >
                                {showPwCheck ? "x" : "o"}
                            </button>
                        </div>
                        {errors.passwordCheck && touchedFields.passwordCheck && (
                            <p className="relative w-70 text-red-500 text-sm mb-2 ml-3">{errors.passwordCheck.message}</p>
                        )}
                    </>
                )}

                {step===3&&(
                    <div className="relative w-70">
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            className={`w-full h-10 rounded text-gray-400 border px-3 mb-3 text-sm ${errors.name && touchedFields.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        />
                        {errors.name && touchedFields.name && (
                            <p className="text-red-500 text-sm ml-1 mb-2">{errors.name.message}</p>
                        )}
                    </div>
                )}

                {step < 3 ? (
                    <button
                    onClick={goNext}
                    disabled={isDisabled}
                    className={`flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold
                    ${isDisabled ? "cursor-not-allowed bg-white border border-gray-300 text-gray-300" :"cursor-pointer bg-gray-200 border border-gray-300" }`}
                    >
                    다음
                    </button>
                ) : (
                    <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isDisabled}
                    className={`flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold
                    ${isDisabled ? "cursor-not-allowed bg-white border border-gray-300 text-gray-300" :"cursor-pointer bg-gray-200 border border-gray-300" }`}
                    >
                    회원가입 완료
                    </button>
                )}
            </div>
        </>
  )
    
}

export default SignPage;