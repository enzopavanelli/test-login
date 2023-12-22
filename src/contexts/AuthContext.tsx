import { ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { recoverUserData, signInReq } from '@/backend/auth'
import { setCookie, parseCookies } from 'nookies'
import Swal from 'sweetalert2'

interface SignInData {
  email: string
  password: string
}

interface User {
  name: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'auth:token': token } = parseCookies()

    if (token) {
      const userData = recoverUserData()

      setUser(userData.user)
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInReq({
        email,
        password,
      })

      setCookie(undefined, 'auth:token', token, {
        maxAge: 60 * 60 * 1, // 1 hora
      }) // Manter logado

      setUser(user)

      router.push('/home')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'E-mail ou senha incorretos',
      })
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
