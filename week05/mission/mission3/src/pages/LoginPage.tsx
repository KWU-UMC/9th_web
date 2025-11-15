import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type userSigninImformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


const LoginPage = () =>{    
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken){
            navigate('/my')
        }
    }, [navigate, accessToken])

    const { values, errors, touched, getInputProps } = useForm<userSigninImformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    })


    const handleSubmit = async () =>{
        await login(values);
    }

    const handleHoohleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL+"/v1/auth/google/login";
    }

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

    const handleGoBack = () => {
        navigate(-1);
    };

    return( 
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <button
                        className="hover:bg-gray-100 font-bold w-[30px] rounded-md"
                        onClick={handleGoBack}>
                        {"<"}
                    </button>
                    <h1 className="flex-1 text-center font-bold text-2xl">로그인</h1>
                </div>
                <input
                    {...getInputProps("email")}
                    name="email"
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200": "border-gray-300"}`}
                    type="email"
                    placeholder="이메일"/>
                {errors?.email && touched?.email &&(
                    <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <input
                    {...getInputProps("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200": "border-gray-300"}`}
                    type="password"
                    placeholder="비밀번호"/>
                {errors?.password && touched?.password &&(
                    <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700
                    transition-colors cursor-position disabled:bg-gray-300">로그인</button>
                <button
                    type="button"
                    onClick={handleHoohleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700
                    transition-colors cursor-position disabled:bg-gray-300">
                        <div className="flex items-center justify-center gap-4">
                            <img src="/images/google.png" alt="Google Logo Image" width={30} height={30}/>
                            <span>구글로그인</span>
                        </div>
                </button>
            </div>
        </div>
    )
}
export default LoginPage;