import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constants/key';

const ProtectedLayout = () => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  if (!getItem()){
    return <Navigate to={"/login"} replace />
  }

  return (
    <div className='flex flex-col h-dvh'>
      <main className='flex-1 bg-black'>
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
