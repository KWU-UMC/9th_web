import { useAuth } from '../context/AuthProvider'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
      <div className='bg-white rounded-xl shadow-lg p-10 text-center'>
        <h2 className='text-xl font-bold mb-2'>안녕하세요, {user.name} 👋</h2>
        <p className='text-slate-500'>{user.email}</p>
        <p className='text-sm text-blue-600 mt-2'>
          권한: {user.role === 'admin' ? '관리자' : '일반 사용자'}
        </p>
        <button
          onClick={logout}
          className='mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
