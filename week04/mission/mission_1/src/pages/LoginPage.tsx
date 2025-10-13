import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../lib/schemas';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const tokens = await response.json();
        localStorage.setItem('accessToken', tokens.accessToken);
        alert('로그인 성공!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`로그인 실패: ${errorData.message}`);
      }
    } catch (error) {
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white pt-20">
      <div className="w-full max-w-md p-8">
        <h2 className="text-center text-3xl font-bold mb-8">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <input
              type="email"
              placeholder="이메일"
              {...register('email')}
              className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="비밀번호"
              {...register('password')}
              className={`w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-md font-bold text-lg transition-colors ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          >
            로그인
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          계정이 없으신가요? <Link to="/signup" className="text-blue-500 hover:underline">회원가입</Link>
        </p>
      </div>
    </div>
  );
}