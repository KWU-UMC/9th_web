import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (provider: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('mockUser')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (provider: string) => {
    // OAuth 시뮬레이션
    setTimeout(() => {
      const mockUser: User = {
        name: provider === 'google' ? '박현지' : '깃허브 유저',
        email: 'test@example.com',
        role: provider === 'google' ? 'admin' : 'user',
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      setUser(mockUser)
    }, 1000)
  }

  const logout = () => {
    localStorage.removeItem('mockUser')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
