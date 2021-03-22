import { useUser } from '@auth0/nextjs-auth0'

const Nav = () => {
  const { user, error, isLoading } = useUser()

  return user ? (
    <a href="/api/auth/logout" className="absolute top-4 right-4">
      Logout
    </a>
  ) : (
    <a href="/api/auth/login" className="absolute top-4 right-4">
      Login
    </a>
  )
}

export default Nav
