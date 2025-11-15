import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode
  role?: 'admin' | 'user'
}) {
  const { user } = useAuth()

  if (!user) return <Navigate to='/' replace />
  if (role && user.role !== role) return <Navigate to='/403' replace />

  return <>{children}</>
}
