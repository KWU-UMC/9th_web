import { OAuthButton } from '../components/OAuthButton'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/profile')
  }, [user, navigate])

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300'>
      <div className='bg-white shadow-xl rounded-2xl p-10 w-[360px] text-center'>
        <h1 className='text-2xl font-bold mb-6 text-slate-700'>Welcome to Goguma App 🍠</h1>
        <p className='text-sm text-slate-500 mb-4'>소셜 계정으로 간편하게 로그인하세요.</p>
        <OAuthButton provider='google' />
        <OAuthButton provider='github' />
      </div>
    </div>
  )
}
