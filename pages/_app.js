import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import Nav from 'components/Nav'

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <div className="min-h-screen w-full flex flex-col bg-indigo-400 text-white">
        <Nav />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}

export default MyApp
