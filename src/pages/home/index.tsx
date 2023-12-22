import { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { user } = useContext(AuthContext)

  return <h1>Olá, {user?.name}</h1>
}

// Função de SSR para verificar se o usuário efetuou login
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth:token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
