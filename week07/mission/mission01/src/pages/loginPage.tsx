import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
    const {login,accessToken} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(accessToken)
        {
            const redirectTo = location.state?.from || "/";
            navigate(redirectTo, { replace: true });
        }
    },[navigate,accessToken,location])

    const handleBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    const form = useForm<UserSignInformation>({
        initialValue: { email: "", password: "" },
        validate: validateSignin,
    });
    const { values, errors } = form;

    const handleSubmit = async () => {
        await login(values);
    };

    const handleGoogleLogin= () => {
        window.location.href=import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login";
    }
    const isDisabled =
        Object.values(errors||{}).some((error)=>error.length>0) ||
        Object.values(values).some((value)=>value==="");
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen -mt-15">
                <div className="flex items-center justify-between w-80 mb-6 relative">
                    <button onClick={handleBack} className="text-3xl font-bold absolute left-0 ml-8 cursor-pointer">&lt;</button>
                    <h1 className="text-3xl font-semibold text-center w-full">[로그인]</h1>
                </div>
                <LoginForm name="email" context="아이디를 입력하세요."  {...form} />
                <LoginForm name="password" context="비밀번호를 입력하세요."  {...form} />
                <button onClick={handleSubmit} disabled={isDisabled}
                    className={`flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold
                        ${isDisabled ? "cursor-not-allowed bg-white border border-gray-300 text-gray-300" :"cursor-pointer bg-gray-200 border border-gray-300" }`}>로그인</button>
                <button onClick={handleGoogleLogin}
                    className={"flex w-70 h-10 rounded items-center justify-center mb-3 text-sm font-semibold cursor-pointer bg-white border border-gray-300 text-gray-300"}>
                    <div className="flex items-center justify-center gap-2">
                        <span>구글 로그인</span>
                        <img className="w-6 h-6" src={'/images/google.svg'} alt="Google Logo Image"/>
                    </div>
                </button>
            </div>
        </>
    )
}

export default LoginPage;