import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useGetMyInfo } from '../hooks/queries/useGetMyInfo'
import { usePostSignout } from '../hooks/mutations/usePostSignout'

type NavProps = {
  onMenuClick?: () => void
}

const Nav = ({ onMenuClick }: NavProps) => {
  const { accessToken } = useAuth()
  const { data } = useGetMyInfo(accessToken)
  const { mutate: logout } = usePostSignout()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='fixed z-10 flex items-center justify-between w-full p-2 bg-gray-900'>
      <div className='flex items-center gap-3'>
        <button onClick={onMenuClick} className='text-white'>
          <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='4'
              d='M7.95 11.95h32m-32 12h32m-32 12h32'
            />
          </svg>
        </button>
        <Link to='/' className='text-xl text-pink-500'>
          홈
        </Link>
      </div>
      <div className='flex items-center gap-5'>
        {!accessToken && (
          <>
            <Link to='/login' className='text-white'>
              로그인
            </Link>
            <Link to='/signup' className='p-2 text-white bg-pink-500 rounded-md'>
              회원가입
            </Link>
          </>
        )}
        {accessToken && (
          <>
            <h1 className='p-2 text-white'>{data?.name}님 반갑습니다.</h1>
            <button onClick={() => handleLogout()} className='text-white'>
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
