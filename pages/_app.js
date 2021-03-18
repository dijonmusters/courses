import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import PrivateComponent from 'components/PrivateComponent'
import Nav from 'components/Nav'

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <PrivateComponent>
        <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-indigo-400 text-white">
          <Nav />
          <Component {...pageProps} />
        </div>
      </PrivateComponent>
    </UserProvider>
  )
}

export default MyApp
