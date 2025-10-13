import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormValues } from '../lib/schemas';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: password, 3: name
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SignupFormValues)[] = [];
    if (step === 1) fieldsToValidate = ['email'];
    if (step === 2) fieldsToValidate = ['password', 'passwordConfirm'];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep(prev => prev + 1);
    }
  };
  
  const onSubmit = async (data: SignupFormValues) => {
    const { passwordConfirm, ...userData } = data;
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white pt-20">
      <div className="w-full max-w-md p-8">
        <h2 className="text-center text-3xl font-bold mb-8">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <div className="mb-4">
                <input type="email" placeholder="이메일" {...register('email')} className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>
              <button type="button" onClick={handleNextStep} disabled={!getValues('email') || !!errors.email} className="w-full py-3 bg-blue-600 rounded-md font-bold hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed">다음</button>
            </>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <>
              <p className="text-gray-400 mb-4 bg-gray-800 p-3 rounded-md">{getValues('email')}</p>
              <div className="relative mb-4">
                <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호" {...register('password')} className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mb-4 -mt-2">{errors.password.message}</p>}
              <div className="mb-6">
                <input type="password" placeholder="비밀번호 재확인" {...register('passwordConfirm')} className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 ${errors.passwordConfirm ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`} />
                {errors.passwordConfirm && <p className="text-red-500 text-sm mt-2">{errors.passwordConfirm.message}</p>}
              </div>
              <button type="button" onClick={handleNextStep} disabled={!getValues('password') || !!errors.password || !getValues('passwordConfirm') || !!errors.passwordConfirm} className="w-full py-3 bg-blue-600 rounded-md font-bold hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed">다음</button>
            </>
          )}

          {/* Step 3: Nickname */}
          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-2 flex items-center justify-center border-2 border-gray-600">
                  <span className="text-4xl">👤</span>
                </div>
                <p className="text-gray-400">프로필 이미지</p>
              </div>
              <div className="mb-6">
                <input type="text" placeholder="닉네임" {...register('name')} className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>
              <button type="submit" disabled={!getValues('name') || !!errors.name} className={`w-full py-3 rounded-md font-bold transition-colors ${getValues('name') && !errors.name ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}>회원가입 완료</button>
            </>
          )}
        </form>
         <p className="text-center mt-6 text-gray-400">
          이미 계정이 있으신가요? <Link to="/login" className="text-blue-500 hover:underline">로그인</Link>
        </p>
      </div>
    </div>
  );
}