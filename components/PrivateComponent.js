import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

const PrivateComponent = ({ children }) => {
  const router = useRouter()

  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) return children

  router.push('/api/auth/login')
  return null
}

export default PrivateComponent
