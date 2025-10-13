import { useNavigate } from "react-router-dom";
import LoginForm from "../components/loginForm";
import useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";
import { validateSignin } from "../utils/validate";
import type { ResponseSigninDto } from "../types/auth";
import { postSingin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
    const {setItem}=useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const navigate = useNavigate();

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
        try{
            const response:ResponseSigninDto=await postSingin(values);
            setItem(response.data.accessToken);
            console.log(response);
        }catch(error){
            alert(error);
        }
    };

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
            </div>
        </>
    )
}

export default LoginPage;