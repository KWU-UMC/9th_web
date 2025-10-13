import type useForm from "../hooks/useForm";
import type { UserSignInformation } from "../utils/validate";

interface LoginFormProps extends ReturnType<typeof useForm<UserSignInformation>> {
  context: string;
  name: keyof UserSignInformation;
}

const LoginForm = ({ name, context, errors, touched, getInputProps }: LoginFormProps) => {

    return (
        <>
            <input {...getInputProps(name)} name={name as string} className={`flex w-70 h-10 rounded text-gray-400 border items-center justify-start px-3 mb-3 text-sm ${errors?.[name]&&touched?.[name] ? "border-red-500 bg-red-200" : "border-gray-300"}`} placeholder={context}/>
            {errors?.[name]&&touched?.[name]&&(
                    <div className="text-red-500 text-sm mb-3">{errors?.[name]}</div>
            )}
        </>
    )
}

export default LoginForm;