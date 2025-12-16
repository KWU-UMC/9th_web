import { useState } from "react";
import type useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";

interface LoginFormProps extends ReturnType<typeof useForm<UserSignInformation>> {
  context: string;
  name: keyof UserSignInformation;
}

const LoginForm = ({ name, context, errors, touched, getInputProps }: LoginFormProps) => {

    const isPassword = name === "password";
    const [show, setShow] = useState(false);

    return (
        <>
           <div className="relative w-70">
                <input {...getInputProps(name)} name={name as string} type={isPassword ? (show ? "text" : "password") : "text"} className={`w-full h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm pr-9 ${errors?.[name]&&touched?.[name] ? "border-red-500 bg-red-200" : "border-gray-300"}`} placeholder={context}/>
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow((v) => !v)}
                        className="absolute right-2 top-1/3 -translate-y-1/2 text-gray-500 leading-none"
                    >
                        {show ? "x" : "o"}
                    </button>
                )}
            </div>
            {errors?.[name]&&touched?.[name]&&(
                <div className="relative w-70 text-red-500 text-sm mb-2 ml-4">{errors?.[name]}</div>
            )}
        </>
    )
}

export default LoginForm;