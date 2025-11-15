import { useAuth } from '../context/AuthProvider'

export function OAuthButton({ provider }: { provider: 'google' | 'github' }) {
  const { login } = useAuth()

  const styles =
    provider === 'google'
      ? 'bg-white text-gray-800 border hover:bg-gray-100'
      : 'bg-gray-700 text-white hover:bg-gray-800'

  return (
    <button
      onClick={() => login(provider)}
      className={`${styles} w-full py-2 mt-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition`}
    >
      <img
        src={
          provider === 'google'
            ? 'https://www.svgrepo.com/show/475656/google-color.svg'
            : 'https://www.svgrepo.com/show/512317/github-142.svg'
        }
        alt={provider}
        className='w-5 h-5'
      />
      {provider === 'google' ? 'Google로 로그인' : 'GitHub로 로그인'}
    </button>
  )
}
